using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Npgsql;
using System.Net.Http.Headers;
using TmdbApi.Endpoints;
using TmdbApi.Infrastructure;
using TmdbApi.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var cs = builder.Configuration.GetConnectionString("DefaultConnection");

if (cs?.StartsWith("postgres", StringComparison.OrdinalIgnoreCase) == true)
{
    var uri = new Uri(cs);
    var userInfo = uri.UserInfo.Split(':', 2);

    cs =
        $"Host={uri.Host};" +
        $"Port={uri.Port};" +
        $"Database={uri.AbsolutePath.TrimStart('/')};" +
        $"Username={userInfo[0]};" +
        $"Password={userInfo[1]}";
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(cs));

builder.Services
    .AddAppCors(builder.Configuration)
    .AddTmdbClient(builder.Configuration);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("Frontend");

ClientEndpoints.Map(app);
MovieEndpoints.Map(app);
FavoriteEndpoints.Map(app);
ReviewEndpoints.Map(app);

app.Run();