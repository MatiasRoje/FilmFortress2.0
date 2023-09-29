import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Movie } from "@/types/movies";
import { TvShow } from "@/types/tv";
import RateModal from "./RateModal";
import { useEffect, useState } from "react";
import { Rating } from "@/types/ratings";
import { postMovieToWatchlist } from "@/lib/watchlists";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Watchlist } from "@/types/watchlists";

type MediaCardProps = {
  media: Movie | TvShow;
  ratings: Rating[];
  watchlists: Watchlist[];
};

function MediaCard({ media, ratings, watchlists }: MediaCardProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [tempRating, setTempRating] = useState<string | number>("");
  const userRating = ratings.find(rating => rating.movieId === media.id);
  const { user, isAuthenticated } = useAuth();
  const [watchlist, setWatchlist] = useState<undefined | Watchlist>(undefined);

  useEffect(() => {
    if (user) {
      const watchlist = watchlists.find(
        watchlist => watchlist.userId === user.id
      );
      setWatchlist(watchlist);
    }
  }, [user, watchlists]);

  function handleClick() {
    setIsOpen(true);
  }

  async function handleAddMovieToWatchlist() {
    if (!isAuthenticated) router.push("/login");

    if (user) {
      const res = await postMovieToWatchlist(media.id, user.id);

      if (res && res.ok) {
        setWatchlist((prevWatchlist: Watchlist | undefined) => {
          if (!prevWatchlist) {
            // If there is no previous watchlist, create a new one
            return {
              userId: user.id,
              movieIds: [media.id],
              name: "Watchlist",
            };
          } else {
            // If there is a previous watchlist, update movieIds
            return {
              ...prevWatchlist,
              movieIds: [...prevWatchlist.movieIds, media.id],
            };
          }
        });
      } else {
        throw new Error("Failed to create a rating");
      }
    }
  }

  return (
    <li className="relative px-3" style={{ flex: "0 0 16.66%" }}>
      <Link href={`/movies/${media.id}`}>
        <Image
          src={media.posterPath}
          alt=""
          width="180"
          height="270"
          className="h-[17rem] w-auto max-w-none rounded-t"
        />
      </Link>
      {watchlist && watchlist.movieIds.includes(media.id) ? (
        <p>
          <PlusCircleIcon className="absolute top-0 z-10 h-9 w-9 text-yellow-400 transition duration-300 hover:cursor-pointer" />
        </p>
      ) : (
        <p>
          <PlusCircleIcon
            className="absolute top-0 z-10 h-9 w-9 transition duration-300 hover:cursor-pointer hover:text-yellow-400"
            onClick={handleAddMovieToWatchlist}
          />
        </p>
      )}

      <div className="flex h-36 flex-col gap-2 rounded-b bg-neutral-700 p-2">
        <div className="flex items-center gap-3">
          <p className="flex items-center justify-center gap-1">
            <span>
              <StarIcon className="h-4 w-4 text-yellow-500" />
            </span>{" "}
            {media.voteAverage.toFixed(1)}
          </p>
          {userRating && (
            <p className="flex items-center">
              <span>
                <SparklesIcon className="-mr-1 h-9 w-9 py-2 text-yellow-400" />
              </span>{" "}
              {userRating.rating}
            </p>
          )}
          {tempRating && (
            <p className="flex items-center">
              <span>
                <SparklesIcon className="-mr-1 h-9 w-9 py-2 text-yellow-400" />
              </span>{" "}
              {tempRating}
            </p>
          )}
          {!userRating && !tempRating && (
            <p>
              <SparklesIcon
                className="h-9 w-9 rounded p-2 transition duration-300 hover:bg-neutral-600 hover:text-yellow-400"
                onClick={handleClick}
              />
            </p>
          )}
        </div>
        <p>
          <Link
            href={`/movies/${media.id}`}
            className="line-clamp-2 font-semibold hover:underline"
          >
            {media.title}
          </Link>
        </p>
        <p className="mt-auto text-sm">{media.releaseDate}</p>
      </div>
      <RateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        media={media}
        setTempRating={setTempRating}
      />
    </li>
  );
}

export default MediaCard;
