using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TmdbApi.DTO;
using TmdbApi.Infrastructure.Tmdb;
using TmdbApi.Persistence;
using static System.Net.WebRequestMethods;

namespace TmdbApi.Endpoints
{
    public static class MovieEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/api/movies/search", async (string query, TmdbClient tmdb) =>
            {
                if (string.IsNullOrWhiteSpace(query))
                    return Results.BadRequest("Query is required");

                var movies = await tmdb.SearchMovies(query);
                var dtos = movies?.Select(m => new MovieSearchDto()
                {
                    PosterPath = m.PosterPath,
                    Id = m.Id,
                    ReleaseDate = m.ReleaseDate,
                    Title = m.Title
                });

                return Results.Ok(dtos);
            });

            app.MapGet("/api/movies/{id:int}", async (int id, [FromServices] TmdbClient tmdb) =>
            {
                var movie = (await tmdb.GetMovieDetails(id))!;
                var (director, writers) = movie.GetCrew();
                var movieDto = new MovieDeatilsDto(
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

                return Results.Ok(movieDto);
            });
        }
    }
}