import Carousel from "@/components/Carousel";
import WatchlistSection from "@/components/WatchlistSection";
import { getMovies, getRandomMovieFromCollection } from "@/lib/movies";
import { getRatings } from "@/lib/ratings";
import { getSeries } from "@/lib/tv";

async function Home() {
  const moviesByPopularity = await getMovies("popular");
  const moviesByRate = await getMovies("top_rated");
  const seriesByRate = await getSeries("top_rated");
  const { ratings } = await getRatings();

  const randomMovie = await getRandomMovieFromCollection(moviesByPopularity);

  return (
    <main className="flex flex-col gap-10 py-6">
      <section className="relative flex flex-col gap-2 my-4 h-96 w-full">
        <div
          className="absolute flex bg-no-repeat bg-cover bg-[70%] inset-0 rounded"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(38, 38, 38, 0.50) calc((50vw - 170px) - 340px), rgba(38, 38, 38, 0.20) 50%, rgba(38, 38, 38, 0.30) 100%), url(${randomMovie.backgropPath})`,
            filter: "grayscale(20%)",
          }}
        ></div>
        <div className="z-10 pt-16 px-6 flex flex-col gap-1">
          <h1 className="text-4xl font-bold">Welcome to FilmFortress.</h1>
          <p className="text-xl font-semibold">
            Countless movies and TV shows waiting to be uncovered.
          </p>
        </div>
      </section>
      <div className="flex flex-col gap-4">
        <h2 className="flex gap-2 text-2xl font-bold">
          <span className="border-l-4 border-main-500 rounded"></span>Trending
        </h2>
        <Carousel
          mediaCollection={moviesByPopularity.slice(0, 18)}
          ratings={ratings}
        />
      </div>
      <WatchlistSection />
      <div className="flex flex-col gap-4">
        <h3 className="flex gap-2 text-2xl font-bold">
          <span className="border-l-4 border-main-500 rounded"></span>Top 10
          movies on FilmFortress
        </h3>
        <Carousel
          mediaCollection={moviesByRate.slice(0, 10)}
          ratings={ratings}
        />
      </div>
      {/* <h3 className="flex gap-2 text-2xl font-bold">
        <span className="border-l-4 border-main-500 rounded"></span>Top 10 TV
        Shows on FilmFortress
      </h3>
      <Carousel mediaCollection={seriesByRate.slice(0, 10)} />  */}
    </main>
  );
}

export default Home;
