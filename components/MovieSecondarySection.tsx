import { MovieDetails } from "@/types/movies";
import Image from "next/image";
import Link from "next/link";
import ShareLinkButton from "./ShareLinkButton";
import ImagePlaceholderPerson from "./ImagePlaceholderPerson";

type MovieSecondarySectionProps = {
  movie: MovieDetails;
};

function MovieSecondarySection({ movie }: MovieSecondarySectionProps) {
  return (
    <>
      <section className="mb-6 flex w-full flex-col gap-8 overflow-x-auto">
        <div className="flex items-center justify-between">
          <ul className="flex w-2/3 flex-wrap gap-2 pr-1">
            {movie.genres.map(genre => (
              <li
                key={genre.name}
                className="rounded-full border px-2 py-1 text-xs hover:bg-neutral-700 sm:text-base"
              >
                <Link
                  href={`/movies?include_adult=false&language=en-US&page=1&with_genres=${genre.id}`}
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
          <ShareLinkButton />
        </div>
        <div className="flex">
          <ul className="flex gap-3">
            {movie.cast.map(cast => (
              <li key={cast.name} className="rounded bg-neutral-700">
                {cast.profilePath ? (
                  <Image
                    src={cast.profilePath}
                    alt=""
                    width="144"
                    height="176"
                    className="rounded-t"
                  />
                ) : (
                  <ImagePlaceholderPerson
                    dimensions="w-36 h-[216px]"
                    rounded="rounded-t"
                  />
                )}
                <div className="w-36 p-2">
                  <p className="font-semibold">{cast.name}</p>
                  <p className="text-sm">{cast.character}</p>
                </div>
              </li>
            ))}
            <li className="flex w-24 items-center">
              <Link
                href={`/movies/${movie.id}/cast`}
                className="rounded px-2 py-1 hover:underline"
              >
                Full Cast & Crew
              </Link>
            </li>
          </ul>
          <div className="ml-auto hidden flex-col gap-3 rounded bg-neutral-700 px-6 py-2 sm:flex">
            <div>
              <p className="font-medium">
                {movie.countries.length > 1 ? "Countries" : "Country"}
              </p>
              <p>{movie.countries.join(" ")}</p>
            </div>
            <div>
              <p className="font-medium">Status</p>
              <p>{movie.status}</p>
            </div>
            <div>
              <p className="font-medium">Budget</p>
              <p>{movie.budget === "$0" ? "-" : movie.budget}</p>
            </div>
            <div>
              <p className="font-mediumfon">Revenue</p>
              <p>{movie.revenue === "$0" ? "-" : movie.revenue}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-3 rounded bg-neutral-700 px-6 py-2 sm:hidden">
        <div className="flex gap-20">
          <div className="w-1/3">
            <p className="font-medium">
              {movie.countries.length > 1 ? "Countries" : "Country"}
            </p>
            <p>{movie.countries.join(" ")}</p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <p>{movie.status}</p>
          </div>
        </div>
        <div className="flex gap-20">
          <div className="w-1/3">
            <p className="font-medium">Budget</p>
            <p>{movie.budget === "$0" ? "-" : movie.budget}</p>
          </div>
          <div>
            <p className="font-mediumfon">Revenue</p>
            <p>{movie.revenue === "$0" ? "-" : movie.revenue}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default MovieSecondarySection;
