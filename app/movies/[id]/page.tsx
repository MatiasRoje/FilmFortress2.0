import { getMovie } from "@/lib/movies";
import Image from "next/image";
import Link from "next/link";

type MoviePageParams = {
  id: number;
};

type MoviePageProps = {
  params: MoviePageParams;
};

async function MoviePage({ params: { id } }: MoviePageProps) {
  const movie = await getMovie(id);

  return (
    <main>
      <section className="flex gap-8 my-6">
        <Image
          src={movie.posterPath}
          alt=""
          width="300"
          height="450"
          className="rounded"
        />
        <div className="py-8">
          <h2>{movie.title}</h2>
          <div className="flex gap-1">
            <span>{movie.releaseDate}</span>
            <span>•</span>
            <span>{movie.runtime}</span>
          </div>
          <p className="italic">{movie.tagline}</p>
          <p className="font-bold">Overview</p>
          <p>{movie.overview}</p>
        </div>
      </section>
      <section className="mb-6">
        <ul className="flex gap-2 pr-1">
          {movie.genres.map(genre => (
            <li
              key={genre.id}
              className="border rounded-full py-1 px-2 hover:bg-neutral-700"
            >
              <Link href="/">{genre.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default MoviePage;
