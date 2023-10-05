import { getMovie } from "@/lib/movies";
import { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import MovieHeaderSection from "@/components/MovieHeaderSection";
import MovieSecondarySection from "@/components/MovieSecondarySection";
import { getRatings, getUserRatings } from "@/lib/ratings";
import { getUserWatchlist, getWatchlists } from "@/lib/watchlists";
import { ReviewTMDB, UserReview } from "@/types/reviews";
import {
  getReviews,
  getReviewsFromMovie,
  getUserReviewForMovie,
} from "@/lib/reviews";

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
  const { reviews: allUserReviews } = await getReviews();
  const reviews: ReviewTMDB[] = await getReviewsFromMovie(id);

  return (
    <main>
      <MovieHeaderSection movie={movie} />
      <MovieSecondarySection movie={movie} />
      <ReviewsSection
        movie={movie}
        reviews={reviews}
        allUserReviews={allUserReviews}
      />
    </main>
  );
}

export default MoviePage;
