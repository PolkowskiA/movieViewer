using System.Net.Http.Headers;
using System.Net.Http.Json;
using TmdbApi.Infrastructure.Tmdb.Models;

namespace TmdbApi.Infrastructure.Tmdb
{
    public class TmdbClient
    {
        private readonly HttpClient _http;

        public TmdbClient(HttpClient http)
        {
            _http = http;
        }

        public async Task<MovieDetails?> GetMovieDetails(int movieId)
        {
            try
            {
                var res = await _http.GetAsync(
                    $"movie/{movieId}?append_to_response=credits&language=pl-PL");

                if (!res.IsSuccessStatusCode)
                    return null;

                return await res.Content.ReadFromJsonAsync<MovieDetails>();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<MovieSearch>?> SearchMovies(string query)
        {
            try
            {
                var res = await _http.GetAsync($"search/movie?query={Uri.EscapeDataString(query)}&include_adult=false&language=pl-PL");
                if (!res.IsSuccessStatusCode)
                    return null;
                var resPaged = await res.Content.ReadFromJsonAsync<MovieSearchResponse>();

                return resPaged?.Results;
            }
            catch
            {
                return null;
            }
        }
    }
}