import { Movie } from "@/types/movies";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

function useSearch(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const controller = new AbortController();

    async function FetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const url = `/api/search?query=${encodeURIComponent(debouncedQuery)}`;
        const res = await fetch(url, { signal: controller.signal });
        const movies = await res.json();

        setMovies(movies);
        setError("");
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (debouncedQuery.length < 2) {
      setMovies([]);
      setError("");
      return;
    }

    FetchMovies();

    return function () {
      controller.abort();
    };
  }, [debouncedQuery]);

  return { movies, isLoading, error };
}

export default useSearch;
