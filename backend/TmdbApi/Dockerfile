FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src

COPY backend/TmdbApi/TmdbApi.csproj backend/TmdbApi/
RUN dotnet restore backend/TmdbApi/TmdbApi.csproj

COPY backend/TmdbApi/ backend/TmdbApi/

WORKDIR /src/backend/TmdbApi
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine
WORKDIR /app

ENV ASPNETCORE_URLS=http://0.0.0.0:8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "TmdbApi.dll"]