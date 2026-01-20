namespace TmdbApi.Persistence
{
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;

    public class AppDbContext : DbContext
    {
        public DbSet<FavoriteMovie> Favorites => Set<FavoriteMovie>();
        public DbSet<MovieReview> Reviews => Set<MovieReview>();

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FavoriteMovie>()
                .HasIndex(f => new { f.ClientId, f.MovieId })
                .IsUnique();

            modelBuilder.Entity<MovieReview>()
                .HasIndex(r => new { r.ClientId, r.MovieId })
                .IsUnique();
        }
    }
}