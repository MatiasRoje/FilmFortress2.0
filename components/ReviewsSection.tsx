"use client";

import { Review, UserReview } from "@/types/reviews";
import Link from "next/link";
import ReviewCard from "./ReviewCard";
import ReviewsButton from "./ReviewsButton";
import { useState } from "react";
import { MovieDetails } from "@/types/movies";
import { useAuth } from "@/contexts/AuthContext";
import { Rating } from "@/types/ratings";
import UserReviewCard from "./UserReviewCard";

type ReviewsSectionProps = {
  media: MovieDetails;
  reviews: Review[];
  usersReviews: UserReview[];
  ratings: Rating[];
};

function ReviewsSection({
  media,
  reviews,
  usersReviews,
  ratings,
}: ReviewsSectionProps) {
  const lastReviewFromApi = reviews.at(-1);
  const [tempReview, setTempReview] = useState("");
  const { user, isAuthenticated } = useAuth();
  const userRating = ratings.find(
    rating => rating.userId === user?.id && rating.movieId === media.id
  );

  let userReview;
  if (isAuthenticated && usersReviews)
    userReview = usersReviews
      .filter(
        review => review.userId === user?.id && review.movieId === media.id
      )
      .at(0);

  return (
    <section className="my-8 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="flex items-baseline gap-2 p-2">
          <Link href={`/movies/${media.id}/reviews`}>
            <h3 className="text-xl font-semibold hover:underline">Reviews</h3>
          </Link>
          <span>—{reviews.length}</span>
        </div>
        <ReviewsButton setTempReview={setTempReview} media={media} />
      </div>
      {userReview ? (
        <div className="flex">
          <UserReviewCard
            review={userReview}
            width={"max-w-max"}
            userRating={userRating}
          />
          <div className="mx-8 flex w-24 items-center">
            <Link
              href={`/movies/${media.id}/reviews`}
              className="rounded px-2 py-1 hover:underline"
            >
              Read all reviews
            </Link>
          </div>
        </div>
      ) : lastReviewFromApi ? (
        <div className="flex">
          <ReviewCard review={lastReviewFromApi} width={"max-w-max"} />
          <div className="mx-8 flex w-24 items-center">
            <Link
              href={`/movies/${media.id}/reviews`}
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
