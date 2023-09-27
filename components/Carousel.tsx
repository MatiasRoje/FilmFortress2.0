"use client";

import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import MediaCard from "./MediaCard";
import { Movie } from "@/types/movies";
import { TvShow } from "@/types/tv";
import { Rating } from "@/types/ratings";

type CarouselProps = {
  mediaCollection: Movie[] | TvShow[];
  ratings: Rating[];
};

type MediaCollectionProps = Movie | TvShow;

const Carousel = ({ mediaCollection, ratings }: CarouselProps) => {
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
    <div className="relative my-2 overflow-hidden">
      <button
        onClick={handlePrevClick}
        className={`prev-button absolute left-9 top-1/3 z-10 -translate-x-1/2 translate-y-1/2 transform rounded-full border border-white bg-neutral-600/25 p-2 text-white transition duration-300 hover:border-yellow-400 hover:text-yellow-400 ${
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
          <MediaCard media={media} key={media.id} ratings={ratings} />
        ))}
      </ul>
      <button
        onClick={handleNextClick}
        className={`absolute -right-8 top-1/3 z-10 -translate-x-1/2 translate-y-1/2 transform overflow-visible rounded-full border border-white bg-neutral-600/25 p-2 text-white transition duration-300 hover:border-yellow-400 hover:text-yellow-400 ${
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
