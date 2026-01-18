import { useEffect, useState } from "react";
import { getFavorites } from "../../api/movieApi";
import type { MovieDetails } from "../../types/tmdbMovieDetails";
import DeleteDialog from "./DeleteDialog";
import DetailsDialog from "./DetailsDialog";
import MovieTile from "./MovieTile";

export default function Movies() {
  const [films, setFilms] = useState<MovieDetails[]>([]);

  function handleDelete(id: number) {
    setFilms((prev) => prev.filter((f) => f.id !== id));
  }

  function handleAdd(item: MovieDetails) {
    setFilms((prev) => [...prev, item]);
  }

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <DeleteDialog onDeleted={handleDelete} />
      <DetailsDialog onAdd={handleAdd} />
      {films.map((film) => (
        <MovieTile film={film} key={film.id} />
      ))}
    </div>
  );
}
