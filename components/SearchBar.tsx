"use client";

import useSearch from "@/hooks/useSearch";
import { Movie } from "@/types/movies";
import { Combobox } from "@headlessui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import ImagePlaceholderMovie from "./ImagePlaceholderMovie";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useSearch(query);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleChange = (id: number) => {
    setQuery("");
    router.push(`/movies/${id}`);
  };

  const handleMobileOpen: MouseEventHandler<SVGSVGElement> = () => {
    setMobileOpen(prev => !prev);
  };

  useEffect(() => {
    if (mobileOpen) {
      mobileInputRef.current?.focus();
    }
  }, [mobileOpen]);

  useEffect(() => {
    setQuery("");
    setMobileOpen(false);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }, 0);
  }, [pathname]);

  return (
    <li className="ml-auto mr-0 flex items-center justify-center gap-1 transition-all duration-700 md:relative md:mx-auto md:duration-300 ">
      <MagnifyingGlassIcon
        className="h-6 w-6 md:hidden"
        onClick={handleMobileOpen}
      />
      <Combobox onChange={handleChange}>
        {/* NOTE DESKTOP INPUT SEARCH */}
        <Combobox.Input
          // placeholder="Search movies, tv shows..."
          placeholder="Search movies"
          className="hidden w-72 rounded border-none px-4 py-2 text-lg text-neutral-800 transition-all duration-300 focus:-translate-y-px focus:shadow-lg focus:outline-none md:block lg:w-96 xl:w-[36rem]"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={inputRef}
        />
        {/* NOTE MOBILE INPUT SEARCH */}
        {mobileOpen && (
          <>
            <Combobox.Input
              placeholder="Search movies"
              className="absolute inset-x-0 z-10 w-full rounded border-none px-4 py-2 text-neutral-800 focus:shadow-lg focus:outline-none"
              value={query}
              onChange={event => setQuery(event.target.value)}
              ref={mobileInputRef}
            />
            <div className="absolute right-3 top-5 z-20 cursor-pointer">
              <XMarkIcon
                className="h-6 w-6 text-neutral-500"
                onClick={handleMobileOpen}
              />
            </div>
          </>
        )}
        {isLoading && <Spinner dimensions="w-8 h-8" />}
        {error && <p className="text-red-500">Error</p>}
        <Combobox.Options className="absolute left-0 top-full z-20 my-2 grid w-full grid-cols-1 rounded bg-neutral-600 shadow-lg hover:cursor-pointer sm:w-72 lg:w-[36rem] lg:grid-cols-2 [&>*:nth-child(1)]:rounded-tl [&>*:nth-child(2)]:rounded-tr [&>*:nth-last-child(1)]:rounded-br [&>*:nth-last-child(2)]:rounded-bl">
          {!isLoading &&
            !error &&
            movies?.map((movie: Movie) => (
              <Combobox.Option key={movie.id} value={movie.id}>
                {({ active }) => (
                  <span
                    className={`flex p-2 ${
                      active ? "rounded bg-neutral-500" : ""
                    }`}
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
    </li>
  );
}

export default SearchBar;
