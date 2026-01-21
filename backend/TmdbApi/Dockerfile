FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src

COPY src/TmdbApi/TmdbApi.csproj src/TmdbApi/
RUN dotnet restore src/TmdbApi/TmdbApi.csproj

COPY . .
RUN dotnet publish src/TmdbApi/TmdbApi.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine
WORKDIR /app

ARG PORT=8080
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT}

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "TmdbApi.dll"]