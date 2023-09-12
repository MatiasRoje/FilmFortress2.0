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

          const url = `/api/search?query=${encodeURIComponent(query)}`;
          const res = await fetch(url, { signal: controller.signal });
          const movies = await res.json();

          setMovies(movies);
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
