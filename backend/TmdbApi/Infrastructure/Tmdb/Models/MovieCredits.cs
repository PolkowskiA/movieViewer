using System.Text.Json.Serialization;

namespace TmdbApi.Infrastructure.Tmdb.Models
{
    public class MovieCredits
    {
        [JsonPropertyName("cast")]
        public List<CastMember> Cast { get; set; } = new();

        [JsonPropertyName("crew")]
        public List<CrewMember> Crew { get; set; } = new();
    }
}