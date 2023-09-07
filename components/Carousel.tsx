"use client";

import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import MediaCard from "./MediaCard";
import { Movie } from "@/types/movies";
import { TvShow } from "@/types/tv";

type CarouselProps = Movie[] | TvShow[];

type MediaCollectionProps = Movie | TvShow;

const Carousel = ({ mediaCollection }: { mediaCollection: CarouselProps }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  // Number will be calculated depending of how many movies should be displayed, usually they will be displayed in multiples of 6
  const translateX = -currentPage * (mediaCollection.length > 10 ? 100 : 66.68);

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
        className={`absolute p-2 left-9 top-1/3 transform translate-y-1/2 -translate-x-1/2 bg-neutral-600/25 text-white border border-white hover:text-yellow-400 hover:border-yellow-400 rounded-full prev-button z-10 ${
          currentPage === 0 ? "hidden" : ""
        }`}
      >
        <ChevronLeftIcon className="h-12 w-12" />
      </button>
      <ul
        className="flex transition ease-out"
        style={{
          transform: `translateX(${translateX}%)`,
          transitionDuration: "1500ms",
        }}
      >
        {mediaCollection.map((media: MediaCollectionProps) => (
          <MediaCard media={media} key={media.id} />
        ))}
      </ul>
      <button
        onClick={handleNextClick}
        className={`absolute p-2 -right-8 top-1/3 transform translate-y-1/2 -translate-x-1/2 bg-neutral-600/25 text-white border border-white hover:text-yellow-400 hover:border-yellow-400 rounded-full z-10 overflow-visible ${
          currentPage === Math.ceil(mediaCollection.length / itemsPerPage) - 1
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
