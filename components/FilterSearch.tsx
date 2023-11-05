"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import UserScoreSearch from "./UserScoreSearch";
import MovieRuntimeSearch from "./MovieRuntimeSearch";
import { findValueByKey } from "@/lib/utility";

import querystring from "querystring";

const GENRES = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

function FilterSearch({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  function addGenreToQuery(
    searchParams: { [key: string]: string | string[] | undefined },
    newGenre: string
  ) {
    const genresIsInQuery = searchParams.hasOwnProperty("with_genres");
    if (!genresIsInQuery) {
      return `&with_genres=${newGenre}`;
    }
    if (genresIsInQuery) {
      const genreQuery = findValueByKey(searchParams, "with_genres");
      if (typeof genreQuery === "string") {
        const isInQuery = genreQuery.split(",").includes(newGenre);
        if (isInQuery) {
          if (genreQuery.split(",").length === 1) {
            return "";
          } else {
            return `&with_genres=${genreQuery
              .split(",")
              .filter(genre => genre !== newGenre)
              .join(",")}`;
          }
        } else {
          return `&with_genres=${genreQuery
            .split(",")
            .concat([newGenre])
            .join(",")}`;
        }
      }
    }
  }

  const genreQuery = findValueByKey(searchParams, "with_genres");

  let queryWithoutGenres;
  if (genreQuery) {
    const { with_genres, ...newSearchParams } = searchParams;
    queryWithoutGenres = newSearchParams;
  }

  const newQueryWithoutGenres = querystring.stringify(queryWithoutGenres);

  const genreArray = searchParams.with_genres
    ? typeof searchParams.with_genres === "string"
      ? searchParams.with_genres.split(",")
      : []
    : [];

  return (
    <Disclosure as="div" className="rounded bg-neutral-700">
      {({ open }) => (
        <>
          <Disclosure.Button className="inline-flex w-full items-center justify-between px-4 py-3">
            <h3>Filters</h3>
            {open ? (
              <p>
                <ChevronUpIcon className="h-4 w-4" />
              </p>
            ) : (
              <p>
                <ChevronDownIcon className="h-4 w-4" />
              </p>
            )}
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="flex flex-col gap-4 space-y-2 bg-neutral-700 p-4">
              <h3>Genres</h3>
              <ul className="flex w-full flex-wrap gap-1 gap-y-4 border-b pb-8 sm:w-72 xl:w-full">
                {GENRES.map(genre => (
                  <li key={genre.id}>
                    <Link
                      href={`/movies?${
                        newQueryWithoutGenres
                          ? newQueryWithoutGenres
                          : "include_adult=false&language=en-US&page=1"
                      }${addGenreToQuery(searchParams, genre.id.toString())}`}
                      className={`rounded-full border px-2 py-1 transition-colors duration-100 hover:bg-neutral-600 ${
                        genreArray.includes(genre.id.toString())
                          ? "bg-neutral-600"
                          : ""
                      }`}
                    >
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <UserScoreSearch searchParams={searchParams} />
            <MovieRuntimeSearch searchParams={searchParams} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default FilterSearch;
