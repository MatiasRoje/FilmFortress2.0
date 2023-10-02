"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import {
  CheckCircleIcon,
  PlusCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import RateModal from "./RateModal";
import { MovieDetails } from "@/types/movies";
import { Rating } from "@/types/ratings";
import { Watchlist } from "@/types/watchlists";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { postMovieToWatchlist } from "@/lib/watchlists";

type MovieHeaderUserSectionProps = {
  movie: MovieDetails;
  userRating: Rating | undefined;
  watchlists: Watchlist[];
};

function MovieHeaderUserSection({
  movie,
  userRating,
  watchlists,
}: MovieHeaderUserSectionProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [tempRating, setTempRating] = useState<string | number>("");
  const { isAuthenticated, user } = useAuth();
  const [watchlist, setWatchlist] = useState<undefined | Watchlist>(undefined);
  const inWatchlist = watchlist?.movieIds.includes(movie.id);

  useEffect(() => {
    if (user && isAuthenticated) {
      const watchlist = watchlists.find(
        watchlist => watchlist.userId === user.id
      );
      setWatchlist(watchlist);
    }
  }, [user, watchlists, isAuthenticated]);

  function handleClick() {
    setIsOpen(true);
  }

  async function handleAddMovieToWatchlist() {
    if (!isAuthenticated) router.push("/login");

    if (user) {
      const res = await postMovieToWatchlist(movie.id, user.id);

      if (res && res.ok) {
        setWatchlist((prevWatchlist: Watchlist | undefined) => {
          if (!prevWatchlist) {
            // If there is no previous watchlist, create a new one
            return {
              userId: user.id,
              movieIds: [movie.id],
              name: "Watchlist",
            };
          } else {
            // If there is a previous watchlist, update movieIds
            return {
              ...prevWatchlist,
              movieIds: [...prevWatchlist.movieIds, movie.id],
            };
          }
        });
      } else {
        throw new Error("Failed to add the movie to the watchlist");
      }
    }
  }

  return (
    <div className="flex items-start gap-6 py-1">
      <div className="flex flex-col items-center justify-start gap-1">
        <p className="text-sm text-gray-200">
          <span className="text-main-300">F</span>F Rating
        </p>
        <p className="flex items-center gap-1">
          <span className="p-1">
            <StarIcon className="h-8 w-8 text-yellow-500" />
          </span>{" "}
          {movie.voteAverage.toFixed(1)}
        </p>
      </div>
      <div className="justify-baseline flex flex-col items-center">
        <p className="text-sm text-gray-200">Your Rating</p>
        {isAuthenticated && userRating && (
          <p className="flex items-center gap-1">
            <span className="px-1 py-2">
              <SparklesIcon className="h-8 w-8 text-yellow-500" />
            </span>{" "}
            {userRating.rating}
          </p>
        )}
        {isAuthenticated && tempRating && (
          <p className="flex items-center gap-1">
            <span className="px-1 py-2">
              <SparklesIcon className="h-8 w-8 text-yellow-500" />
            </span>{" "}
            {tempRating}
          </p>
        )}
        {isAuthenticated && !userRating && !tempRating && (
          <p>
            <span>
              <SparklesIcon
                className="h-12 w-12 rounded p-2 transition duration-300 hover:bg-neutral-600 hover:text-yellow-400"
                onClick={handleClick}
              />
            </span>
          </p>
        )}
        {!isAuthenticated && (
          <p>
            <span>
              <SparklesIcon
                className="h-12 w-12 rounded p-2 transition duration-300 hover:bg-neutral-600 hover:text-yellow-400"
                onClick={handleClick}
              />
            </span>
          </p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        {isAuthenticated && userRating && (
          <>
            <p className="text-sm text-gray-200">Watched</p>
            <p className="flex items-center">
              <span className="px-1 py-2">
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              </span>
            </p>
          </>
        )}
        {isAuthenticated && tempRating && (
          <>
            <p className="text-sm text-gray-200">Watched</p>
            <p className="flex items-center">
              <span className="px-1 py-2">
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              </span>
            </p>
          </>
        )}
        {!userRating && !tempRating && !watchlist && (
          <>
            <p className="text-sm text-gray-200">Add to Watchlist</p>
            <p>
              <span>
                <PlusCircleIcon
                  className="h-12 w-12 rounded p-2 transition duration-300 hover:bg-neutral-600 hover:text-yellow-400"
                  onClick={handleAddMovieToWatchlist}
                />
              </span>
            </p>
          </>
        )}
        {!userRating && !tempRating && watchlist && inWatchlist && (
          <>
            <p className="text-sm text-gray-200">Watchlisted</p>
            <p className="flex items-center">
              <span>
                <PlusCircleIcon className="h-12 w-12 rounded p-2 text-yellow-400 transition duration-300 hover:bg-neutral-600" />
              </span>
            </p>
          </>
        )}
        {!userRating && !tempRating && watchlist && !inWatchlist && (
          <>
            <p className="text-sm text-gray-200">Add to Watchlist</p>
            <p>
              <span>
                <PlusCircleIcon
                  className="h-12 w-12 rounded p-2 transition duration-300 hover:bg-neutral-600 hover:text-yellow-400"
                  onClick={handleAddMovieToWatchlist}
                />
              </span>
            </p>
          </>
        )}
        {!isAuthenticated && (
          <>
            <p className="text-sm text-gray-200">Add to Watchlist</p>
            <p>
              <span>
                <PlusCircleIcon
                  className="h-12 w-12 rounded p-2 transition duration-300 hover:bg-neutral-600 hover:text-yellow-400"
                  onClick={handleAddMovieToWatchlist}
                />
              </span>
            </p>
          </>
        )}
      </div>
      <RateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        media={movie}
        setTempRating={setTempRating}
      />
    </div>
  );
}

export default MovieHeaderUserSection;
