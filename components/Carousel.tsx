"use client";

import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

const Carousel = ({ movies }: any) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = movies.slice(startIndex, endIndex);

  const handleNextClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handlePrevClick}
        className={`prev-button ${currentPage === 0 ? "hidden" : ""}`}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <ul className="grid grid-cols-6 gap-3">
        {visibleItems.map((movie: any) => (
          <li key={movie.id}>
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
        className={`next-button ${
          currentPage === Math.ceil(movies.length / itemsPerPage) - 1
            ? "hidden"
            : ""
        }`}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Carousel;
