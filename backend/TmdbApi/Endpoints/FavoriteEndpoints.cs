using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TmdbApi.Contracts;
using TmdbApi.Domain;
using TmdbApi.DTO;
using TmdbApi.Infrastructure.Tmdb;
using TmdbApi.Infrastructure.Tmdb.Models;
using TmdbApi.Persistence;

namespace TmdbApi.Endpoints
{
    public static class FavoriteEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/api/favorites",
            async (HttpRequest request, [FromServices] AppDbContext db, [FromServices] TmdbClient tmdb) =>
            {
                if (!TryGetClientId(request, out var clientId))
                    return Results.BadRequest("Missing or invalid X-Client-Id");

                var movieIds = await db.Favorites
                    .Where(f => f.ClientId == clientId)
                    .Select(f => f.MovieId)
                    .ToListAsync();

                if (movieIds.Count == 0)
                    return Results.Ok(Array.Empty<MovieDetails>());

                var tasks = movieIds.Select(id => tmdb.GetMovieDetails(id));
                var results = await Task.WhenAll(tasks);

                var movies = results
                    .Where(m => m != null)
                    .Select(m =>
                    {
                        var (director, writers) = m!.GetCrew();
                        return new MovieDeatilsDto(
                            m.Id,
                            m.Title,
                            m.OriginalTitle,
                            m.ReleaseDate,
                            m.Overview,
                            m.PosterPath,
                            m.BackdropPath,
                            m.VoteAverage,
                            m.VoteCount,
                            m.Genres
                                .Select(g => new GenreDto(g.Id, g.Name)).ToArray(),
                            director is null
                                ? null
                                : new CrewMemberDto(director.Id, director.Name, director.Job),
                            writers?
                                .Select(w => new CrewMemberDto(w.Id, w.Name, w.Job)).ToArray()
                        );
                    }).ToArray();

                return Results.Ok(movies);
            });

            app.MapPost("/api/favorites",
                async (HttpRequest request, [FromBody] AddFavoriteRequest body, [FromServices] AppDbContext db) =>
            {
                if (!TryGetClientId(request, out var clientId))
                    return Results.BadRequest("Missing or invalid X-Client-Id");

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

            app.MapDelete("/api/favorites/{movieId:int}", async (int movieId, HttpRequest request, [FromServices] AppDbContext db) =>
            {
                if (!TryGetClientId(request, out var clientId))
                    return Results.BadRequest("Missing or invalid X-Client-Id");

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

        private static bool TryGetClientId(HttpRequest request, out Guid clientId)
        {
            clientId = default;

            if (!request.Headers.TryGetValue("X-Client-Id", out var value))
                return false;

            return Guid.TryParse(value, out clientId);
        }
    }
}