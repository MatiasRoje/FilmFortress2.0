import { getReviewsFromMovie } from "@/lib/reviews";
import { Review } from "@/types/reviews";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ExpandableText from "./ExpandableText";

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
          <div className="bg-neutral-700 rounded p-4 grow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">
                  Review by {lastReview.author}{" "}
                </p>
                <p className="text-sm italic">
                  Written on {lastReview.createdDate}
                </p>
              </div>
              <p className="flex items-center justify-center gap-1 text-lg">
                <span>
                  <StarIcon className="w-6 h-6 text-yellow-500" />
                </span>{" "}
                {lastReview.rating?.toFixed(1)}
              </p>
            </div>
            <article className="mt-4 text-justify">
              {<ExpandableText text={lastReview.content} />}
            </article>
          </div>
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
