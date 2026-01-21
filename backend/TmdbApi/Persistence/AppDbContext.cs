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
                .HasKey(f => new { f.ClientId, f.MovieId });

            modelBuilder.Entity<MovieReview>()
                .HasKey(r => new { r.ClientId, r.MovieId });

            modelBuilder.Entity<FavoriteMovie>()
                .HasOne(f => f.Review)
                .WithOne(r => r.Favorite)
                .HasForeignKey<MovieReview>(r => new { r.ClientId, r.MovieId })
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}