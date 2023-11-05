"use client";

import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
import useWatchlistMovies from "@/hooks/useWatchlistMovies";
import Carousel from "./Carousel";
import Spinner from "./Spinner";
import { useUserWatchlist } from "@/hooks/useUserWatchlist";
import { useSession } from "next-auth/react";

function WatchlistSection() {
  const [isHovered, setIsHovered] = useState(false);
  const { data: session } = useSession();

  const { userWatchlist } = useUserWatchlist(session?.user?.id);

  const { movies, isLoading } = useWatchlistMovies(userWatchlist?.movieIds);

  function handleHoverIn() {
    setIsHovered(true);
  }

  function handleHoverOut() {
    setIsHovered(false);
  }

  return (
    <section className="my-4 flex flex-col gap-4">
      <Link
        href={`/users/${session?.user?.id}/watchlist`}
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
      >
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <span className="rounded border-l-4 border-main-400 pl-2">
            From your Watchlist
          </span>
          <span>
            <ChevronRightIcon
              className={`h-7 w-7 ${
                isHovered && "text-main-300"
              } transition duration-300`}
            />
          </span>
        </h2>
      </Link>

      {!session && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span>
            <PlusCircleIcon className="h-12 w-12 p-2" />
          </span>
          <div>
            <p className="font-semibold">Sign in to access your Watchlist</p>
            <p>
              Create a list of TV shows and movies to help you remember what
              you&apos;d like to watch.
            </p>
          </div>
          <Button paddingX="px-12" href="/login">
            Login
          </Button>
        </div>
      )}
      {session && !userWatchlist && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span>
            <PlusCircleIcon className="h-12 w-12 p-2" />
          </span>
          <div>
            <p className="font-semibold">Your Watchlist is empty</p>
            <p>
              Create a list of TV shows and movies to help you remember what
              you&apos;d like to watch.
            </p>
          </div>
          <Link
            href="/movies"
            className="rounded bg-neutral-600 px-6 py-2 transition duration-300 hover:bg-neutral-500 focus:outline-none focus:ring focus:ring-neutral-500 focus:ring-offset-2"
          >
            Browse popular movies
          </Link>
        </div>
      )}
      {session && userWatchlist && userWatchlist.movieIds.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span>
            <PlusCircleIcon className="h-12 w-12 p-2" />
          </span>
          <div>
            <p className="font-semibold">Your Watchlist is empty</p>
            <p>
              Create a list of TV shows and movies to help you remember what
              you&apos;d like to watch.
            </p>
          </div>
          <Link
            href="/movies"
            className="focus:ring- rounded bg-neutral-600 px-6 py-2 transition duration-300 hover:bg-neutral-500 focus:outline-none focus:ring focus:ring-neutral-500 focus:ring-offset-2"
          >
            Browse popular movies
          </Link>
        </div>
      )}
      {isLoading && session && userWatchlist && (
        <div className="my-10 flex items-center justify-center">
          <Spinner dimensions="w-12 h-12" />
        </div>
      )}
      {!isLoading && session && userWatchlist && (
        <Carousel mediaCollection={movies} />
      )}
    </section>
  );
}

export default WatchlistSection;
