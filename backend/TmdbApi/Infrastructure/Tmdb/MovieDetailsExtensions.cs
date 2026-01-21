using TmdbApi.DTO;
using TmdbApi.Infrastructure.Tmdb.Models;

namespace TmdbApi.Infrastructure.Tmdb
{
    public static class MovieDetailsExtensions
    {
        public static (CrewMember? Director, List<CrewMember>? Writers) GetCrew(this MovieDetails movie)
        {
            if (movie?.Credits?.Crew == null)
                return (null, new List<CrewMember>());

            var director = movie.Credits.Crew
                .FirstOrDefault(c => c.Job == "Director" && !string.IsNullOrEmpty(c.Name));

            var writers = movie.Credits.Crew
                .Where(c => c.Job == "Writer" && !string.IsNullOrEmpty(c.Name))
                .ToList();

            return (director, writers);
        }
    }
}