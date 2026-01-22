namespace TmdbApi.Persistence
{
    using Microsoft.EntityFrameworkCore;
    using TmdbApi.Domain;

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

            modelBuilder.Entity<FavoriteMovie>()
                .Property(f => f.ClientId)
                .HasColumnType("uuid");

            modelBuilder.Entity<MovieReview>()
                .HasKey(r => new { r.ClientId, r.MovieId });

            modelBuilder.Entity<MovieReview>()
                .Property(r => r.ClientId)
                .HasColumnType("uuid");

            modelBuilder.Entity<FavoriteMovie>()
                .HasOne(f => f.Review)
                .WithOne(r => r.Favorite)
                .HasForeignKey<MovieReview>(r => new { r.ClientId, r.MovieId })
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}