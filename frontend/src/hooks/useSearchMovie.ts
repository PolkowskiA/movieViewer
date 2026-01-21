import { useRef, useState } from "react";
import { searchMovies } from "../api/movieApi";
import type { SearchMovie } from "../SearchMovie";

export default function useSearchMovie() {
  const [results, setResults] = useState<SearchMovie[]>([]);
  const timeout = useRef(0);

  async function searchMoviesByName(inputMovieName: string) {
    try {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(async () => {
        searchMovies(inputMovieName)
          .then((res: SearchMovie[]) => {
            setResults(res);
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
