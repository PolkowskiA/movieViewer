namespace TmdbApi.DTO
{
    public record MovieDeatilsDto(
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
        CrewMemberDto[]? Writers
    );

    public record GenreDto(
        int Id,
        string Name
    );

    public record MovieCreditsDto(
        CrewMemberDto[]? Crew
    );

    public record CrewMemberDto(
        int? Id,
        string? Name,
        string? Job
    );
}