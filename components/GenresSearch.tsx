import { findValueByKey } from "@/lib/utility";
import Link from "next/link";

function GenresSearch({
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

  return (
    <div>
      <h3>Genres</h3>
      <li>
        <Link
          href={`/movies?include_adult=false&language=en-US&page=1${addGenreToQuery(
            searchParams,
            "28"
          )}`}
        >
          Action
        </Link>
      </li>
      <li>
        <Link
          href={`/movies?include_adult=false&language=en-US&page=1${addGenreToQuery(
            searchParams,
            "12"
          )}`}
        >
          Adventure
        </Link>
      </li>
      <li>
        <Link
          href={`/movies?include_adult=false&language=en-US&page=1${addGenreToQuery(
            searchParams,
            "16"
          )}`}
        >
          Animation
        </Link>
      </li>
    </div>
  );
}

export default GenresSearch;
