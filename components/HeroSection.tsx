import { MovieDetails } from "@/types/movies";

type HeroSectionProps = {
  movie: MovieDetails;
};

function HeroSection({ movie }: HeroSectionProps) {
  return (
    <section className="relative my-4 flex h-[28rem] w-full flex-col gap-2">
      <div
        className="absolute inset-0 flex rounded bg-cover bg-[70%] bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(38, 38, 38, 0.60) calc((50vw - 170px) - 340px), rgba(38, 38, 38, 0.20) 60%, rgba(38, 38, 38, 0.30) 100%), url(${movie.backgropPath})`,
          filter: "grayscale(20%)",
        }}
      ></div>
      <div className="z-10 flex flex-col gap-1 px-6 pt-16">
        <h1 className="text-4xl font-bold">Welcome to FilmFortress.</h1>
        <p className="text-xl font-semibold">
          Countless movies and TV shows waiting to be discovered.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
