using System.ComponentModel.DataAnnotations;

namespace TmdbApi.Persistence
{
    public class MovieReview
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid ClientId { get; set; }

        [Required]
        public int MovieId { get; set; }

        [Range(0, 10)]
        public int? Rating { get; set; }

        public string? ReviewText { get; set; }
    }
}