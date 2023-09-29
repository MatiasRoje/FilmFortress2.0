import { getMovie } from "@/lib/movies";
import { Movie } from "@/types/movies";
import { useEffect, useState } from "react";

function useWatchlist(movieIds: number[]) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        // Use Promise.all to fetch movies concurrently
        const moviePromises = movieIds.map(async movieId => {
          const resMovie = await fetch(`/api/movies/${movieId}`);
          return await resMovie.json();
        });
        const movieData = await Promise.all(moviePromises);

        setMovies(movieData);
      } catch (err) {
        console.error(err);
      }
    }

    if (movieIds && movieIds.length > 0) {
      fetchMovies();
    } else {
      // If there are no movieIds, reset the movies array
      setMovies([]);
    }
  }, [movieIds]);

  return movies;
}

export default useWatchlist;
