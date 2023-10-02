"use client";

import ReviewCard from "@/components/ReviewCard";
import { MovieDetails } from "@/types/movies";
import { Review } from "@/types/reviews";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/contexts/AuthContext";
import ReviewsButton from "@/components/ReviewsButton";

function ReviewsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const movieId = pathname.split("/").at(2);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [movie, setMovie] = useState<string | MovieDetails>("");
  const { isAuthenticated } = useAuth();
  const [tempReview, setTempReview] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        if (movieId) {
          const resMovie = await fetch(`/api/movies/${movieId}`);
          const movieFetch = await resMovie.json();
          setMovie(movieFetch);

          const resReviews = await fetch(`/api/reviews/${movieId}`);
          const reviewsFetch = await resReviews.json();
          setReviews(reviewsFetch);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [movieId]);

  const handleClickBack = () => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <main>
      {typeof movie === "string" ? (
        ""
      ) : (
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
            <ul className="flex flex-col gap-4">
              {reviews &&
                reviews
                  .toReversed()
                  .map(review => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      width="max-w-4xl"
                    />
                  ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}

export default ReviewsPage;
