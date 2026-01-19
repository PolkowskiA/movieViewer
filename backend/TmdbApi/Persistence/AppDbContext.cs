namespace TmdbApi.Persistence
{
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;

    public class AppDbContext : DbContext
    {
        public DbSet<FavoriteMovie> Favorites => Set<FavoriteMovie>();

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FavoriteMovie>()
                .HasIndex(x => new { x.ClientId, x.MovieId })
                .IsUnique();
        }
    }
}