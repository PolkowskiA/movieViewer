using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TmdbApi.Migrations
{
    /// <inheritdoc />
    public partial class ChangedMovieReviewClientIdType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_MovieReview_Rating",
                table: "Reviews");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddCheckConstraint(
                name: "CK_MovieReview_Rating",
                table: "Reviews",
                sql: "Rating IS NULL OR (Rating >= 0 AND Rating <= 10)");
        }
    }
}
