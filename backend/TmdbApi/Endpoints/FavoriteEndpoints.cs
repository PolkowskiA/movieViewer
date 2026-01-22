using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TmdbApi.Contracts;
using TmdbApi.Domain;
using TmdbApi.DTO;
using TmdbApi.Infrastructure.Filters;
using TmdbApi.Infrastructure.Tmdb;
using TmdbApi.Infrastructure.Tmdb.Models;
using TmdbApi.Persistence;

namespace TmdbApi.Endpoints
{
    public static class FavoriteEndpoints
    {
        public static void Map(WebApplication app)
        {
            var group = app.MapGroup("/api/favorites")
                .AddEndpointFilter<ClientIdFilter>();

            group.MapGet("/",
                async ([FromServices] AppDbContext db, [FromServices] TmdbClient tmdb, HttpContext http) =>
                {
                    var clientId = (Guid)http.Items["ClientId"]!;

                    var favorites = await db.Favorites
                      .Where(f => f.ClientId == clientId)
                      .Select(f => new { f.MovieId, f.CreatedAt })
                      .OrderByDescending(f => f.CreatedAt)
                      .ToListAsync();

                    if (favorites.Count == 0)
                        return Results.Ok(Array.Empty<MovieDetails>());

                    var reviewsByMovieId = await db.Reviews
                       .Where(r => r.ClientId == clientId)
                       .ToDictionaryAsync(
                           r => r.MovieId,
                           r => new MovieReviewDto(
                               r.Rating
                           )
                       );

                    var createdAtByMovieId = favorites.ToDictionary(f => f.MovieId, f => f.CreatedAt);

                    using var semaphore = new SemaphoreSlim(5);

                    var tasks = favorites.Select(async f =>
                    {
                        await semaphore.WaitAsync();
                        try
                        {
                            return await tmdb.GetMovieDetails(f.MovieId);
                        }
                        finally
                        {
                            semaphore.Release();
                        }
                    });

                    var results = await Task.WhenAll(tasks);

                    var movies = results
                        .Where(m => m != null)
                        .Select(m =>
                        {
                            var movie = m!;
                            var (director, writers) = movie.GetCrew();

                            reviewsByMovieId.TryGetValue(movie.Id, out var review);
                            createdAtByMovieId.TryGetValue(movie.Id, out var createdAt);

                            return new MovieDeatilsDto(
                                movie.Id,
                                movie.Title,
                                movie.OriginalTitle,
                                movie.ReleaseDate,
                                movie.Overview,
                                movie.PosterPath,
                                movie.BackdropPath,
                                movie.VoteAverage,
                                movie.VoteCount,
                                movie.Genres
                                    .Select(g => new GenreDto(g.Id, g.Name))
                                    .ToArray(),
                                director is null
                                    ? null
                                    : new CrewMemberDto(director.Id, director.Name, director.Job),
                                writers?
                                    .Select(w => new CrewMemberDto(w.Id, w.Name, w.Job))
                                    .ToArray()
                            );
                        });

                    return Results.Ok(movies);
                });

            group.MapPost("/",
                async ([FromBody] AddFavoriteRequest body, [FromServices] AppDbContext db, HttpContext http) =>
                {
                    var clientId = (Guid)http.Items["ClientId"]!;

                    if (body.MovieId <= 0)
                        return Results.BadRequest("Invalid movieId");

                    var exists = await db.Favorites.AnyAsync(f =>
                        f.ClientId == clientId &&
                        f.MovieId == body.MovieId);

                    if (exists)
                        return Results.NoContent();

                    db.Favorites.Add(new FavoriteMovie
                    {
                        ClientId = clientId,
                        MovieId = body.MovieId
                    });

                    await db.SaveChangesAsync();

                    return Results.Created($"/api/favorites/{body.MovieId}", null);
                });

            group.MapDelete("/{movieId:int}",
                async (int movieId, [FromServices] AppDbContext db, HttpContext http) =>
                {
                    var clientId = (Guid)http.Items["ClientId"]!;

                    var favorite = await db.Favorites.FirstOrDefaultAsync(f =>
                        f.ClientId == clientId &&
                        f.MovieId == movieId);

                    if (favorite is null)
                        return Results.NoContent();

                    db.Favorites.Remove(favorite);
                    await db.SaveChangesAsync();

                    return Results.NoContent();
                });
        }
    }
}