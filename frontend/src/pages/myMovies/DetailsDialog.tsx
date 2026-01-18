import { useEffect, useState } from "react";
import { getMovieDetails } from "../../api/movieApi";
import { useDialogsContext } from "../../context/dialogContext/useDialogsContext";
import type { MovieDetails } from "../../types/tmdbMovieDetails";
import Dialog from "./Dialog";
import Rating from "./Rating";

export default function DetailsDialog({
  onAdd,
}: Readonly<{
  onAdd: (item: MovieDetails) => void;
}>) {
  const { activeDialog, close, selectedItem } = useDialogsContext();
  const isEditMode = activeDialog === "edit";
  const open = activeDialog === "details" || isEditMode;
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  const title = (
    <span>
      {movieDetails?.title}
      {movieDetails?.release_date && (
        <span className="text-gray-400">
          {` (${new Date(movieDetails.release_date).getFullYear()})`}
        </span>
      )}
    </span>
  );

  useEffect(() => {
    if (selectedItem?.id && open) {
      getMovieDetails(selectedItem.id).then((res) => setMovieDetails(res));
    } else {
      setMovieDetails(null);
    }
  }, [selectedItem, open]);

  function handleClose() {
    close();
  }

  function handleAdd() {
    const data = localStorage.getItem("movies");

    let parsedData = data ? (JSON.parse(data) as MovieDetails[]) : [];

    localStorage.setItem(
      "movies",
      JSON.stringify([...parsedData, movieDetails]),
    );
    onAdd(movieDetails!);
    close();
  }

  function getCrew() {
    const director = movieDetails?.credits?.crew?.find(
      (x) => x.job === "Director" && x.name,
    )?.name;

    const writers = movieDetails?.credits?.crew?.filter(
      (x) => x.job === "Writer" && x.name,
    );
    return { director, writers };
  }

  return (
    <Dialog
      isOpen={open}
      onClose={handleClose}
      dialogTitle={title}
      className="h-full w-full md:w-6xl"
    >
      {movieDetails && (
        <div className="flex h-full flex-col gap-y-2 p-2">
          <div className="flex w-full">
            {movieDetails?.backdrop_path ? (
              <img
                src={`https://media.themoviedb.org/t/p/w300${movieDetails?.poster_path}`}
                alt={movieDetails?.title}
                className="h-33 w-23 rounded-md md:h-112.5 md:w-75"
              />
            ) : (
              <div className="h-33 w-23 rounded-md bg-gray-700 md:h-112.5 md:w-75" />
            )}
            <div className="flex flex-col flex-wrap pl-3">
              <div>
                <Rating
                  vote_average={movieDetails.vote_average}
                  vote_count={movieDetails.vote_count}
                />
                <div className="flex flex-wrap gap-1">
                  {movieDetails.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="py rounded-xl border px-2 text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col flex-wrap gap-3 p-2">
                <hr />
                <div className="flex gap-x-4">
                  <span className="text-center">Reżyseria</span>
                  <span className="font-bold underline">
                    {getCrew().director}
                  </span>
                </div>
                <hr />
                {getCrew().writers?.map((w) => (
                  <>
                    <div key={w.id} className="flex gap-x-4">
                      <span className="text-center">Scenariusz</span>
                      <span className="font-bold underline">{w.name}</span>
                    </div>
                    <hr />
                  </>
                ))}
              </div>
            </div>
          </div>
          <p className="pt-4 text-justify">{movieDetails.overview}</p>
          <button
            className="mt-auto w-full cursor-pointer rounded-lg border border-white p-1 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleAdd}
            hidden={isEditMode}
          >
            Dodaj film
          </button>
        </div>
      )}
    </Dialog>
  );
}
