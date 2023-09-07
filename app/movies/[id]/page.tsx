import { getMovie } from "@/lib/movies";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";

type MoviePageParams = {
  id: number;
};

type MoviePageProps = {
  params: MoviePageParams;
};

async function MoviePage({ params: { id } }: MoviePageProps) {
  const movie = await getMovie(id);
  const directors = movie.directors.map(director => director.name);
  const writers = movie.writers.map(writer => writer.name);

  return (
    <main>
      <section className="relative flex gap-8 my-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.backgropPath})`,
            filter:
              "brightness(50%) contrast(110%) grayscale(90%) opacity(50%) ",
          }}
        ></div>
        <Image
          src={movie.posterPath}
          alt=""
          width="300"
          height="450"
          className="relative z-10 rounded"
        />
        <div className="relative z-10 text-white flex flex-col gap-4 py-8 pr-8">
          <div>
            <h2 className="text-3xl">{movie.title}</h2>
            <div className="flex gap-1 text-sm">
              <span>{movie.releaseDate}</span>
              <span>•</span>
              <span>{movie.runtime}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 items-center justify-start">
              <p className="text-sm text-gray-200">
                <span className="text-main-400">F</span>F Rating
              </p>
              <p className="flex items-center gap-1">
                <span>
                  <StarIcon className="w-8 h-8 text-yellow-500" />
                </span>{" "}
                {movie.voteAverage.toFixed(1)} / 10
              </p>
            </div>
            <div className="flex flex-col items-center justify-start">
              <p className="text-sm text-gray-200">Your Rating</p>
              <p>
                <span>
                  <SparklesIcon className="w-12 h-12 text-white hover:text-yellow-400 p-2 hover:bg-neutral-600 rounded" />
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center justify-start">
              <p className="text-sm text-gray-200">Add to Watchlist</p>
              <p>
                <span>
                  <PlusCircleIcon className="w-12 h-12 text-white hover:text-yellow-400 p-2 hover:bg-neutral-600 rounded" />
                </span>
              </p>
            </div>
          </div>
          <p className="italic">{movie.tagline}</p>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-lg">Overview</p>
            <p className="text-justify">{movie.overview}</p>
          </div>
          <div className="flex mt-auto gap-6">
            <div>
              <p className="font-bold">{directors.join(", ")}</p>
              <p className="text-sm">
                {directors.length === 1 ? "Director" : "Directors"}
              </p>
            </div>
            <div>
              <p className="font-bold">{writers.join(", ")}</p>
              <p className="text-sm">
                {writers.length === 1
                  ? "Writer"
                  : writers.length === 0
                  ? ""
                  : "Writers"}
              </p>
            </div>
          </div>
        </div>
      </section>
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
                  <p className="font-bold">{cast.name}</p>
                  <p className="text-sm">{cast.character}</p>
                </div>
              </li>
            ))}
            <li className="flex items-center w-24">
              <Link href="" className="rounded py-1 px-2 hover:bg-neutral-700">
                Full Cast & Crew
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-3 rounded bg-neutral-700 py-2 px-6 ml-auto">
            <div>
              <p className="font-bold">
                {movie.countries.length > 1 ? "Countries" : "Country"}
              </p>
              <p>{movie.countries.join(" ")}</p>
            </div>
            <div>
              <p className="font-bold">Status</p>
              <p>{movie.status}</p>
            </div>
            <div>
              <p className="font-bold">Budget</p>
              <p>{movie.budget === "$0" ? "-" : movie.budget}</p>
            </div>
            <div>
              <p className="font-bold">Revenue</p>
              <p>{movie.revenue === "$0" ? "-" : movie.revenue}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MoviePage;
