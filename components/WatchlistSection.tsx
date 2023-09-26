"use client";

import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";

function WatchlistSection() {
  const [isHovered, setIsHovered] = useState(false);

  function handleHoverIn() {
    setIsHovered(true);
  }

  function handleHoverOut() {
    setIsHovered(false);
  }

  return (
    <section className="flex flex-col gap-4 my-4">
      <Link
        href="/users/:id/watchlist"
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
      >
        <h2 className="flex gap-2 text-2xl font-bold items-center">
          <span className="border-l-4 border-main-400 rounded pl-2">
            From your Watchlist
          </span>
          <span>
            <ChevronRightIcon
              className={`w-7 h-7 ${
                isHovered && "text-main-300"
              } transition duration-300`}
            />
          </span>
        </h2>
      </Link>
      <div className="flex flex-col gap-4 items-center justify-center text-center">
        <span>
          <PlusCircleIcon className="p-2 w-12 h-12 text-yellow-400" />
        </span>
        <div>
          <p className="font-semibold">Sign in to access your Watchlist</p>
          <p>
            Create a list of TV shows and movies to help you remember what
            you&apos;d like to watch.
          </p>
        </div>
        <Button paddingX="px-12">
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </section>
  );
}

export default WatchlistSection;
