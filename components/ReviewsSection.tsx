"use client";

import { ReviewTMDB, UserReview } from "@/types/reviews";
import Link from "next/link";
import ReviewCard from "./ReviewCard";
import ReviewsButton from "./ReviewsButton";
import { MovieDetails } from "@/types/movies";
import UserReviewCard from "./UserReviewCard";
import { useUserRatings } from "@/hooks/useUserRatings";
import { useUserReviews } from "@/hooks/useUserReviews";
import { ConvertUserReviewToReviewTMDB } from "@/lib/reviews";
import { useUserReviewForMovie } from "@/hooks/useUserReviewForMovie";
import { useSession } from "next-auth/react";

type ReviewsSectionProps = {
  movie: MovieDetails;
  reviews: ReviewTMDB[];
};

function ReviewsSection({ movie, reviews }: ReviewsSectionProps) {
  const { data: session } = useSession();

  const { userRatings } = useUserRatings(session?.user?.id);
  const userRating = userRatings?.find(rating => rating.movieId === movie.id);

  const { userReviews } = useUserReviews(session?.user?.id);
  const userReview = userReviews
    ?.filter(
      (review: UserReview) =>
        review.userId === session?.user?.id && review.movieId === movie.id
    )
    .at(0);

  // Concat reviews with userReviews for handling the case when the user is not Authentificated but his
  // review is still published on the website
  const { userReviewForMovie } = useUserReviewForMovie(movie.id);
  const notAuthenticatedUserReview =
    ConvertUserReviewToReviewTMDB(userReviewForMovie);

  const allReviews = notAuthenticatedUserReview
    ? [notAuthenticatedUserReview, ...reviews].sort((a, b) => {
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
      })
    : reviews;

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
        {session && !userReview && <ReviewsButton movie={movie} />}
        {!session && <ReviewsButton movie={movie} />}
      </div>
      {session && userReview ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
          <UserReviewCard
            review={userReview}
            width={"max-w-max"}
            userRating={userRating}
            movieId={movie.id}
            movieTitle={movie.title}
            moviePoster={movie.posterPath}
            movieReleaseDate={movie.releaseDate}
          />
          <div className="flex items-center sm:mx-8 sm:w-24">
            <Link
              href={`/movies/${movie.id}/reviews`}
              className="rounded px-2 py-1 hover:underline"
            >
              Read all reviews
            </Link>
          </div>
        </div>
      ) : session && mostRecentReview ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
          <ReviewCard review={mostRecentReview} width={"max-w-max"} />
          <div className="flex items-center sm:mx-8 sm:w-24">
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
      {!session && mostRecentReview ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
          <ReviewCard review={mostRecentReview} width={"max-w-max"} />
          <div className="flex items-center sm:mx-8 sm:w-24">
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
