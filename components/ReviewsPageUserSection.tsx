"use client";

import { MovieDetails } from "@/types/movies";
import { ReviewTMDB, UserReview } from "@/types/reviews";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/providers/AuthContext";
import ReviewsButton from "@/components/ReviewsButton";
import ReviewCard from "./ReviewCard";
import { Rating } from "@/types/ratings";
import UserReviewCard from "./UserReviewCard";

type ReviewsPageUserSectionProps = {
  movie: MovieDetails;
  reviews: ReviewTMDB[];
  usersReviews: UserReview[];
  ratings: Rating[];
};

function ReviewsPageUserSection({
  movie,
  reviews,
  usersReviews,
  ratings,
}: ReviewsPageUserSectionProps) {
  const router = useRouter();
  const [tempReview, setTempReview] = useState("");
  const { user, isAuthenticated } = useAuth();
  const userRating = ratings.find(
    rating => rating.userId === user?.id && rating.movieId === movie.id
  );

  let userReview;
  if (isAuthenticated && usersReviews)
    userReview = usersReviews
      .filter(
        review => review.userId === user?.id && review.movieId === movie.id
      )
      .at(0);

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
        {isAuthenticated ? (
          <ReviewsButton setTempReview={setTempReview} media={movie} />
        ) : (
          <p>Sign in to write a review.</p>
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
              review={userReview}
              width="max-w-4xl"
              userRating={userRating}
            />
          )}
          {reviews &&
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
