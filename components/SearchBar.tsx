"use client";

import useKey from "@/hooks/useKey";
import useSearch from "@/hooks/useSearch";
import { Movie } from "@/types/movies";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputEl = useRef<HTMLInputElement | null>(null);
  const { movies, isLoading, error, isDropdownOpen, setIsDropdownOpen } =
    useSearch(query);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    if (inputEl.current) {
      inputEl.current.focus();
      setQuery("");
    }
  });

  // Function to close the dropdown
  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, [setIsDropdownOpen]);

  // Add a click event listener to the document
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    }

    // Attach the event listener
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeDropdown]);

  function handleClick(id: number) {
    setIsDropdownOpen(false);
    router.push(`/movies/${id}`);
  }

  return (
    <div className="relative">
      <div className="flex">
        <input
          className="text-neutral-800 border-none px-4 py-2 text-lg rounded w-[36rem] transition-all duration-300 focus:outline-none focus:shadow-lg focus:-translate-y-px"
          type="text"
          placeholder="Search movies, tv show..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          ref={inputEl}
        />
        {/* TODO: We need a proper spinner for this, not a Loading string... */}
        {isLoading && <Loader />}
        {error && <p>Error</p>}
      </div>
      {isDropdownOpen && (
        <div
          className="absolute z-20 top-full left-0 w-[36rem] my-2 bg-neutral-600 rounded shadow-lg"
          ref={dropdownRef}
        >
          <ul className="grid grid-cols-2 [&>*:nth-child(1)]:rounded-tl [&>*:nth-child(2)]:rounded-tr [&>*:nth-last-child(1)]:rounded-br [&>*:nth-last-child(2)]:rounded-bl">
            {!isLoading &&
              !error &&
              movies?.map((movie: Movie) => (
                <li className="hover:bg-neutral-500" key={movie.id}>
                  <Link
                    href={`/movies/${movie.id}`}
                    onClick={e => {
                      e.preventDefault();
                      handleClick(movie.id);
                    }}
                    className="flex p-2"
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
                      <p>{movie.title}</p>
                      <p>{movie.releaseDate.slice(-4)}</p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

export default SearchBar;
