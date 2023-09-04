import { getMovies } from "@/lib/movie";
import Image from "next/image";
import Link from "next/link";

async function Home() {
  const movies = await getMovies();
  console.log(movies);

  return (
    <main className="p-4">
      <h2 className="flex gap-2">
        <span className="border-l-4 border-main-500 rounded"></span>Top 10 on
        FilmFortress by rating
      </h2>
      <ul className="grid grid-cols-6">
        {movies.slice(0, 10).map((movie: any) => (
          <li key={movie.id}>
            <Link href={``}>
              <Image
                src={movie.posterPath}
                alt=""
                width="270"
                height="185"
                className="rounded-t"
              />
              <h2>{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Home;
