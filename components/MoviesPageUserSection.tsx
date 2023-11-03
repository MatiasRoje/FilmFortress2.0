"use client";

import { Movie } from "@/types/movies";
import MediaCard from "./MediaCard";

type MoviesPageUserSectionProps = {
  movies: Movie[];
};

function MoviesPageUserSection({ movies }: MoviesPageUserSectionProps) {
  return (
    <ul className="ml-auto grid max-w-[60rem] grid-cols-5 gap-4 gap-y-4">
      {movies.map(movie => (
        <MediaCard movie={movie} key={movie.id} />
      ))}
    </ul>
  );
}

export default MoviesPageUserSection;
