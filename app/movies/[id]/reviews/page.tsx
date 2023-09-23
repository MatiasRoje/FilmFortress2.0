"use client";

import ReviewCard from "@/components/ReviewCard";
import { MovieDetails } from "@/types/movies";
import { Review } from "@/types/reviews";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

function ReviewsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const movieId = pathname.split("/").at(2);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [movie, setMovie] = useState<string | MovieDetails>("");

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

  const handleClick = () => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <main>
      {typeof movie === "string" ? (
        ""
      ) : (
        <section className="flex gap-8 my-6">
          <div className="flex flex-col gap-4 items-center">
            <Image
              src={movie.posterPath}
              alt=""
              width="300"
              height="450"
              className="rounded relative"
              priority
            />
            <p>Login to write a review.</p>
            <button
              onClick={handleClick}
              className={`absolute p-2 top-1/2 transform -translate-y-full bg-neutral-600/25 text-white border border-white hover:text-yellow-400 hover:border-yellow-400 rounded-full prev-button z-10 flex items-center`}
            >
              <ChevronLeftIcon className="h-12 w-12" />
            </button>
          </div>
          <div className="text-white flex flex-col gap-4">
            <div>
              <h2 className="text-3xl">{movie.title}</h2>
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
