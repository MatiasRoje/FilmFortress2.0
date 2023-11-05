"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import {
  CheckCircleIcon,
  PlusCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import RatingModal from "./RatingModal";
import { MovieDetails } from "@/types/movies";
import { useRouter } from "next/navigation";
import { useUserRatings } from "@/hooks/useUserRatings";
import { useUserWatchlist } from "@/hooks/useUserWatchlist";
import { useAddMovieToWatchlist } from "@/hooks/useAddMovieToWatchlist";
import { useDeleteMovieFromWatchlist } from "@/hooks/useDeleteMovieFromWatchlist";
import { useSession } from "next-auth/react";

type MovieHeaderUserSectionProps = {
  movie: MovieDetails;
};

function MovieHeaderUserSection({ movie }: MovieHeaderUserSectionProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const { userRatings } = useUserRatings(session?.user?.id);
  const userRating = userRatings?.find(rating => rating.movieId === movie.id);

  const { userWatchlist } = useUserWatchlist(session?.user?.id);
  const inWatchlist = userWatchlist?.movieIds?.includes(movie.id);
  const { addMovie } = useAddMovieToWatchlist();
  const { deleteMovie } = useDeleteMovieFromWatchlist();

  function handleClick() {
    setIsOpen(true);
  }

  function handleAddMovie() {
    if (!session) router.push("/login");

    addMovie({ movieId: movie.id, userId: session?.user?.id });
  }

  function handleDeleteMovie() {
    if (userWatchlist) {
      const newMovieIds = userWatchlist.movieIds.filter(
        (movieId: number) => movieId !== movie.id
      );
      deleteMovie({ watchlist: userWatchlist, newMovieIds });
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
        {session && userRating && (
          <p
            className="flex items-center gap-1 rounded pr-2 hover:cursor-pointer hover:bg-neutral-600"
            onClick={handleClick}
          >
            <span className="px-1 py-2">
              <SparklesIcon className="h-8 w-8 text-yellow-500" />
            </span>
            {userRating.rating}
          </p>
        )}
        {session && !userRating && (
          <p>
            <span>
              <SparklesIcon
                className="h-12 w-12 rounded p-2 transition duration-300 hover:cursor-pointer hover:bg-neutral-600 hover:text-yellow-400"
                onClick={handleClick}
              />
            </span>
          </p>
        )}
        {!session && (
          <p>
            <span>
              <SparklesIcon
                className="h-12 w-12 rounded p-2 transition duration-300 hover:cursor-pointer hover:bg-neutral-600 hover:text-yellow-400"
                onClick={handleClick}
              />
            </span>
          </p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        {userRating && (
          <>
            <p className="text-sm text-gray-200">Watched</p>
            <p className="flex items-center">
              <span className="px-1 py-2">
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              </span>
            </p>
          </>
        )}
        {!userRating && !userWatchlist && (
          <>
            <p className="text-sm text-gray-200">Add to Watchlist</p>
            <p>
              <span>
                <PlusCircleIcon
                  className="h-12 w-12 rounded p-2 transition duration-300 hover:cursor-pointer hover:bg-neutral-600 hover:text-yellow-400"
                  onClick={handleAddMovie}
                />
              </span>
            </p>
          </>
        )}
        {!userRating && userWatchlist && inWatchlist && (
          <>
            <p className="text-sm text-gray-200">In your Watchlist</p>
            <p className="flex items-center">
              <span>
                <PlusCircleIcon
                  className=" h-12 w-12 rounded p-2 text-yellow-400 transition duration-300 hover:cursor-pointer hover:bg-neutral-600"
                  onClick={handleDeleteMovie}
                />
              </span>
            </p>
          </>
        )}
        {!userRating && userWatchlist && !inWatchlist && (
          <>
            <p className="text-sm text-gray-200">Add to Watchlist</p>
            <p>
              <span>
                <PlusCircleIcon
                  className="h-12 w-12 rounded p-2 transition duration-300 hover:cursor-pointer hover:bg-neutral-600 hover:text-yellow-400"
                  onClick={handleAddMovie}
                />
              </span>
            </p>
          </>
        )}
      </div>
      <RatingModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        movie={movie}
        userRatingApi={userRating}
      />
    </div>
  );
}

export default MovieHeaderUserSection;
