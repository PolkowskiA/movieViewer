using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using TmdbApi.Endpoints;
using TmdbApi.Infrastructure;
using TmdbApi.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("Default")));

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