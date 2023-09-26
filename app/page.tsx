import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import WatchlistSection from "@/components/WatchlistSection";
import { getMovies } from "@/lib/movies";
import { getRatings } from "@/lib/ratings";
import { getSeries } from "@/lib/tv";
import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

async function Home() {
  const moviesByPopularity = await getMovies("popular");
  const moviesByRate = await getMovies("top_rated");
  const seriesByRate = await getSeries("top_rated");
  const { ratings } = await getRatings();

  return (
    <main className="flex flex-col gap-10 py-6">
      {/* TODO Convert this subheading to a react component */}
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
