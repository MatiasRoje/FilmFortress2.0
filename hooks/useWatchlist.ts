import Loading from "@/app/loading";
import { Movie } from "@/types/movies";
import { useEffect, useState } from "react";

function useWatchlist(movieIds: number[] | undefined) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        if (movieIds && movieIds.length > 0) {
          setIsLoading(true);
          // Use Promise.all to fetch movies concurrently
          const moviePromises = movieIds.map(async movieId => {
            const resMovie = await fetch(`/api/movies/${movieId}`);
            return await resMovie.json();
          });

          const movieData = await Promise.all(moviePromises);

          setMovies(movieData);
        } else {
          // If there are no movieIds, reset the movies array
          setMovies([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies(); // Always call fetchMovies, even if movieIds is undefined
  }, [movieIds]);

  return { movies, isLoading };
}

export default useWatchlist;
