namespace TmdbApi.Infrastructure
{
    public sealed class CorsOptions
    {
        public string[] AllowedOrigins { get; init; } = [];
    }
}