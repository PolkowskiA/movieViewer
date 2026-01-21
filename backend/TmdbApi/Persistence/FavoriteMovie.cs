using System.ComponentModel.DataAnnotations;

namespace TmdbApi.Persistence
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