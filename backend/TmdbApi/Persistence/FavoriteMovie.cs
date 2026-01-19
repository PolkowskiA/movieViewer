using System.ComponentModel.DataAnnotations;

namespace TmdbApi.Persistence
{
    public class FavoriteMovie
    {
        public int Id { get; set; }

        [Required]
        public Guid ClientId { get; set; }

        [Required]
        public int MovieId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}