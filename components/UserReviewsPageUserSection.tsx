"use client";

import { useUserRatings } from "@/hooks/useUserRatings";
import { useUserReviews } from "@/hooks/useUserReviews";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import DeleteReviewModal from "./DeleteReviewModal";
import ExpandableText from "./ExpandableText";
import ReviewModal from "./ReviewModal";
import { UserReview } from "@/types/reviews";
import Image from "next/image";
import Link from "next/link";
import Spinner from "./Spinner";
import ImagePlaceholderMovie from "./ImagePlaceholderMovie";
import { useSession } from "next-auth/react";

function UserReviewsPageUserSection() {
  const router = useRouter();
  const { data: session } = useSession();
  const [movieTVToggle, setMovieTVToggle] = useState("movies");
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<UserReview | null>(null);

  useEffect(() => {
    if (!session) router.push("/login");
  }, [session, router]);

  const { userReviews, isLoading: isLoadingReviews } = useUserReviews(
    session?.user?.id
  );
  const { userRatings, isLoading: isLoadingRatings } = useUserRatings(
    session?.user?.id
  );
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
            <button
              className={`pb-1 font-semibold hover:cursor-pointer ${
                movieTVToggle === "tv" && "underline underline-offset-8"
              }`}
              onClick={() => setMovieTVToggle("tv")}
            >
              TV <span className="text-sm">—{0}</span>
            </button>
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
          !movieIdsArray?.length && <p>You haven&apos;t rated any movies.</p>}
        {!isLoadingRatings &&
          !isLoadingReviews &&
          movieTVToggle === "movies" &&
          movieIdsArray?.length && (
            <div className="space-y-4">
              {userReviewsWithRating &&
                userReviewsWithRating.map(userReview => (
                  <div key={userReview._id} className="flex">
                    <Link href={`/movies/${userReview.movieId}`}>
                      {userReview.moviePoster ? (
                        <Image
                          src={userReview.moviePoster}
                          alt={`${userReview.movieTitle} poster`}
                          width="150"
                          height="225"
                          className="rounded-l"
                        />
                      ) : (
                        <ImagePlaceholderMovie dimensions="w-[150px] h-[225px]" />
                      )}
                    </Link>
                    <div className="w-full rounded bg-neutral-700 px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-lg font-semibold">
                              Your Review for{" "}
                              <Link
                                href={`/movies/${userReview.movieId}`}
                                className="hover:underline"
                              >
                                {userReview.movieTitle}
                              </Link>{" "}
                              ({userReview.movieReleaseDate.slice(-4)})
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
                      <article
                        className={`mt-4 max-w-4xl border-t pt-6 text-justify`}
                      >
                        {userReview && (
                          <ExpandableText text={userReview.content} />
                        )}
                      </article>
                    </div>
                  </div>
                ))}
            </div>
          )}
        {!isLoadingRatings && !isLoadingReviews && movieTVToggle === "tv" && (
          <p>You haven&apos;t rated any TV shows.</p>
        )}
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
