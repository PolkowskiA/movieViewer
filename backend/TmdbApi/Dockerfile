# ---------- BUILD ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# ---------- RUNTIME ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Railway ustawia PORT w ENV
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT}

# SQLite volume (Railway)
VOLUME ["/data"]

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "TmdbApi.dll"]
