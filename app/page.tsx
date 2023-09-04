import Carousel from "@/components/Carousel";
import { getPopularMovies, getTopRatedMovies } from "@/lib/movie";
import { getTopRatedSeries } from "@/lib/tv";

async function Home() {
  const moviesByPopularity = await getPopularMovies();
  const moviesByRate = await getTopRatedMovies();
  const series = await getTopRatedSeries();

  return (
    <main className="flex flex-col gap-4 py-6">
      <h2 className="flex gap-2 text-2xl font-bold">
        <span className="border-l-4 border-main-500 rounded"></span>Trending
      </h2>
      <Carousel media={moviesByPopularity.slice(0, 18)} />
      <h3 className="flex gap-2 text-2xl font-bold">
        <span className="border-l-4 border-main-500 rounded"></span>Top 10
        movies on FilmFortress
      </h3>
      <Carousel media={moviesByRate.slice(0, 10)} />
      <h3 className="flex gap-2 text-2xl font-bold">
        <span className="border-l-4 border-main-500 rounded"></span>Top 10 TV
        Shows on FilmFortress
      </h3>
      <Carousel media={series.slice(0, 10)} />
    </main>
  );
}

export default Home;
