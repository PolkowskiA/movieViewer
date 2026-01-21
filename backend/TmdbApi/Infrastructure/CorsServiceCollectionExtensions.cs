using TmdbApi.Infrastructure;

namespace TmdbApi.Infrastructure
{
    public static class CorsServiceCollectionExtensions
    {
        public static IServiceCollection AddAppCors(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.Configure<CorsOptions>(
                configuration.GetSection("Cors"));

            var corsOptions = configuration
                .GetSection("Cors")
                .Get<CorsOptions>() ?? new();

            services.AddCors(options =>
            {
                options.AddPolicy("Frontend", policy =>
                {
                    policy
                        .WithOrigins(corsOptions.AllowedOrigins)
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            return services;
        }
    }
}