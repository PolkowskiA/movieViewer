import StarIcon from "../../components/icons/StarIcon";
import type { MovieDetails } from "../../types/MovieDetails";

export default function Rating({
  voteAverage,
  voteCount,
}: Readonly<Pick<MovieDetails, "voteAverage" | "voteCount">>) {
  function getVoteCount() {
    if (voteCount >= 10000) {
      return `${(voteCount / 1000).toFixed()}k`;
    } else if (voteCount > 1000) {
      return `${(voteCount / 1000).toFixed(1)}k`;
    } else return voteCount;
  }
  return (
    <div className="float-left mx-2 flex items-center rounded-br-lg border-r border-b border-gray-500 pr-1">
      <StarIcon width={40} />
      <div className="ml-2 flex flex-col text-gray-500">
        <div>
          <span className="font-bold text-gray-200">
            {voteAverage?.toFixed(1)}
          </span>
          <span className="hidden md:inline-block">/10</span>
        </div>
        <span className="hidden md:block">{getVoteCount()}</span>
      </div>
    </div>
  );
}
