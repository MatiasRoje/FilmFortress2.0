"use client";

import { MovieDetails } from "@/types/movies";
import { ReviewTMDB, UserReview } from "@/types/reviews";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import ReviewsButton from "@/components/ReviewsButton";
import ReviewCard from "./ReviewCard";
import UserReviewCard from "./UserReviewCard";
import { useUserRatings } from "@/hooks/useUserRatings";
import { useUserReviews } from "@/hooks/useUserReviews";
import { useUserReviewForMovie } from "@/hooks/useUserReviewForMovie";
import { ConvertUserReviewToReviewTMDB } from "@/lib/reviews";
import ImagePlaceholderMovie from "./ImagePlaceholderMovie";
import { useSession } from "next-auth/react";

type ReviewsPageUserSectionProps = {
  movie: MovieDetails;
  reviews: ReviewTMDB[];
};

function ReviewsPageUserSection({
  movie,
  reviews,
}: ReviewsPageUserSectionProps) {
  const router = useRouter();
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
      <div className="relative hidden flex-col items-center gap-4 sm:flex">
        {movie.posterPath ? (
          <Image
            src={movie.posterPath}
            alt=""
            width="300"
            height="450"
            className="rounded"
            priority
          />
        ) : (
          <ImagePlaceholderMovie dimensions="w-[300px] h-[450px]" />
        )}
        {!session ? (
          <p>Sign in to write a review.</p>
        ) : userReview ? (
          ""
        ) : (
          <ReviewsButton movie={movie} />
        )}
        <button
          onClick={handleClickBack}
          className={`absolute z-10 flex -translate-y-full transform items-center rounded-full border border-white bg-neutral-600/25 p-2 text-neutral-50 transition duration-300 hover:border-yellow-400 hover:text-yellow-400 sm:top-40 lg:top-52 xl:top-64`}
        >
          <ChevronLeftIcon className="h-12 w-12" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {movie.posterPath ? (
            <Image
              src={movie.posterPath}
              alt=""
              width="90"
              height="135"
              className="relative rounded sm:hidden"
              priority
            />
          ) : (
            <ImagePlaceholderMovie dimensions="w-[90px] h-[135px] sm:hidden relative" />
          )}
          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-xl sm:text-3xl">{movie.title}</h1>
            <div className="flex gap-1 text-sm">
              <span>{movie.releaseDate}</span>
              <span>•</span>
              <span>{movie.runtime}</span>
            </div>
            <button
              onClick={handleClickBack}
              className={`flex items-center rounded-full border border-white p-2 text-neutral-50 transition duration-300 hover:border-yellow-400 hover:text-yellow-400 sm:hidden`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        {!session ? (
          <p className="sm:hidden">Sign in to write a review.</p>
        ) : userReview ? (
          ""
        ) : (
          <div className="sm:hidden">
            <ReviewsButton movie={movie} />
          </div>
        )}
        <div className="flex flex-col gap-4">
          {userReview && movie.posterPath && (
            <UserReviewCard
              review={userReview}
              width="w-full"
              userRating={userRating}
              movieId={movie.id}
              movieTitle={movie.title}
              movieReleaseDate={movie.releaseDate}
              moviePoster={movie.posterPath}
            />
          )}
          {!session &&
            allReviews &&
            allReviews
              .slice()
              .reverse()
              .map(review => (
                <ReviewCard key={review.id} review={review} width="max-w-4xl" />
              ))}
          {session &&
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
