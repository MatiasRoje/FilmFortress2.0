"use client";

import { Movie } from "@/types/movies";
import MediaCardSearch from "./MediaCardSearch";
import { findValueByKey } from "@/lib/utility";

import querystring from "querystring";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type MoviesPageUserSectionProps = {
  movies: Movie[];
  totalPages: number;
  searchParams: { [key: string]: string | string[] | undefined };
};

function MoviesPageUserSection({
  movies,
  totalPages,
  searchParams,
}: MoviesPageUserSectionProps) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const sortByQuery = findValueByKey(searchParams, "page");
  if (sortByQuery && searchParams.page) {
    setPage(+searchParams?.page);
    delete searchParams["page"];
  }

  const queryString = querystring.stringify(searchParams);

  useEffect(() => {
    router.push(`/movies?${queryString}&page=${page}`);
  }, [page, router, queryString]);

  const handleClickPrevious = () => {
    setPage(prev => prev - 1);
  };

  const handleClickNext = () => {
    setPage(prev => prev + 1);
  };

  return (
    <ul className="my-5 ml-0 grid max-w-[60rem] grid-cols-1 gap-4 gap-y-4 sm:my-0 sm:ml-auto sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5 xl:gap-4">
      {movies.map(movie => (
        <MediaCardSearch movie={movie} key={movie.id} />
      ))}
      <li className="sm:col-span-2 lg:col-span-3 xl:col-span-5">
        {page > 1 && (
          <ArrowLeftIcon
            className="float-left h-6 w-6 cursor-pointer"
            onClick={handleClickPrevious}
          />
        )}

        {page < totalPages && (
          <ArrowRightIcon
            className="float-right h-6 w-6 cursor-pointer"
            onClick={handleClickNext}
          />
        )}
      </li>
    </ul>
  );
}

export default MoviesPageUserSection;
