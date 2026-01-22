namespace TmdbApi.Contracts
{
    public record AddReviewRequest(int MovieId, int? Rating, string? ReviewText);
}