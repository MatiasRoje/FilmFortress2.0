import { getMovie } from "@/lib/movies";
import { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import MovieHeaderSection from "@/components/MovieHeaderSection";
import MovieSecondarySection from "@/components/MovieSecondarySection";
import { getRatings } from "@/lib/ratings";

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
    title: `${movie.title} (${movie.releaseDate})`,
  };
}

async function MoviePage({ params: { id } }: MoviePageProps) {
  const movie = await getMovie(id);
  const { ratings } = await getRatings();

  return (
    <main>
      <MovieHeaderSection movie={movie} ratings={ratings} />
      <MovieSecondarySection movie={movie} />
      <ReviewsSection movieId={id} />
    </main>
  );
}

export default MoviePage;
