import { DeleteButton } from "../../components/DeleteButton";
import { EditButton } from "../../components/EditButton";
import { useDialogsContext } from "../../context/dialogContext/useDialogsContext";
import type { MovieDetails } from "../../types/tmdbMovieDetails";
import Rating from "./Rating";

export default function MovieTile({ film }: Readonly<{ film: MovieDetails }>) {
  const { openDelete, openEdit } = useDialogsContext();

  const releaseDate = new Date(film.release_date).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="flex w-full max-w-6xl overflow-auto rounded-lg border border-gray-700 shadow-md shadow-gray-500">
      <img
        alt="Movie poster"
        src={`https://media.themoviedb.org/t/p/w185${film?.poster_path}`}
        className="mb-auto w-23 min-w-23 rounded-tl-lg md:min-w-46.25 md:rounded-l-lg"
      />
      <div className="box-border flex w-full flex-col gap-y-2 px-4 py-2">
        <div>
          <div className="flex items-baseline gap-x-2">
            <span className="bold text-2xl">{film.title}</span>
            <span className="hidden text-gray-400 md:block">{`(${film.original_title})`}</span>
          </div>
          {releaseDate}
        </div>
        <div className="line-clamp-4 max-h-37.5 overflow-hidden after:clear-both after:block after:content-[''] lg:line-clamp-7">
          <Rating
            vote_average={film.vote_average}
            vote_count={film.vote_count}
          />
          <p className="w-full md:text-justify">
            {film.overview || "Do tego filmu nie dodano jeszcze opisu."}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap gap-x-10 justify-self-end">
          <EditButton onClick={() => openEdit(film)} />
          <DeleteButton onClick={() => openDelete(film)} />
        </div>
      </div>
    </div>
  );
}
