using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using TmdbApi.Infrastructure.Tmdb;

namespace TmdbApi.Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddTmdbClient(this IServiceCollection services)
        {
            services.Configure<TmdbOptions>(services
                .BuildServiceProvider()
                .GetRequiredService<IConfiguration>()
                .GetSection("Tmdb"));

            services.AddHttpClient<TmdbClient>((serviceProvider, client) =>
            {
                var options = serviceProvider.GetRequiredService<IOptions<TmdbOptions>>().Value;

                client.BaseAddress = new Uri("https://api.themoviedb.org/3/");
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", options.Token);
            });

            return services;
        }
    }
}