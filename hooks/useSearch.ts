import { StripMovie } from "@/lib/movies";
import { Movie } from "@/types/movies";
import { useEffect, useState } from "react";

function useSearch(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();

      async function FetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            { signal: controller.signal },
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          const moviePromises: Promise<Movie>[] = data.results
            .slice(0, 8)
            .map((movie: any) => StripMovie(movie));
          const moviesData = await Promise.all(moviePromises);

          setMovies(moviesData);
          setError("");
          setIsDropdownOpen(true);
        } catch (err: any) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      FetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query],
  );

  return { movies, isLoading, error, isDropdownOpen, setIsDropdownOpen };
}

export default useSearch;
