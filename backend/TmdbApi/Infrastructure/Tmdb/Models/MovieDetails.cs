using System.Text.Json.Serialization;

namespace TmdbApi.Infrastructure.Tmdb.Models
{
    public class MovieDetails
    {
        [JsonPropertyName("adult")]
        public bool Adult { get; set; }

        [JsonPropertyName("backdrop_path")]
        public string? BackdropPath { get; set; }

        [JsonPropertyName("belongs_to_collection")]
        public Collection? BelongsToCollection { get; set; }

        [JsonPropertyName("budget")]
        public int Budget { get; set; }

        [JsonPropertyName("credits")]
        public MovieCredits? Credits { get; set; }

        [JsonPropertyName("genres")]
        public List<Genre> Genres { get; set; } = new();

        [JsonPropertyName("homepage")]
        public string? Homepage { get; set; }

        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("imdb_id")]
        public string? ImdbId { get; set; }

        [JsonPropertyName("original_language")]
        public string OriginalLanguage { get; set; } = "";

        [JsonPropertyName("original_title")]
        public string OriginalTitle { get; set; } = "";

        [JsonPropertyName("overview")]
        public string? Overview { get; set; }

        [JsonPropertyName("popularity")]
        public double Popularity { get; set; }

        [JsonPropertyName("poster_path")]
        public string? PosterPath { get; set; }

        [JsonPropertyName("release_date")]
        public string ReleaseDate { get; set; } = "";

        [JsonPropertyName("runtime")]
        public int? Runtime { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; } = "";

        [JsonPropertyName("tagline")]
        public string? Tagline { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; } = "";

        [JsonPropertyName("vote_average")]
        public double VoteAverage { get; set; }

        [JsonPropertyName("vote_count")]
        public int VoteCount { get; set; }
    }
}