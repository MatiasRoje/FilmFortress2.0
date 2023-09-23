import { getReviewsFromMovie } from "@/lib/reviews";
import { Review } from "@/types/reviews";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ExpandableText from "./ExpandableText";
import ReviewCard from "./ReviewCard";

type ReviewsSectionProps = {
  movieId: number;
};

async function ReviewsSection({ movieId }: ReviewsSectionProps) {
  const reviews: Review[] = await getReviewsFromMovie(movieId);
  const lastReview = reviews.at(-1);

  return (
    <section className="flex flex-col gap-8 my-6">
      <div className="flex gap-2 items-baseline p-2">
        <Link href={`/movies/${movieId}/reviews`}>
          <h3 className="text-xl font-semibold hover:underline">Reviews</h3>
        </Link>
        <span>—{reviews.length}</span>
      </div>
      {lastReview && (
        <div className="flex">
          <ReviewCard review={lastReview} width={"max-w-max"} />
          <div className="flex items-center w-24 mx-8">
            <Link
              href={`/movies/${movieId}/reviews`}
              className="rounded py-1 px-2 hover:underline"
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
