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

function MediaCard({ movie }: MediaCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const { userRatings } = useUserRatings(session?.user?.id);
  const userRating = userRatings?.find(rating => rating.movieId === movie.id);

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <li className="relative snap-start">
      <Link href={`/movies/${movie.id}`} className="w-max">
        {movie.posterPath ? (
          <Image
            src={movie.posterPath}
            alt=""
            width="180"
            height="270"
            className="h-[17rem] w-auto max-w-none rounded-t"
          />
        ) : (
          <ImagePlaceholderMovie dimensions="w-[181px] h-[272px]" />
        )}
      </Link>
      <MediaCardWatchlistSection movie={movie} userRating={userRating} />

      <div className="flex h-36 max-w-[181px] flex-col gap-2 rounded-b bg-neutral-700 p-2">
        <div className="flex items-center gap-3">
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
        <p className="line-clamp-2 max-h-12">
          <Link
            href={`/movies/${movie.id}`}
            className="flex max-w-[180px] font-semibold hover:underline"
          >
            {movie.title}
          </Link>
        </p>
        <p className="mt-auto text-sm">{movie.releaseDate}</p>
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

export default MediaCard;
