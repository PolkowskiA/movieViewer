using System.Text.Json.Serialization;

namespace TmdbApi.Infrastructure.Tmdb.Models
{
    public class MovieSearchResponse
    {
        [JsonPropertyName("page")]
        public int Page { get; set; }

        [JsonPropertyName("results")]
        public List<MovieSearch> Results { get; set; } = new();

        [JsonPropertyName("total_pages")]
        public int TotalPages { get; set; }

        [JsonPropertyName("total_results")]
        public int TotalResults { get; set; }
    }
}