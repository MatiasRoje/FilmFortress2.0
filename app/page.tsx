import Carousel from "@/components/Carousel";
import { getMovies } from "@/lib/movie";
import { getSeries } from "@/lib/tv";

async function Home() {
  const moviesByPopularity = await getMovies("popular");
  const moviesByRate = await getMovies("top_rated");
  const seriesByRate = await getSeries("top_rated");

  return (
    <main className="flex flex-col gap-4 py-6">
      {/* TODO Convert this subheading to a react component */}
      <h2 className="flex gap-2 text-2xl font-bold">
        <span className="border-l-4 border-main-500 rounded"></span>Trending
      </h2>
      <Carousel mediaCollection={moviesByPopularity.slice(0, 18)} />
      <h3 className="flex gap-2 text-2xl font-bold">
        <span className="border-l-4 border-main-500 rounded"></span>Top 10
        movies on FilmFortress
      </h3>
      <Carousel mediaCollection={moviesByRate.slice(0, 10)} />
      <h3 className="flex gap-2 text-2xl font-bold">
        <span className="border-l-4 border-main-500 rounded"></span>Top 10 TV
        Shows on FilmFortress
      </h3>
      <Carousel mediaCollection={seriesByRate.slice(0, 10)} />
    </main>
  );
}

export default Home;
