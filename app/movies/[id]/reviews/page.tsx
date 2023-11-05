import { ReviewTMDB } from "@/types/reviews";
import ReviewsPageUserSection from "@/components/ReviewsPageUserSection";
import { getMovie } from "@/lib/movies";
import { getReviewsFromMovie } from "@/lib/reviews";
import { Metadata } from "next";

type ReviewsPageParams = {
  params: {
    id: number;
  };
};

export async function generateMetadata({
  params,
}: ReviewsPageParams): Promise<Metadata> {
  const movie = await getMovie(params.id);
  return {
    title: `${movie.title} (${movie.releaseDate.slice(-4)}) - Reviews`,
  };
}

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
