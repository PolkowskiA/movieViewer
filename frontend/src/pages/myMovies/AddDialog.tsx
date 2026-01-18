import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { useDialogsContext } from "../../context/dialogContext/useDialogsContext";
import type { TmdbMovie } from "../../types";
import Dialog from "./Dialog";

export default function AddDialog({
  onEdit,
  onAdd,
}: Readonly<{
  onEdit: (updated: TmdbMovie, oldId: number) => void;
  onAdd: (item: TmdbMovie) => void;
}>) {
  const formId = useId();
  const nameInputId = useId();
  const selectedMovieInputId = useId();
  const { activeDialog, selectedItem, close } = useDialogsContext();
  const [movieName, setMovieName] = useState("");
  const [foundMovies, setFoundMovies] = useState<TmdbMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TmdbMovie | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const timeout = useRef(0);

  const editMode = activeDialog === "edit";

  const open = activeDialog === "add" || activeDialog === "edit";
  const dialogTitle = editMode ? "Edytuj Film" : "Dodaj Film";

  const disabledSelectMovie =
    movieName.length < 3 || (movieName.length > 2 && foundMovies.length === 0);

  function handleChangeMovieName(e: ChangeEvent<HTMLInputElement>) {
    const inputMovieName = e.target.value;

    clearTimeout(timeout.current);

    setMovieName(e.target.value);
    setFoundMovies([]);
    setSelectedMovie(null);
    if (inputMovieName.length > 2) getMovieFromBase(inputMovieName);
  }

  function handleChangeSelectedMovie(e: ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    const movie = foundMovies.find((x) => x.id.toString() === e.target.value);
    setSelectedMovie(movie ?? null);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = localStorage.getItem("movies");

    let parsedData = data ? (JSON.parse(data) as TmdbMovie[]) : [];

    let updatedMovies: TmdbMovie[];

    if (editMode && selectedItem && selectedMovie) {
      updatedMovies = parsedData.map((movie) =>
        movie.id === selectedItem?.id ? (selectedMovie ?? movie) : movie,
      );
      onEdit(selectedMovie, selectedItem.id);
    } else if (selectedMovie) {
      if (selectedMovie && parsedData.includes(selectedMovie))
        updatedMovies = parsedData;
      else {
        updatedMovies = [...parsedData, selectedMovie];
      }
      onAdd(selectedMovie);
    } else return;

    localStorage.setItem("movies", JSON.stringify(updatedMovies));
    close();
  }

  useEffect(() => {
    return () => {
      setFoundMovies([]);
      setMovieName("");
      setSelectedMovie(null);
    };
  }, [open]);

  useEffect(() => {
    setMovieName(selectedItem?.title ?? "");
  }, [selectedItem]);

  return (
    <Dialog isOpen={open} onClose={close} dialogTitle={dialogTitle}>
      <form id={formId} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <label htmlFor={nameInputId} className="space-x-4">
            <span>Wyszukaj</span>
            <input
              className="rounded border"
              id={nameInputId}
              type="text"
              value={movieName}
              onChange={handleChangeMovieName}
            />
          </label>
          <label htmlFor={selectedMovieInputId}>
            <span>Wybór</span>
            <select
              id={selectedMovieInputId}
              className="w-full rounded-md border text-gray-100 disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 [&>option]:text-gray-800"
              onChange={handleChangeSelectedMovie}
              value={selectedMovie?.id}
              disabled={disabledSelectMovie}
            >
              <option value={""}>Wybierz jeden z dostępnych...</option>
              {foundMovies.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                  {m.release_date
                    ? ` (${new Date(m.release_date).getFullYear()})`
                    : ""}
                </option>
              ))}
            </select>
          </label>
          <div>
            {selectedMovie?.poster_path && (
              <div className="float-left h-57.75 min-w-38.5 pr-4">
                {!isLoaded && (
                  <div className="h-57.75 w-38.5 animate-pulse rounded bg-gray-700" />
                )}
                <img
                  key={selectedMovie?.id}
                  alt="Movie poster"
                  src={`https://media.themoviedb.org/t/p/w154${selectedMovie?.poster_path}`}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setIsLoaded(true)}
                  hidden={!isLoaded}
                  className="rounded"
                />
              </div>
            )}
            <p>{selectedMovie?.overview}</p>
          </div>
          <button
            className="cursor-pointer rounded-lg border border-white p-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={!selectedMovie}
          >
            Zapisz film
          </button>
        </div>
      </form>
    </Dialog>
  );
}
