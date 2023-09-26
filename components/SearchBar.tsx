"use client";

import useSearch from "@/hooks/useSearch";
import { Movie } from "@/types/movies";
import { Combobox } from "@headlessui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

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
    <div className="relative flex gap-1 items-center justify-center">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          placeholder="Search movies, tv shows..."
          className="text-neutral-800 border-none px-4 py-2 text-lg rounded w-[36rem] transition-all duration-300 focus:outline-none focus:shadow-lg focus:-translate-y-px"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={inputRef}
        />
        {isLoading && <Spinner dimensions="w-8 h-8" />}
        {error && <p className="text-red-500">Error</p>}
        <Combobox.Options className="absolute z-20 top-full left-0 w-[36rem] my-2 bg-neutral-600 rounded shadow-lg grid grid-cols-2 [&>*:nth-child(1)]:rounded-tl [&>*:nth-child(2)]:rounded-tr [&>*:nth-last-child(1)]:rounded-br [&>*:nth-last-child(2)]:rounded-bl">
          {!isLoading &&
            !error &&
            movies?.map((movie: Movie) => (
              <Combobox.Option key={movie.id} value={movie.id}>
                {({ active }) => (
                  <span
                    className={`flex p-2 ${active ? "bg-neutral-500" : ""}`}
                  >
                    <div>
                      <Image
                        src={movie.posterPath}
                        alt=""
                        width={75}
                        height={150}
                        className="max-w-none rounded"
                        placeholder="empty"
                        quality={1}
                      />
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
