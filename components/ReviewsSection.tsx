"use client";

import { ReviewTMDB, UserReview } from "@/types/reviews";
import Link from "next/link";
import ReviewCard from "./ReviewCard";
import ReviewsButton from "./ReviewsButton";
import { MovieDetails } from "@/types/movies";
import { useAuth } from "@/providers/AuthContext";
import UserReviewCard from "./UserReviewCard";
import { useUserRatings } from "@/hooks/useUserRatings";
import { useUserReviews } from "@/hooks/useUserReviews";
import { ConvertUserReviewToReviewTMDB } from "@/lib/reviews";

type ReviewsSectionProps = {
  movie: MovieDetails;
  reviews: ReviewTMDB[];
  allUserReviews: UserReview[];
};

function ReviewsSection({
  movie,
  reviews,
  allUserReviews,
}: ReviewsSectionProps) {
  const { user, isAuthenticated } = useAuth();

  const { userRatings } = useUserRatings(user?.id);
  const userRating = userRatings?.find(rating => rating.movieId === movie.id);

  const { userReviews } = useUserReviews(user?.id);
  const userReview = userReviews
    ?.filter(
      (review: UserReview) =>
        review.userId === user?.id && review.movieId === movie.id
    )
    .at(0);

  // Concat reviews with userReviews for handling the case when the user is not Authentificated but his
  // review is still published on the website
  const allReviews = [
    ...allUserReviews
      .filter((review: UserReview) => review.movieId === movie.id)
      .map(review => ConvertUserReviewToReviewTMDB(review)),
    ...reviews,
  ].sort((a, b) => {
    // Convert date strings to Date objects
    const dateA = new Date(a.createdDate);
    const dateB = new Date(b.createdDate);

    // Compare the Date objects
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0; // Dates are equal
  });

  const mostRecentReview = allReviews.at(-1);

  return (
    <section className="my-8 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="flex items-baseline gap-2 p-2">
          <Link href={`/movies/${movie.id}/reviews`}>
            <h3 className="text-xl font-semibold hover:underline">Reviews</h3>
          </Link>
          <span>—{allReviews.length}</span>
        </div>
        {isAuthenticated && !userReview && <ReviewsButton movie={movie} />}
        {!isAuthenticated && <ReviewsButton movie={movie} />}
      </div>
      {isAuthenticated && userReview ? (
        <div className="flex">
          <UserReviewCard
            review={userReview}
            width={"max-w-max"}
            userRating={userRating}
            movie={movie}
          />
          <div className="mx-8 flex w-24 items-center">
            <Link
              href={`/movies/${movie.id}/reviews`}
              className="rounded px-2 py-1 hover:underline"
            >
              Read all reviews
            </Link>
          </div>
        </div>
      ) : isAuthenticated && mostRecentReview ? (
        <div className="flex">
          <ReviewCard review={mostRecentReview} width={"max-w-max"} />
          <div className="mx-8 flex w-24 items-center">
            <Link
              href={`/movies/${movie.id}/reviews`}
              className="rounded px-2 py-1 hover:underline"
            >
              Read all reviews
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
      {!isAuthenticated && mostRecentReview ? (
        <div className="flex">
          <ReviewCard review={mostRecentReview} width={"max-w-max"} />
          <div className="mx-8 flex w-24 items-center">
            <Link
              href={`/movies/${movie.id}/reviews`}
              className="rounded px-2 py-1 hover:underline"
            >
              Read all reviews
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default ReviewsSection;
