import { Outlet } from "react-router";
import movieIcon from "../../assets/movie.svg";
import useInitClient from "../../hooks/useGetClientId";
import "./AppLayout.css";
import MovieSearch from "./MovieSearch";

export default function AppLayout() {
  useInitClient();

  return (
    <>
      <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-lg">
        <div className="px-4 py-4">
          <div className="flex flex-col items-center gap-x-20 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 w-20.5 rounded-lg p-2">
                <img alt="movieIcon" src={movieIcon} />
              </div>
              <div>
                <h1 className="text-gradient-gold text-2xl font-bold">
                  Movie Vault
                </h1>
                <p className="text-muted-foreground text-sm text-nowrap">
                  Twoja osobista kolekcja filmów
                </p>
              </div>
            </div>
            <MovieSearch />
          </div>
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
