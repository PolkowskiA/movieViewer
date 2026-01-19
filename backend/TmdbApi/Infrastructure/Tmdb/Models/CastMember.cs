using System.Text.Json.Serialization;

namespace TmdbApi.Infrastructure.Tmdb.Models
{
    public class CastMember
    {
        [JsonPropertyName("name")]
        public string? Name { get; set; }

        [JsonPropertyName("character")]
        public string? Character { get; set; }
    }
}