import Carousel from "@/components/Carousel";
import { getTopRatedMovies } from "@/lib/movie";
import { getTopRatedSeries } from "@/lib/tv";

async function Home() {
  const movies = await getTopRatedMovies();
  const series = await getTopRatedSeries();

  return (
    <main className="flex flex-col gap-4 py-6">
      <h3 className="flex gap-2 text-2xl font-bold">
        <span className="border-l-4 border-main-500 rounded"></span>Top 10
        movies on FilmFortress by rating
      </h3>
      <Carousel media={movies.slice(0, 10)} />
      <h3 className="flex gap-2 text-2xl font-bold">
        <span className="border-l-4 border-main-500 rounded"></span>Top 10 TV
        Shows on FilmFortress by rating
      </h3>
      <Carousel media={series.slice(0, 10)} />
    </main>
  );
}

export default Home;
