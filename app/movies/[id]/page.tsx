import { getMovie } from "@/lib/movies";
import { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import MovieHeaderSection from "@/components/MovieHeaderSection";
import MovieSecondarySection from "@/components/MovieSecondarySection";

type MoviePageParams = {
  id: number;
};

type MoviePageProps = {
  params: MoviePageParams;
};

export async function generateMetadata({
  params: { id },
}: MoviePageProps): Promise<Metadata> {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}

async function MoviePage({ params: { id } }: MoviePageProps) {
  const movie = await getMovie(id);

  return (
    <main>
      <MovieHeaderSection movie={movie} />
      <MovieSecondarySection movie={movie} />
      <ReviewsSection movieId={id} />
    </main>
  );
}

export default MoviePage;
