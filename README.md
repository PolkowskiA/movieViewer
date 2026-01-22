# MovieViewer 🎬

MovieViewer to aplikacja webowa typu **SPA (Single Page Application)**, umożliwiająca:

- wyszukiwanie filmów z wykorzystaniem API **The Movie Database (TMDB)**,
- przeglądanie szczegółów filmu,
- dodawanie filmów do kolekcji,
- wystawianie oraz usuwanie własnych ocen.

Projekt został zrealizowany jako **pełny stack**:

- frontend w React (Vite),
- backend w ASP.NET Core (.NET 8),
- baza danych PostgreSQL,
- komunikacja przez REST API,
- wdrożenie z użyciem Dockera.

---

## 🧠 Ogólna architektura

Aplikacja składa się z trzech głównych warstw:

1. **Frontend (SPA)**
   - odpowiada za interfejs użytkownika,
   - komunikuje się wyłącznie z backendem (`/api/*`),
   - nie ma routingu po stronie serwera (jedna strona `/`).

2. **Backend (Minimal API)**
   - pełni rolę **proxy** do TMDB (klucz API nigdy nie trafia na frontend),
   - udostępnia własne endpointy REST,
   - zarządza ulubionymi filmami i ocenami użytkownika,
   - odpowiada za walidację i logikę biznesową.

3. **Baza danych (PostgreSQL)**
   - przechowuje:
     - listę ulubionych filmów,
     - oceny przypisane do ulubionych filmów,
   - relacje są zarządzane przez Entity Framework Core.

---

## 👤 Model użytkownika (ClientId)

Aplikacja **nie posiada klasycznego systemu logowania**.

Zamiast tego:

- przy pierwszym uruchomieniu frontend pobiera `ClientId` z backendu,
- `ClientId` jest zapisywany po stronie klienta (w `localStorage`),
- każdy request do API zawiera nagłówek:

```http
X-Client-Id: <guid>
```

## 🧰 Stack technologiczny

### Backend

- .NET 8
- ASP.NET Core Minimal API
- Entity Framework Core
- PostgreSQL
- Npgsql
- Swagger (OpenAPI)
- Docker

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Docker + Nginx (build produkcyjny)

## 📁 Struktura projektu

Repozytorium jest podzielone na dwa główne moduły: **backend** oraz **frontend**.

```
└──backend/
  └── TmdbApi/
    ├── Contracts/       # Kontrakty (np. request/response, wspólne interfejsy)
    ├── Domain/          # Logika domenowa (encje, reguły)
    ├── DTO/             # Obiekty transferowe (DTO)
    ├── Endpoints/       # Minimal API – mapowanie endpointów
    ├── Infrastructure/  # Integracje zewnętrzne (TMDB, konfiguracje)
    ├── Persistence/     # DbContext, konfiguracja EF Core
    ├── Migrations/      # Migracje bazy danych
    ├── Program.cs       # Punkt startowy aplikacji
    ├── appsettings.json # Konfiguracja aplikacji
    └── Dockerfile       # Obraz backendu (.NET)
└──frontend/
  ├── public/         # Statyczne zasoby
  ├── src/
  │ ├── api/          # Komunikacja z backendem (/api)
  │ ├── assets/       # Ikony, obrazy
  │ ├── components/   # Komponenty UI
  │ ├── context/      # Konteksty React
  │ ├── hooks/        # Custom hooki
  │ ├── pages/        # Widoki / strony
  │ ├── types/        # Typy TypeScript
  │ ├── AppRouter.tsx # Routing aplikacji
  │ └── main.tsx      # Entry point
  ├── index.html
  ├── vite.config.ts
  ├── Dockerfile      # Build SPA + Nginx
  └── package.json
```

## 🚀 Uruchomienie lokalne (DEV)

Projekt wymaga uruchomienia **backendu**, **frontendu** oraz **bazy PostgreSQL**.

## 🧰 Wymagania

- .NET SDK 8.0+
- Node.js 18+
- PostgreSQL 15+
- npm
- Docker (opcjonalnie)

## ⚙️ Backend – konfiguracja

Backend wymaga **3 kluczowych konfiguracji**, bez których aplikacja nie wystartuje:

1. Connection string do PostgreSQL
2. Token TMDB (Bearer Token) - [API link](https://www.themoviedb.org/settings/api)
3. Dozwolone originy CORS (frontend)

### Plik: `/backend/TmdbApi/appsettings.Development.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "<POSTGRES_CONNECTION_STRING>"
  },
  "Tmdb": {
    "Token": "<TMDB_BEARER_TOKEN>"
  },
  "Cors": {
    "AllowedOrigins": ["<UI_LOCALHOST_URL>", "<ANOTHER_UI_LOCALHOST_URL>"]
  }
}
```

## ▶️ Backend – uruchomienie

```powershell
cd backend/TmdbApi
dotnet run
```

## 🎨 Frontend – konfiguracja

Frontend wymaga wskazania adresu backendu przez zmienną środowiskową.

### Plik: `/frontend/.env`

```bash
VITE_BACKEND_URL=<API_URL>  # VITE_BACKEND_URL=http://localhost:8080
```

## ▶️ Frontend – uruchomienie

```powershell
cd frontend
npm install
npm run dev
```

## 🐳 Uruchomienie aplikacji w Dockerze

Projekt może być uruchomiony w całości w kontenerach Dockera.
Backend i frontend budowane są **niezależnie**.

### 🔧 Backend – Docker

Zbudowanie obrazu backendu (tam gdzie Dockerfile):

```powershell
cd backend/TmdbApi
docker build -t <yourapiappname>:latest .
```

Uruchomienie kontenera backendu

```powershell
docker run -p 8080:8080 -e "ConnectionStrings__Default=<POSTGRES_CONNECTION_STRING>" -e "Cors__AllowedOrigins__0=<UI_LOCALHOST_URL>" -e "Tmdb__Token=<TMDB_BEARER_TOKEN>" <yourapiappname>:latest
```

Wymagane zmienne środowiskowe

- ConnectionStrings\_\_Default – connection string do bazy PostgreSQL

- Cors\_\_AllowedOrigins\_\_0 – adres frontendu (np. `http://localhost:5173`)

- Tmdb\_\_Token – TMDB Bearer Token

Backend po uruchomieniu dostępny pod:

```
http://localhost:8080
```

### 🎨 Frontend – Docker

Zbudowanie obrazu frontendu:

```powershell
cd frontend
docker build --build-arg VITE_BACKEND_URL=<API_URL> -t <youruiappname>:latest .
# docker build --build-arg VITE_BACKEND_URL=http://localhost:8080 -t tmdbapi:latest .
```

Wymagana jest 1 zmienna środowiskowa

- VITE_BACKEND_URL – adres URL do API

Uruchomienie kontenera frontendu

```powershell
docker run --rm -p <<HOST_PORT>>:<<CONTAINER_PORT>> <<youruiappname>>:latest
# docker run --rm -p 5173:80 movieviewerui:latest
```

Frontend po uruchomieniu dostępny pod:

```
http://localhost:5173
```
