using System.ComponentModel.DataAnnotations;

namespace TmdbApi.Persistence
{
    public class MovieReview
    {
        [Required]
        public Guid ClientId { get; set; }

        [Required]
        public int MovieId { get; set; }

        [Range(0, 10)]
        public int? Rating { get; set; }

        public FavoriteMovie Favorite { get; set; } = null!;
    }
}