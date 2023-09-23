import { MovieDetails } from "@/types/movies";
import Image from "next/image";
import Link from "next/link";

type MovieSecondarySectionProps = {
  movie: MovieDetails;
};

function MovieSecondarySection({ movie }: MovieSecondarySectionProps) {
  return (
    <section className="flex flex-col gap-8 mb-6">
      <ul className="flex gap-2 pr-1">
        {movie.genres.map(genre => (
          <li
            key={genre.id}
            className="border rounded-full py-1 px-2 hover:bg-neutral-700"
          >
            <Link href="">{genre.name}</Link>
          </li>
        ))}
      </ul>
      <div className="flex">
        <ul className="flex gap-3">
          {movie.cast.map(cast => (
            <li key={cast.name} className="rounded bg-neutral-700">
              <Image
                src={cast.profilePath}
                alt=""
                width="144"
                height="175"
                className="rounded-t"
              />
              <div className="w-36 p-2">
                <p className="font-semibold">{cast.name}</p>
                <p className="text-sm">{cast.character}</p>
              </div>
            </li>
          ))}
          <li className="flex items-center w-24">
            <Link href="" className="rounded py-1 px-2 hover:underline">
              Full Cast & Crew
            </Link>
          </li>
        </ul>
        <div className="flex flex-col gap-3 rounded bg-neutral-700 py-2 px-6 ml-auto">
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
  );
}

export default MovieSecondarySection;
