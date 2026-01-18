import { useRef, useState } from "react";
import { searchMovies } from "../api/movieApi";
import type { TmdbMovie } from "../types";
import type { TmdbResponse } from "../types/tmdbSearch";

export default function useSearchMovie() {
  const [results, setResults] = useState<TmdbMovie[]>([]);
  const timeout = useRef(0);

  async function searchMoviesByName(inputMovieName: string) {
    try {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(async () => {
        searchMovies(inputMovieName)
          .then((res: TmdbResponse) => {
            setResults(res.results);
          })
          .catch((err) => console.error(err));
      }, 400);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  return { searchMoviesByName, results, setResults };
}
