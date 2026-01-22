using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TmdbApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Favorites",
                columns: table => new
                {
                    ClientId = table.Column<Guid>(type: "uuid", nullable: false),
                    MovieId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorites", x => new { x.ClientId, x.MovieId });
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    ClientId = table.Column<Guid>(type: "uuid", nullable: false),
                    MovieId = table.Column<int>(type: "integer", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => new { x.ClientId, x.MovieId });
                    table.ForeignKey(
                        name: "FK_Reviews_Favorites_ClientId_MovieId",
                        columns: x => new { x.ClientId, x.MovieId },
                        principalTable: "Favorites",
                        principalColumns: new[] { "ClientId", "MovieId" },
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Favorites");
        }
    }
}
