import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { useDialogsContext } from "../../context/dialogContext/useDialogsContext";
import useSearchMovie from "../../hooks/useSearchMovie";
import type { TmdbMovie } from "../../types";

export default function MovieSearch() {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { openDetails } = useDialogsContext();
  const { searchMoviesByName, results, setResults } = useSearchMovie();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 3) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    searchMoviesByName(value);
    setIsOpen(true);
  }

  function handleSelect(movie: TmdbMovie) {
    openDetails(movie);
    setIsOpen(false);
  }

  function handleInputFocus() {
    if (results.length > 0) {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-6xl xl:mr-[10%]">
      {/* LABEL */}
      <label htmlFor={inputId} className="sr-only">
        Szukaj filmu
      </label>

      {/* INPUT */}
      <input
        autoComplete="off"
        id={inputId}
        type="search"
        value={query}
        onChange={handleChange}
        onFocus={handleInputFocus}
        placeholder="Szukaj filmu..."
        role="combobox"
        aria-controls="movie-search-results"
        aria-expanded={isOpen}
        className="h-10 w-full rounded-md border border-gray-300 bg-gray-700 bg-[url('src/assets/searchIcon.svg')] bg-position-[left_0.5rem_center] bg-no-repeat pr-3 pl-10 text-sm text-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* DROPDOWN */}
      {isOpen && results.length > 0 && (
        <div
          id="movie-search-results"
          role="listbox"
          className="absolute top-full z-50 mt-2 w-full rounded-md border border-gray-200 bg-gray-800 shadow-lg"
        >
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-500">Szukanie...</div>
          )}

          {results.slice(0, 8).map((movie, index) => (
            <div key={movie.id}>
              <button
                role="option"
                onClick={() => handleSelect(movie)}
                className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-gray-200 hover:bg-gray-500 focus:bg-gray-600"
              >
                {movie.poster_path ? (
                  <img
                    src={`https://media.themoviedb.org/t/p/w45${movie.poster_path}`}
                    alt=""
                    className="h-12 w-8 rounded bg-gray-200 object-cover"
                  />
                ) : (
                  <div className="h-12 w-8 rounded bg-gray-600" />
                )}

                <span className="flex-1">
                  {movie.title}
                  {movie.release_date && (
                    <span className="text-gray-400">
                      ({new Date(movie.release_date).getFullYear()})
                    </span>
                  )}
                </span>
              </button>
              {index !== 7 && <hr />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
