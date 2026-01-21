import { useEffect, useState } from "react";
import {
  addFavorite,
  addReview,
  deleteReview,
  getMovieDetails,
} from "../../api/movieApi";
import { useDialogsContext } from "../../context/dialogContext/useDialogsContext";
import type { MovieDetails } from "../../types/MovieDetails";
import Dialog from "./Dialog";
import Rating from "./Rating";
import { MyRating } from "./StarRating";

export default function DetailsDialog({
  refresh,
}: Readonly<{
  refresh: () => void;
}>) {
  const { activeDialog, close, selectedItem, selectedMovieId } =
    useDialogsContext();
  const isEditMode = activeDialog === "edit";
  const open = activeDialog === "details" || isEditMode;
  const [fetchedMovieDetails, setFetchedMovieDetails] =
    useState<MovieDetails | null>(null);
  const [optimisticVote, setOptimisticVote] = useState<number | null>(null);

  const movieDetails = isEditMode ? selectedItem : fetchedMovieDetails;

  const vote = optimisticVote ?? movieDetails?.review?.rating ?? null;

  const title = (
    <span>
      {movieDetails?.title}
      {movieDetails?.releaseDate && (
        <span className="text-gray-400">
          {` (${new Date(movieDetails.releaseDate).getFullYear()})`}
        </span>
      )}
    </span>
  );

  function handleClose() {
    close();
  }

  async function handleAdd() {
    if (!movieDetails?.id) return;
    await addFavorite(movieDetails.id);
    close();
    refresh();
  }

  async function handleVoteChange(value: number | null) {
    const movieId = selectedMovieId || selectedItem?.id;
    if (!movieId) return;

    setOptimisticVote(value);

    if (value === null) {
      await deleteReview(movieId);
    } else {
      await addReview(value, movieId);
    }

    if (isEditMode) refresh();
  }

  useEffect(() => {
    if (!open || isEditMode || !selectedMovieId) return;

    getMovieDetails(selectedMovieId).then(setFetchedMovieDetails);
  }, [open, isEditMode, selectedMovieId]);

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
            {movieDetails?.backdropPath ? (
              <img
                src={`https://media.themoviedb.org/t/p/w300${movieDetails?.posterPath}`}
                alt={movieDetails?.title}
                className="h-33 w-23 rounded-md md:h-112.5 md:w-75"
              />
            ) : (
              <div className="h-33 w-23 rounded-md bg-gray-700 md:h-112.5 md:w-75" />
            )}
            <div className="flex w-full flex-col flex-wrap pl-3">
              <div>
                <Rating
                  voteAverage={movieDetails.voteAverage}
                  voteCount={movieDetails.voteCount}
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
              <div className="flex flex-col flex-wrap gap-3">
                {movieDetails.director?.name && (
                  <>
                    <hr />
                    <div className="flex gap-x-4">
                      <span className="text-center">Reżyseria</span>
                      <span className="font-bold underline">
                        {movieDetails.director?.name}
                      </span>
                    </div>
                    <hr />
                  </>
                )}
                {movieDetails.writers?.map((w) => (
                  <>
                    <div key={w.id} className="flex gap-x-4">
                      <span className="text-center">Scenariusz</span>
                      <span className="font-bold underline">{w.name}</span>
                    </div>
                    <hr />
                  </>
                ))}
              </div>
              {isEditMode && (
                <MyRating vote={vote} onChange={handleVoteChange} />
              )}
            </div>
          </div>
          <p className="pt-4 text-justify">{movieDetails.overview}</p>
          <button
            className="mt-auto w-full cursor-pointer rounded-lg border border-white p-1 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleAdd}
            hidden={isEditMode}
          >
            Dodaj do kolekcji
          </button>
        </div>
      )}
    </Dialog>
  );
}
