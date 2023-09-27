import { getReviewsFromMovie } from "@/lib/reviews";
import { Review } from "@/types/reviews";
import Link from "next/link";
import ReviewCard from "./ReviewCard";

type ReviewsSectionProps = {
  movieId: number;
};

async function ReviewsSection({ movieId }: ReviewsSectionProps) {
  const reviews: Review[] = await getReviewsFromMovie(movieId);
  const lastReview = reviews.at(-1);

  return (
    <section className="my-6 flex flex-col gap-8">
      <div className="flex items-baseline gap-2 p-2">
        <Link href={`/movies/${movieId}/reviews`}>
          <h3 className="text-xl font-semibold hover:underline">Reviews</h3>
        </Link>
        <span>—{reviews.length}</span>
      </div>
      {lastReview && (
        <div className="flex">
          <ReviewCard review={lastReview} width={"max-w-max"} />
          <div className="mx-8 flex w-24 items-center">
            <Link
              href={`/movies/${movieId}/reviews`}
              className="rounded px-2 py-1 hover:underline"
            >
              Read all reviews
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReviewsSection;
