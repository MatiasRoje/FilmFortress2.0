import { getMovie } from "@/lib/movies";

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
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p></p>
    </main>
  );
}

export default MoviePage;
