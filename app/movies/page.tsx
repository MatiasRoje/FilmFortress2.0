import MoviesPageUserSection from "@/components/MoviesPageUserSection";
import { getMovies } from "@/lib/movies";
import { findKeyByValue, findValueByKey } from "@/lib/utility";
import Link from "next/link";

import querystring from "querystring";

export const metadata = {
  title: "Movies",
};

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

async function MoviesPage({
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

  let query = findKeyByValue(searchParams, "");
  if (query && searchParams.hasOwnProperty(query)) {
    delete searchParams[query];
  }

  const queryString = querystring.stringify(searchParams);
  const movies = await getMovies(query!, queryString);

  const genreArray = searchParams.with_genres
    ? typeof searchParams.with_genres === "string"
      ? searchParams.with_genres.split(",")
      : []
    : [];

  return (
    <main className="py-6">
      <section className="flex">
        <div className="w-56">
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
          <div>
            <h3>Genres</h3>
            <ul className="flex w-56 flex-wrap gap-1 gap-y-4">
              {GENRES.map(genre => (
                <li key={genre.id}>
                  <Link
                    href={`/movies?include_adult=false&language=en-US&page=1${addGenreToQuery(
                      searchParams,
                      genre.id.toString()
                    )}`}
                    className={`rounded-full border px-2 py-1 ${
                      genreArray.includes(genre.id.toString())
                        ? "bg-neutral-700"
                        : ""
                    }`}
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <MoviesPageUserSection movies={movies} />
      </section>
    </main>
  );
}

export default MoviesPage;
