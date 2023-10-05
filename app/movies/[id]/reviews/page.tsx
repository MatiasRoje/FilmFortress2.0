import { ReviewTMDB } from "@/types/reviews";
import ReviewsPageUserSection from "@/components/ReviewsPageUserSection";
import { getMovie } from "@/lib/movies";
import { getReviews, getReviewsFromMovie } from "@/lib/reviews";
import { getRatings } from "@/lib/ratings";

type ReviewsPageParams = {
  params: {
    id: number;
  };
};

async function ReviewsPage({ params }: ReviewsPageParams) {
  const movie = await getMovie(params.id);
  const reviews: ReviewTMDB[] = await getReviewsFromMovie(movie.id);
  const { ratings } = await getRatings();
  const { reviews: usersReviews } = await getReviews();

  return (
    <main>
      <ReviewsPageUserSection
        movie={movie}
        reviews={reviews}
        ratings={ratings}
        usersReviews={usersReviews}
      />
    </main>
  );
}

export default ReviewsPage;
