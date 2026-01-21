using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TmdbApi.Migrations
{
    /// <inheritdoc />
    public partial class RemovedReviewTextFromReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReviewText",
                table: "Reviews");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReviewText",
                table: "Reviews",
                type: "TEXT",
                nullable: true);
        }
    }
}
