"use client";

import { Movie } from "@/types/movies";
import MediaCard from "./MediaCard";
import MediaCardSearch from "./MediaCardSearch";

type MoviesPageUserSectionProps = {
  movies: Movie[];
};

function MoviesPageUserSection({ movies }: MoviesPageUserSectionProps) {
  return (
    <ul className="my-5 ml-0 grid max-w-[60rem] grid-cols-1 gap-4 gap-y-4 sm:my-0 sm:ml-auto sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5 xl:gap-4">
      {movies.map(movie => (
        <MediaCardSearch movie={movie} key={movie.id} />
      ))}
    </ul>
  );
}

export default MoviesPageUserSection;
