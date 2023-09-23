"use client";

import { MovieDetails } from "@/types/movies";
import { Review } from "@/types/reviews";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function ReviewsPage() {
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

  console.log(reviews);

  return (
    <div>
      <p>{typeof movie === "string" ? "" : movie.title}</p>
      <ul>
        {reviews &&
          reviews.map(review => <li key={review.id}>{review.author}</li>)}
      </ul>
    </div>
  );
}

export default ReviewsPage;
