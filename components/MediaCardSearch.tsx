import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { Movie } from "@/types/movies";
import { TvShow } from "@/types/tv";
import RatingModal from "./RatingModal";
import { useState } from "react";
import MediaCardWatchlistSection from "./MediaCardWatchlistSection";
import { useUserRatings } from "@/hooks/useUserRatings";
import ImagePlaceholderMovie from "./ImagePlaceholderMovie";
import { useSession } from "next-auth/react";

type MediaCardProps = {
  movie: Movie | TvShow;
};

function MediaCardSearch({ movie }: MediaCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const { userRatings } = useUserRatings(session?.user?.id);
  const userRating = userRatings?.find(rating => rating.movieId === movie.id);

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <li className="relative flex snap-start sm:block">
      <Link href={`/movies/${movie.id}`} className="w-max">
        {movie.posterPath ? (
          <Image
            src={movie.posterPath}
            alt=""
            width="180"
            height="270"
            className="h-36 w-auto max-w-none rounded-l sm:h-[17rem] sm:rounded-l-none sm:rounded-t"
          />
        ) : (
          <ImagePlaceholderMovie dimensions="w-[180px] h-[270px]" />
        )}
      </Link>
      <MediaCardWatchlistSection movie={movie} userRating={userRating} />

      <div className="flex h-36 w-full flex-col justify-center gap-2 rounded-r bg-neutral-700 px-2 sm:w-[181.33px] sm:justify-normal sm:rounded-b sm:rounded-tr-none sm:p-2">
        <p className="line-clamp-1 text-lg font-semibold sm:line-clamp-2 sm:hidden">
          <Link href={`/movies/${movie.id}`} className="hover:underline">
            {movie.title}
          </Link>
        </p>
        <p className="-mt-2 text-sm sm:mt-auto sm:hidden">
          {movie.releaseDate}
        </p>
        <div className="flex items-center sm:gap-3">
          <p className="flex items-center justify-center gap-1">
            <span>
              <StarIcon className="h-4 w-4 text-yellow-500" />
            </span>{" "}
            {movie.voteAverage.toFixed(1)}
          </p>
          {userRating && (
            <p
              className="flex items-center gap-0.5 rounded pr-2 transition duration-300 hover:cursor-pointer hover:bg-neutral-600"
              onClick={handleClick}
            >
              <span>
                <SparklesIcon className="-mr-1 h-9 w-9 py-1.5 text-yellow-400" />
              </span>
              {userRating.rating}
            </p>
          )}
          {!userRating && (
            <p>
              <SparklesIcon
                className="h-9 w-9 rounded p-2 transition duration-300 hover:cursor-pointer hover:bg-neutral-600 hover:text-yellow-400"
                onClick={handleClick}
              />
            </p>
          )}
        </div>
        <p className="line-clamp-1 hidden text-lg font-semibold sm:line-clamp-2 sm:block">
          <Link href={`/movies/${movie.id}`} className="hover:underline">
            {movie.title}
          </Link>
        </p>
        <p className="-mt-2 hidden text-sm sm:mt-auto sm:block">
          {movie.releaseDate}
        </p>
      </div>
      <RatingModal
        userRatingApi={userRating}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        movie={movie}
      />
    </li>
  );
}

export default MediaCardSearch;
