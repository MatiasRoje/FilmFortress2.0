"use client";

import { MovieDetails } from "@/types/movies";
import { ReviewTMDB, UserReview } from "@/types/reviews";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/providers/AuthContext";
import ReviewsButton from "@/components/ReviewsButton";
import ReviewCard from "./ReviewCard";
import UserReviewCard from "./UserReviewCard";
import { useUserRatings } from "@/hooks/useUserRatings";
import { useUserReviews } from "@/hooks/useUserReviews";
import { useUserReviewForMovie } from "@/hooks/useUserReviewForMovie";
import { ConvertUserReviewToReviewTMDB } from "@/lib/reviews";

type ReviewsPageUserSectionProps = {
  movie: MovieDetails;
  reviews: ReviewTMDB[];
};

function ReviewsPageUserSection({
  movie,
  reviews,
}: ReviewsPageUserSectionProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const { userRatings } = useUserRatings(user?.id);
  const userRating = userRatings?.find(rating => rating.movieId === movie.id);

  const { userReviews } = useUserReviews(user?.id);
  const userReview = userReviews
    ?.filter(
      (review: UserReview) =>
        review.userId === user?.id && review.movieId === movie.id
    )
    .at(0);

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

  const handleClickBack = () => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <section className="my-6 flex gap-8">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={movie.posterPath}
          alt=""
          width="300"
          height="450"
          className="relative rounded"
          priority
        />
        {!isAuthenticated ? (
          <p>Sign in to write a review.</p>
        ) : userReview ? (
          ""
        ) : (
          <ReviewsButton movie={movie} />
        )}
        <button
          onClick={handleClickBack}
          className={`absolute top-1/2 z-10 flex -translate-y-full transform items-center rounded-full border border-white bg-neutral-600/25 p-2 text-neutral-50 transition duration-300 hover:border-yellow-400 hover:text-yellow-400`}
        >
          <ChevronLeftIcon className="h-12 w-12" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl">{movie.title}</h1>
          <div className="flex gap-1 text-sm">
            <span>{movie.releaseDate}</span>
            <span>•</span>
            <span>{movie.runtime}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {userReview && (
            <UserReviewCard
              movie={movie}
              review={userReview}
              width="max-w-4xl"
              userRating={userRating}
            />
          )}
          {!isAuthenticated &&
            allReviews &&
            allReviews
              .slice()
              .reverse()
              .map(review => (
                <ReviewCard key={review.id} review={review} width="max-w-4xl" />
              ))}
          {isAuthenticated &&
            reviews &&
            reviews
              .slice()
              .reverse()
              .map(review => (
                <ReviewCard key={review.id} review={review} width="max-w-4xl" />
              ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsPageUserSection;
