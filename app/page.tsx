import Carousel from "@/components/Carousel";
import { getMovies } from "@/lib/movie";

async function Home() {
  const movies = await getMovies();
  console.log(movies);

  return (
    <main className="p-4">
      <h2 className="flex gap-2">
        <span className="border-l-4 border-main-500 rounded"></span>Top 10 on
        FilmFortress by rating
      </h2>
      <Carousel movies={movies.slice(0, 10)} />
    </main>
  );
}

export default Home;
