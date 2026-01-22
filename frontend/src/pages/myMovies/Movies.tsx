import { useEffect, useState } from "react";
import { getFavorites } from "../../api/movieApi";
import type { MovieDetails } from "../../types/MovieDetails";
import DeleteDialog from "./DeleteDialog";
import DetailsDialog from "./DetailsDialog";
import MovieTile from "./MovieTile";

export default function Movies() {
  const [movies, setMovies] = useState<MovieDetails[]>([]);

  async function fetchAndSetMovies() {
    await getFavorites().then((r) => setMovies(r));
  }

  useEffect(() => {
    fetchAndSetMovies();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <DeleteDialog refresh={fetchAndSetMovies} />
      <DetailsDialog refresh={fetchAndSetMovies} />
      {movies.map((m) => (
        <MovieTile movie={m} key={m.id} />
      ))}
    </div>
  );
}
