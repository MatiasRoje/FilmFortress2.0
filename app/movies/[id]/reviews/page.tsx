import { ReviewTMDB } from "@/types/reviews";
import ReviewsPageUserSection from "@/components/ReviewsPageUserSection";
import { getMovie } from "@/lib/movies";
import { getReviewsFromMovie } from "@/lib/reviews";

type ReviewsPageParams = {
  params: {
    id: number;
  };
};

async function ReviewsPage({ params }: ReviewsPageParams) {
  const movie = await getMovie(params.id);
  const reviews: ReviewTMDB[] = await getReviewsFromMovie(movie.id);

  return (
    <main>
      <ReviewsPageUserSection movie={movie} reviews={reviews} />
    </main>
  );
}

export default ReviewsPage;
