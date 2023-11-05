"use client";

import { useUserRatings } from "@/hooks/useUserRatings";
import { useUserReviews } from "@/hooks/useUserReviews";
import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { UserReview } from "@/types/reviews";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import ExpandableText from "@/components/ExpandableText";
import ReviewModal from "@/components/ReviewModal";
import DeleteReviewModal from "@/components/DeleteReviewModal";
import ImagePlaceholderMovie from "@/components/ImagePlaceholderMovie";

function UserReviewsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [movieTVToggle, setMovieTVToggle] = useState("movies");
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<UserReview | null>(null);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const { userReviews, isLoading: isLoadingReviews } = useUserReviews(user?.id);
  const { userRatings, isLoading: isLoadingRatings } = useUserRatings(user?.id);
  const movieIdsArray = useMemo(
    () => userReviews?.map(userReview => userReview.movieId),
    [userReviews]
  );

  const userReviewsWithRating = userReviews?.map(userReview => {
    const userRating = userRatings?.find(
      userRating => userRating.movieId === userReview.movieId
    );
    if (userRating) return { ...userReview, rating: userRating.rating };
    else return userReview;
  });

  return (
    <main>
      <section className="mx-auto my-6 flex max-w-4xl flex-col gap-6">
        <div className="flex items-baseline gap-5">
          <h2 className="text-2xl font-semibold">My Reviews</h2>
          <div className="flex gap-3">
            <button
              className={`pb-1 font-semibold hover:cursor-pointer ${
                movieTVToggle === "movies" && "underline underline-offset-8"
              }`}
              onClick={() => setMovieTVToggle("movies")}
            >
              Movies{" "}
              <span className="text-sm">
                —{movieIdsArray ? movieIdsArray.length : 0}
              </span>
            </button>
            {/* <button
              className={`pb-1 font-semibold hover:cursor-pointer ${
                movieTVToggle === "tv" && "underline underline-offset-8"
              }`}
              onClick={() => setMovieTVToggle("tv")}
            >
              TV <span className="text-sm">—{0}</span>
            </button> */}
          </div>
        </div>
        {(isLoadingRatings || isLoadingReviews) && (
          <div className="my-10 flex items-center justify-center">
            <Spinner dimensions="w-12 h-12" />
          </div>
        )}
        {!isLoadingRatings &&
          !isLoadingReviews &&
          movieTVToggle === "movies" &&
          !movieIdsArray?.length && (
            <p>You haven&apos;t reviewed any movies.</p>
          )}
        {!isLoadingRatings &&
          !isLoadingReviews &&
          movieTVToggle === "movies" &&
          movieIdsArray?.length && (
            <ul className="space-y-5">
              {userReviewsWithRating &&
                userReviewsWithRating.map(userReview => (
                  <li key={userReview._id} className="flex">
                    <div className="w-full rounded bg-neutral-700 px-6 py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 lg:gap-6">
                          <Link
                            href={`/movies/${userReview.movieId}`}
                            className="grow"
                          >
                            {userReview.moviePoster ? (
                              <Image
                                src={userReview.moviePoster}
                                alt={`${userReview.movieTitle} poster`}
                                width="150"
                                height="225"
                                className="h-40 w-auto rounded"
                              />
                            ) : (
                              <ImagePlaceholderMovie
                                dimensions="w-[106px] h-[160px]"
                                rounded="rounded"
                              />
                            )}
                          </Link>
                          <div>
                            <p className="line-clamp-2 w-40 font-semibold sm:text-xl lg:line-clamp-none">
                              Your Review for{" "}
                              <Link
                                href={`/movies/${userReview.movieId}`}
                                className="hover:underline"
                              >
                                {userReview.movieTitle}
                              </Link>{" "}
                              ({userReview.movieReleaseDate.slice(-4)})
                            </p>
                            <p className="text-xs italic sm:text-sm">
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
                            <div className="mt-5 flex items-center gap-1 sm:hidden sm:flex-row">
                              <button
                                className="rounded p-1 hover:cursor-pointer hover:bg-neutral-600"
                                onClick={() => {
                                  setSelectedReview(userReview);
                                  setIsOpen(true);
                                }}
                              >
                                <PencilSquareIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                              </button>

                              <button
                                className="rounded p-1 hover:cursor-pointer hover:bg-neutral-600"
                                onClick={() => {
                                  setSelectedReview(userReview);
                                  setDeleteIsOpen(true);
                                }}
                              >
                                <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                              </button>
                            </div>
                          </div>
                          <div className="hidden flex-col items-center justify-center gap-1 sm:flex sm:flex-row">
                            <button
                              className="rounded p-1 hover:cursor-pointer hover:bg-neutral-600"
                              onClick={() => {
                                setSelectedReview(userReview);
                                setIsOpen(true);
                              }}
                            >
                              <PencilSquareIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>

                            <button
                              className="rounded p-1 hover:cursor-pointer hover:bg-neutral-600"
                              onClick={() => {
                                setSelectedReview(userReview);
                                setDeleteIsOpen(true);
                              }}
                            >
                              <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                          </div>
                        </div>
                        <p className="flex items-center justify-center gap-1 sm:text-lg">
                          <span>
                            <StarIcon className="h-4 w-4 text-yellow-500 sm:h-6 sm:w-6" />
                          </span>
                          {userReview.rating}
                        </p>
                      </div>
                      <article
                        className={`mt-4 max-w-4xl border-t pt-6 text-justify`}
                      >
                        {userReview && (
                          <ExpandableText text={userReview.content} />
                        )}
                      </article>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        {/* {!isLoadingRatings && !isLoadingReviews && movieTVToggle === "tv" && (
          <p>You haven&apos;t reviewed any TV shows.</p>
        )} */}
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

export default UserReviewsPage;
