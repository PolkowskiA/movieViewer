using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TmdbApi.Contracts;
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
                    existing.ReviewText = body.ReviewText;
                }
                else
                {
                    var review = new MovieReview
                    {
                        ClientId = clientId,
                        MovieId = body.MovieId,
                        Rating = body.Rating,
                        ReviewText = body.ReviewText
                    };
                    db.Reviews.Add(review);
                }

                await db.SaveChangesAsync();

                return Results.Ok(new { body.MovieId, body.Rating, body.ReviewText });
            });
        }
    }
}