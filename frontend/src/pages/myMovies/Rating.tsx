import star from "../../assets/star.svg";
import type { MovieDetails } from "../../types/tmdbMovieDetails";

export default function Rating({
  vote_average,
  vote_count,
}: Readonly<Pick<MovieDetails, "vote_average" | "vote_count">>) {
  function getVoteCount() {
    if (vote_count >= 10000) {
      return `${(vote_count / 1000).toFixed()}k`;
    } else if (vote_count > 1000) {
      return `${(vote_count / 1000).toFixed(1)}k`;
    } else return vote_count;
  }
  return (
    <div className="float-left mx-2 flex items-center rounded-br-lg border-r border-b border-gray-500 pr-1">
      <img alt="ranking" src={star} className="w-10" />
      <div className="ml-2 flex flex-col text-gray-500">
        <div>
          <span className="font-bold text-gray-200">
            {vote_average?.toFixed(1)}
          </span>
          <span className="hidden md:inline-block">/10</span>
        </div>
        <span className="hidden md:block">{getVoteCount()}</span>
      </div>
    </div>
  );
}
