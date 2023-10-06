import MediaCard from "@/components/MediaCard";
import MoviesPageUserSection from "@/components/MoviesPageUserSection";
import { getMovies } from "@/lib/movies";
import { findKeyByValue } from "@/lib/utility";
import Link from "next/link";
import querystring from "querystring";

export const metadata = {
  title: "Movies",
};

async function MoviesPage({ searchParams }) {
  let query = findKeyByValue(searchParams, "");
  if (query && searchParams.hasOwnProperty(query)) {
    delete searchParams[query];
  }

  const queryString = querystring.stringify(searchParams);
  const movies = !query
    ? await getMovies("popular")
    : await getMovies(query!, queryString);

  return (
    <main className="py-6">
      <section className="flex">
        <div className="pr-36">
          <ul>
            <li>
              <Link
                href="/movies?popular&language=en-US&page=1"
                className={`${query === "popular" ? "underline" : ""}`}
              >
                Popular
              </Link>
            </li>
            <li>
              <Link
                href="/movies?now_playing&language=en-US&page=1"
                className={`whitespace-nowrap ${
                  query === "now_playing" ? "underline" : ""
                }`}
              >
                Now Playing
              </Link>
            </li>
            <li>
              <Link
                href="/movies?upcoming&language=en-US&page=1"
                className={`${query === "upcoming" ? "underline" : ""}`}
              >
                Upcoming
              </Link>
            </li>
            <li>
              <Link
                href="/movies?top_rated&language=en-US&page=1"
                className={`${query === "top_rated" ? "underline" : ""}`}
              >
                Top Rated
              </Link>
            </li>
          </ul>
        </div>
        <MoviesPageUserSection movies={movies} />
      </section>
    </main>
  );
}

export default MoviesPage;
