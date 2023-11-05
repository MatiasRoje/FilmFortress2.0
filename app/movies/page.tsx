import FilterSearch from "@/components/FilterSearch";
import MoviesPageUserSection from "@/components/MoviesPageUserSection";
import SortSearch from "@/components/SortSearch";
import { getMovies } from "@/lib/movies";
import { findKeyByValue, findValueByKey } from "@/lib/utility";
import Link from "next/link";

import querystring from "querystring";

export const metadata = {
  title: "Movies",
};

async function MoviesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let query = findKeyByValue(searchParams, "");
  if (query && searchParams.hasOwnProperty(query)) {
    delete searchParams[query];
  }

  const queryString = querystring.stringify(searchParams);
  const { movies, totalPages } = await getMovies(query!, queryString);

  return (
    <main className="py-6">
      <section className="flex flex-col sm:flex-row">
        <div className="h-min w-full rounded sm:w-80 xl:w-64">
          <ul className="mb-5 space-y-2 rounded bg-neutral-700 p-4">
            <li>
              <Link
                href="/movies?popular&language=en-US&page=1"
                className={`text-xl font-semibold ${
                  query === "popular" ? "underline" : ""
                }`}
              >
                Popular
              </Link>
            </li>
            <li>
              <Link
                href="/movies?now_playing&language=en-US&page=1"
                className={`whitespace-nowrap text-xl font-semibold ${
                  query === "now_playing" ? "underline" : ""
                }`}
              >
                Now Playing
              </Link>
            </li>
            <li>
              <Link
                href="/movies?upcoming&language=en-US&page=1"
                className={`text-xl font-semibold ${
                  query === "upcoming" ? "underline" : ""
                }`}
              >
                Upcoming
              </Link>
            </li>
            <li>
              <Link
                href="/movies?top_rated&language=en-US&page=1"
                className={`text-xl font-semibold ${
                  query === "top_rated" ? "underline" : ""
                }`}
              >
                Top Rated
              </Link>
            </li>
          </ul>
          <div className="mb-4">
            <SortSearch searchParams={searchParams} />
          </div>
          <FilterSearch searchParams={searchParams} />
        </div>
        <MoviesPageUserSection
          movies={movies}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </section>
    </main>
  );
}

export default MoviesPage;
