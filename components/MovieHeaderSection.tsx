"use client";

import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MovieDetails } from "@/types/movies";
import RateModal from "./RateModal";
import { useState } from "react";
import { Rating } from "@/types/ratings";

type MovieHeaderSectionProps = {
  movie: MovieDetails;
  ratings: Rating[];
};

function MovieHeaderSection({ movie, ratings }: MovieHeaderSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRating, setTempRating] = useState<string | number>("");
  const directors = movie.directors.map(director => director.name);
  const writers = movie.writers.map(writer => writer.name);
  const userRating = ratings.find(rating => rating.movieId === movie.id);

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <section className="relative flex gap-8 my-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.backgropPath})`,
          filter: "brightness(50%) contrast(110%) grayscale(90%) opacity(50%) ",
        }}
      ></div>
      <Image
        src={movie.posterPath}
        alt=""
        width="300"
        height="450"
        className="relative z-10 rounded"
        priority
      />
      <div className="relative z-10 text-white flex flex-col gap-4 py-8 pr-8">
        <div>
          <h1 className="text-3xl">{movie.title}</h1>
          <div className="flex gap-1 text-sm">
            <span>{movie.releaseDate}</span>
            <span>•</span>
            <span>{movie.runtime}</span>
          </div>
        </div>
        <div className="flex gap-3 py-1 items-start">
          <div className="flex flex-col gap-1 items-center justify-start">
            <p className="text-sm text-gray-200">
              <span className="text-main-300">F</span>F Rating
            </p>
            <p className="flex items-center gap-1">
              <span className="p-1">
                <StarIcon className="w-8 h-8 text-yellow-500" />
              </span>{" "}
              {movie.voteAverage.toFixed(1)}
            </p>
          </div>
          <div className="flex flex-col items-center justify-baseline">
            <p className="text-sm text-gray-200">Your Rating</p>
            {userRating && (
              <p className="flex items-center gap-1">
                <span className="px-1 py-2">
                  <SparklesIcon className="w-8 h-8 text-yellow-500" />
                </span>{" "}
                {userRating.rating}
              </p>
            )}
            {tempRating && (
              <p className="flex items-center gap-1">
                <span className="px-1 py-2">
                  <SparklesIcon className="w-8 h-8 text-yellow-500" />
                </span>{" "}
                {tempRating}
              </p>
            )}
            {!userRating && !tempRating && (
              <p>
                <span>
                  <SparklesIcon
                    className="w-12 h-12 text-white hover:text-yellow-400 p-2 hover:bg-neutral-600 rounded transition duration-300"
                    onClick={handleClick}
                  />
                </span>
              </p>
            )}
          </div>
          <div className="flex flex-col items-center justify-start">
            <p className="text-sm text-gray-200">Add to Watchlist</p>
            <p>
              <span>
                <PlusCircleIcon className="w-12 h-12 text-white hover:text-yellow-400 p-2 hover:bg-neutral-600 rounded transition duration-300" />
              </span>
            </p>
          </div>
        </div>
        <p className="italic">{movie.tagline}</p>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">Overview</p>
          <p className="text-justify">{movie.overview}</p>
        </div>
        <div className="flex mt-auto gap-6">
          <div>
            <p className="font-semibold">{directors.join(", ")}</p>
            <p className="text-sm">
              {directors.length === 1 ? "Director" : "Directors"}
            </p>
          </div>
          <div>
            <p className="font-semibold">{writers.join(", ")}</p>
            <p className="text-sm">
              {writers.length === 1
                ? "Writer"
                : writers.length === 0
                ? ""
                : "Writers"}
            </p>
          </div>
        </div>
      </div>
      <RateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        media={movie}
        setTempRating={setTempRating}
      />
    </section>
  );
}

export default MovieHeaderSection;
