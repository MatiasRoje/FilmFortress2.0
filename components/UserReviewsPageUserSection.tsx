"use client";

import { useUserRatings } from "@/hooks/useUserRatings";
import { useUserReviews } from "@/hooks/useUserReviews";
import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import DeleteReviewModal from "./DeleteReviewModal";
import ExpandableText from "./ExpandableText";
import ReviewModal from "./ReviewModal";
import { UserReview } from "@/types/reviews";

function UserReviewsPageUserSection() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<UserReview | null>(null);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const { userReviews } = useUserReviews(user?.id);
  const { userRatings } = useUserRatings(user?.id);
  const movieIdsArray = userReviews?.map(userReview => userReview.movieId);

  const userReviewsWithRating = userReviews?.map(userReview => {
    const userRating = userRatings?.find(
      userRating => userRating.movieId === userReview.movieId
    );
    if (userRating) return { ...userReview, rating: userRating.rating };
    else return userReview;
  });

  return (
    <main>
      <section className="mx-auto flex max-w-4xl flex-col">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">My Reviews</h2>
          <p>
            Movies <span>{movieIdsArray ? movieIdsArray.length : 0}</span>
          </p>
          <p>
            TV <span>0</span>
          </p>
        </div>
        <div>
          {userReviewsWithRating &&
            userReviewsWithRating.map(userReview => (
              <div
                key={userReview._id}
                className="grow rounded border-2 border-main-400 bg-neutral-700 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-lg font-semibold">
                        Review by {user?.username}{" "}
                      </p>
                      <p className="text-sm italic">
                        Written on{" "}
                        {userReview &&
                          new Date(userReview.createdAt).toLocaleString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        className="rounded p-1 hover:cursor-pointer hover:bg-neutral-600"
                        onClick={() => {
                          setSelectedReview(userReview);
                          setIsOpen(true);
                        }}
                      >
                        <PencilSquareIcon className="h-6 w-6" />
                      </button>
                      <div className="relative">
                        <button
                          className="rounded p-1 hover:cursor-pointer hover:bg-neutral-600"
                          onClick={() => {
                            setSelectedReview(userReview);
                            setDeleteIsOpen(true);
                          }}
                        >
                          <TrashIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="flex items-center justify-center gap-1 text-lg">
                    <span>
                      <StarIcon className="h-6 w-6 text-yellow-500" />
                    </span>
                    {userReview.rating}
                  </p>
                </div>
                <article className={`mt-4 max-w-4xl text-justify`}>
                  {userReview && <ExpandableText text={userReview.content} />}
                </article>
              </div>
            ))}
        </div>
        {selectedReview && (
          <ReviewModal
            userReviewApi={selectedReview}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            movieId={selectedReview.movieId}
            movieTitle={selectedReview.movieTitle}
            moviePoster={selectedReview.moviePoster}
            movieReleaseDate={selectedReview.movieReleaseDate}
          />
        )}
        {selectedReview && (
          <DeleteReviewModal
            deleteIsOpen={deleteIsOpen}
            setDeleteIsOpen={setDeleteIsOpen}
            movieTitle={selectedReview.movieTitle}
            review={selectedReview}
          />
        )}
      </section>
    </main>
  );
}

export default UserReviewsPageUserSection;
