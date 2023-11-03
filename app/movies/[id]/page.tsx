import { getMovie } from "@/lib/movies";
import { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import MovieHeaderSection from "@/components/MovieHeaderSection";
import MovieSecondarySection from "@/components/MovieSecondarySection";
import { ReviewTMDB } from "@/types/reviews";
import { getReviewsFromMovie } from "@/lib/reviews";

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
    title: `${movie.title} (${movie.releaseDate.slice(-4)})`,
  };
}

async function MoviePage({ params: { id } }: MoviePageProps) {
  const movie = await getMovie(id);
  const reviews: ReviewTMDB[] = await getReviewsFromMovie(id);

  return (
    <main>
      <MovieHeaderSection movie={movie} />
      <MovieSecondarySection movie={movie} />
      <ReviewsSection movie={movie} reviews={reviews} />
    </main>
  );
}

export default MoviePage;
