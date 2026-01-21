namespace TmdbApi.DTO
{
    public record FavoriteMovieDTO(
        int Id,
        string Title,
        string OriginalTitle,
        string ReleaseDate,
        string? Overview,
        string? PosterPath,
        string? BackdropPath,
        double VoteAverage,
        int VoteCount,
        GenreDto[] Genres,
        CrewMemberDto? Director,
        CrewMemberDto[]? Writers,
        MovieReviewDto? Review,
        DateTime CreatedAt
    );
}