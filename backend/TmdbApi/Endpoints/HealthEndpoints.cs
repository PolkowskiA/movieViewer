using Microsoft.EntityFrameworkCore;
using TmdbApi.Persistence;

namespace TmdbApi.Endpoints
{
    public static class HealthEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/health/db", async (AppDbContext db) =>
            {
                await db.Database.OpenConnectionAsync();
                await db.Database.CloseConnectionAsync();
                return Results.Ok("DB OK");
            });
        }
    }
}