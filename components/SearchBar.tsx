"use client";

import useSearch from "@/hooks/useSearch";
import { Movie } from "@/types/movies";
import { Combobox } from "@headlessui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import ImagePlaceholderMovie from "./ImagePlaceholderMovie";

function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useSearch(query);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (id: number) => {
    setQuery("");
    router.push(`/movies/${id}`);
  };

  useEffect(() => {
    setQuery("");
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }, 0);
  }, [pathname]);

  return (
    <div className="relative flex items-center justify-center gap-1">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          placeholder="Search movies, tv shows..."
          className="w-[36rem] rounded border-none px-4 py-2 text-lg text-neutral-800 transition-all duration-300 focus:-translate-y-px focus:shadow-lg focus:outline-none"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={inputRef}
        />
        {isLoading && <Spinner dimensions="w-8 h-8" />}
        {error && <p className="text-red-500">Error</p>}
        <Combobox.Options className="absolute left-0 top-full z-20 my-2 grid w-[36rem] grid-cols-2 rounded bg-neutral-600 shadow-lg [&>*:nth-child(1)]:rounded-tl [&>*:nth-child(2)]:rounded-tr [&>*:nth-last-child(1)]:rounded-br [&>*:nth-last-child(2)]:rounded-bl">
          {!isLoading &&
            !error &&
            movies?.map((movie: Movie) => (
              <Combobox.Option key={movie.id} value={movie.id}>
                {({ active }) => (
                  <span
                    className={`flex p-2 ${active ? "bg-neutral-500" : ""}`}
                  >
                    <div>
                      {movie.posterPath ? (
                        <Image
                          src={movie.posterPath}
                          alt=""
                          width={80}
                          height={160}
                          className="h-[7.5rem] w-20 max-w-none rounded"
                          placeholder="empty"
                          quality={1}
                        />
                      ) : (
                        <ImagePlaceholderMovie dimensions="h-[7.5rem] w-20" />
                      )}
                    </div>
                    <div className="p-2">
                      <p className="font-semibold">{movie.title}</p>
                      <p className="text-sm">{movie.releaseDate.slice(-4)}</p>
                    </div>
                  </span>
                )}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

export default SearchBar;
