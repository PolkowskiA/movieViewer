using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TmdbApi.Migrations
{
    /// <inheritdoc />
    public partial class AddMovieReview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ClientId = table.Column<string>(type: "TEXT", nullable: false),
                    MovieId = table.Column<int>(type: "INTEGER", nullable: false),
                    Rating = table.Column<int>(type: "INTEGER", nullable: true),
                    ReviewText = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.CheckConstraint("CK_MovieReview_Rating", "Rating IS NULL OR (Rating >= 0 AND Rating <= 10)");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ClientId_MovieId",
                table: "Reviews",
                columns: new[] { "ClientId", "MovieId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reviews");
        }
    }
}
