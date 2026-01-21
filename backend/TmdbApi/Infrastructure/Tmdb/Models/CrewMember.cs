using System.Text.Json.Serialization;

namespace TmdbApi.Infrastructure.Tmdb.Models
{
    public class CrewMember
    {
        public int? Id { get; set; }

        [JsonPropertyName("name")]
        public string? Name { get; set; }

        [JsonPropertyName("job")]
        public string? Job { get; set; }
    }
}