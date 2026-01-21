namespace TmdbApi.Endpoints
{
    public static class ClientEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapPost("/api/client", () =>
            {
                var clientId = Guid.NewGuid();
                return Results.Ok(new { clientId });
            });
        }
    }
}