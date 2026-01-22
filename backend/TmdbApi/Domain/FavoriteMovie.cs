using System.ComponentModel.DataAnnotations;

namespace TmdbApi.Domain
{
    public class FavoriteMovie
    {
        [Required]
        public Guid ClientId { get; set; }

        [Required]
        public int MovieId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public MovieReview? Review { get; set; }
    }
}