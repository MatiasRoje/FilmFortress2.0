"use client";

import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

const Carousel = ({ media }: any) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = media.slice(startIndex, endIndex);
  // For the sliding effect
  const translateX = -currentPage * 66.68;

  const handleNextClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="my-2 overflow-hidden relative">
      <button
        onClick={handlePrevClick}
        className={`absolute p-2 left-9 top-1/3 transform translate-y-1/2 -translate-x-1/2 bg-neutral-600/25 text-white hover:text-sky-500 border border-white rounded-full prev-button z-10 ${
          currentPage === 0 ? "hidden" : ""
        }`}
      >
        <ChevronLeftIcon className="h-12 w-12" />
      </button>
      {
        // TODO Here I need a movie component for displaying the movies
      }
      <ul
        className="flex transition ease-out"
        style={{
          transform: `translateX(${translateX}%)`,
          transitionDuration: "1500ms",
        }}
      >
        {media.map((movie: any) => (
          <li key={movie.id} className="px-3" style={{ flex: "0 0 16.66%" }}>
            <Link href={``}>
              <Image
                src={movie.posterPath}
                alt=""
                width="270"
                height="185"
                className="rounded-t"
              />
              <p>Rating: {movie.voteAverage}</p>
              <p>{movie.title}</p>
              <p>{movie.releaseDate}</p>
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={handleNextClick}
        className={`absolute p-2 -right-8 top-1/3 transform translate-y-1/2 -translate-x-1/2 bg-neutral-600/25 text-white hover:text-yellow-400 hover:border-yellow-400 border border-white rounded-full z-10 overflow-visible ${
          currentPage === Math.ceil(media.length / itemsPerPage) - 1
            ? "hidden"
            : ""
        }`}
      >
        <ChevronRightIcon className="h-12 w-12" />
      </button>
    </div>
  );
};

export default Carousel;
