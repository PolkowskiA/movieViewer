import { DeleteButton } from "../../components/DeleteButton";
import { EditButton } from "../../components/EditButton";
import { useDialogsContext } from "../../context/dialogContext/useDialogsContext";
import type { MovieDetails } from "../../types/MovieDetails";
import Rating from "./Rating";

export default function MovieTile({
  movie,
}: Readonly<{ movie: MovieDetails }>) {
  const { openDelete, openEdit } = useDialogsContext();

  const releaseDate = new Date(movie.releaseDate).toLocaleDateString(
    undefined,
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="flex w-full max-w-6xl overflow-auto rounded-lg border border-gray-700 shadow-md shadow-gray-500">
      <img
        alt="Movie poster"
        src={`https://media.themoviedb.org/t/p/w185${movie?.posterPath}`}
        className="mb-auto w-23 min-w-23 rounded-tl-lg md:min-w-46.25 md:rounded-l-lg"
      />
      <div className="box-border flex w-full flex-col gap-y-2 px-4 py-2">
        <div>
          <div className="flex items-baseline gap-x-2">
            <button
              className="bold cursor-pointer text-2xl hover:underline"
              onClick={() => openEdit(movie)}
            >
              {movie.title}
            </button>
            <span className="hidden text-gray-400 md:block">{`(${movie.originalTitle})`}</span>
          </div>
          {releaseDate}
        </div>
        <div className="line-clamp-4 max-h-37.5 overflow-hidden after:clear-both after:block after:content-[''] lg:line-clamp-7">
          <Rating voteAverage={movie.voteAverage} voteCount={movie.voteCount} />
          <p className="w-full md:text-justify">
            {movie.overview || "Do tego filmu nie dodano jeszcze opisu."}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap gap-x-10 justify-self-end">
          <EditButton onClick={() => openEdit(movie)} />
          <DeleteButton onClick={() => openDelete(movie)} />
        </div>
      </div>
    </div>
  );
}
