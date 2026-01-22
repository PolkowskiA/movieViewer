import { Fragment, useEffect, useState } from "react";
import {
  addFavorite,
  addReview,
  deleteReview,
  getReview,
} from "../../api/movieApi";
import { useDialogsContext } from "../../context/dialogContext/useDialogsContext";
import Dialog from "./Dialog";
import Rating from "./Rating";
import { MyRating } from "./StarRating";

export default function DetailsDialog({
  refresh,
}: Readonly<{
  refresh: () => void;
}>) {
  const { activeDialog, close, movieDetails } = useDialogsContext();
  const isEditMode = activeDialog === "edit";
  const open = activeDialog === "details" || isEditMode;
  const [vote, setVote] = useState<number | null>(null);

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
    setVote(null);
    close();
  }

  async function handleAdd() {
    if (!movieDetails?.id) return;
    await addFavorite(movieDetails.id);
    refresh();
    close();
  }

  async function handleVoteChange(value: number | null) {
    const movieId = movieDetails?.id;
    if (!movieId) return;

    if (value === null) {
      await deleteReview(movieId);
    } else {
      await addReview(value, movieId);
    }

    setVote(value);
  }

  useEffect(() => {
    const movieId = movieDetails?.id;
    if (!movieId) return;

    if (open && isEditMode) {
      getReview(movieId).then((r) => setVote(r.rating));
    }
  }, [open, isEditMode, movieDetails?.id]);

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
            {movieDetails?.posterPath ? (
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
                  <Fragment key={w.id}>
                    <div className="flex gap-x-4">
                      <span className="text-center">Scenariusz</span>
                      <span className="font-bold underline">{w.name}</span>
                    </div>
                    <hr />
                  </Fragment>
                ))}
              </div>
              {isEditMode && (
                <MyRating
                  key={movieDetails.id}
                  vote={vote}
                  onChange={handleVoteChange}
                />
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
