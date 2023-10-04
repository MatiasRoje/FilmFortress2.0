import Image from "next/image";
import { MovieDetails } from "@/types/movies";
import { Rating } from "@/types/ratings";
import MovieHeaderUserSection from "./MovieHeaderUserSection";
import { Watchlist } from "@/types/watchlists";

type MovieHeaderSectionProps = {
  movie: MovieDetails;
  ratings: Rating[];
  watchlists: Watchlist[];
};

function MovieHeaderSection({
  movie,
  ratings,
  watchlists,
}: MovieHeaderSectionProps) {
  const directors = movie.directors.map(director => director.name);
  const writers = movie.writers.map(writer => writer.name);

  return (
    <section className="px relative my-6 flex gap-8 pr-4">
      <div
        className="absolute inset-0 rounded bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.backgropPath})`,
          filter: "brightness(50%) contrast(110%) grayscale(90%) opacity(50%)",
        }}
      ></div>
      <Image
        src={movie.posterPath}
        alt=""
        width="300"
        height="450"
        className="relative z-10 rounded-l"
        priority
      />
      <div className="pr- relative z-10 flex flex-col gap-4 py-8">
        <div>
          <h1 className="text-3xl">{movie.title}</h1>
          <div className="flex gap-1 text-sm">
            <span>{movie.releaseDate.slice(-4)}</span>
            <span>•</span>
            <span>{movie.runtime}</span>
          </div>
        </div>
        <MovieHeaderUserSection movie={movie} watchlists={watchlists} />
        <p className="italic">{movie.tagline}</p>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">Overview</p>
          <p className="text-justify">{movie.overview}</p>
        </div>
        <div className="mt-auto flex gap-6">
          <div>
            <p className="font-semibold">{directors.join(", ")}</p>
            <p className="text-sm">
              {directors.length === 1 ? "Director" : "Directors"}
            </p>
          </div>
          <div>
            <p className="font-semibold">{writers.join(", ")}</p>
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
  );
}

export default MovieHeaderSection;
