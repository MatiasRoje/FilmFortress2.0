"use client";

import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

function WatchlistSection() {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useAuth();
  const [tempWatchlist, setTempWatchlist] = useState([]);

  function handleHoverIn() {
    setIsHovered(true);
  }

  function handleHoverOut() {
    setIsHovered(false);
  }

  return (
    <section className="my-4 flex flex-col gap-4">
      <Link
        href="/users/:id/watchlist"
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
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <span>
          <PlusCircleIcon className="h-12 w-12 p-2" />
        </span>
        {!isAuthenticated ? (
          <>
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
          </>
        ) : tempWatchlist.length === 0 ? (
          <>
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
          </>
        ) : (
          // TODO Code for when the marked movies are pulled from the API
          <p>Many movies</p>
        )}
      </div>
    </section>
  );
}

export default WatchlistSection;
