import Carousel from "@/components/Carousel";
import HeroSection from "@/components/HeroSection";
import WatchlistSection from "@/components/WatchlistSection";
import { getMovies, getRandomMovieFromCollection } from "@/lib/movies";
import { getRatings } from "@/lib/ratings";
import { getSeries } from "@/lib/tv";
import { getWatchlists } from "@/lib/watchlists";

async function Home() {
  const moviesByPopularity = await getMovies("popular");
  const moviesByRate = await getMovies("top_rated");
  const seriesByRate = await getSeries("top_rated");
  const { ratings } = await getRatings();
  const { watchlists } = await getWatchlists();

  const randomMovie = await getRandomMovieFromCollection(moviesByPopularity);

  return (
    <main className="flex flex-col gap-10 py-6">
      <HeroSection movie={randomMovie} />
      <div className="flex flex-col gap-4">
        <h2 className="flex gap-2 text-2xl font-bold">
          <span className="rounded border-l-4 border-main-400"></span>Trending
        </h2>
        <Carousel
          mediaCollection={moviesByPopularity.slice(0, 18)}
          ratings={ratings}
          watchlists={watchlists}
        />
      </div>
      <WatchlistSection watchlists={watchlists} ratings={ratings} />
      <div className="flex flex-col gap-4">
        <h3 className="flex gap-2 text-2xl font-bold">
          <span className="rounded border-l-4 border-main-400"></span>Top 10
          movies on FilmFortress
        </h3>
        <Carousel
          mediaCollection={moviesByRate.slice(0, 10)}
          ratings={ratings}
          watchlists={watchlists}
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
