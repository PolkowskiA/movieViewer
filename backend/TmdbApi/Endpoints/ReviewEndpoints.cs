using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TmdbApi.Contracts;
using TmdbApi.Domain;
using TmdbApi.DTO;
using TmdbApi.Infrastructure.Filters;
using TmdbApi.Persistence;
using static System.Net.WebRequestMethods;

namespace TmdbApi.Endpoints
{
    public static class ReviewEndpoints
    {
        public static void Map(WebApplication app)
        {
            var group = app.MapGroup("/api/reviews")
                .AddEndpointFilter<ClientIdFilter>();

            group.MapPost("/",
                async (HttpContext http, AddReviewRequest body, [FromServices] AppDbContext db) =>
            {
                var clientId = (Guid)http.Items["ClientId"]!;

                var existing = await db.Reviews.FirstOrDefaultAsync(r => r.ClientId == clientId && r.MovieId == body.MovieId);

                if (existing != null)
                {
                    existing.Rating = body.Rating;
                }
                else
                {
                    var review = new MovieReview
                    {
                        ClientId = clientId,
                        MovieId = body.MovieId,
                        Rating = body.Rating,
                    };
                    db.Reviews.Add(review);
                }

                await db.SaveChangesAsync();

                return Results.Ok(new { body.MovieId, body.Rating, body.ReviewText });
            });

            group.MapGet("/{movieId:int}",
                async (int movieId, HttpContext http, [FromServices] AppDbContext db) =>
                {
                    var clientId = (Guid)http.Items["ClientId"]!;

                    var review = await db.Reviews.FirstOrDefaultAsync(r => r.ClientId == clientId && r.MovieId == movieId);

                    return Results.Ok(new MovieReviewDto(review?.Rating));
                });

            group.MapDelete("/{movieId:int}",
                async (int movieId, HttpContext http, [FromServices] AppDbContext db) =>
                {
                    var clientId = (Guid)http.Items["ClientId"]!;

                    var review = await db.Reviews.FirstOrDefaultAsync(r => r.MovieId == movieId && r.ClientId == clientId);

                    if (review is null)
                        return Results.NoContent();

                    db.Reviews.Remove(review);

                    await db.SaveChangesAsync();

                    return Results.NoContent();
                });
        }
    }
}