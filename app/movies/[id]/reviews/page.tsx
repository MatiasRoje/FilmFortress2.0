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
          const url = `/api/movie/${movieId}`;
          const res = await fetch(url);
          const movieFetch = await res.json();
          setMovie(movieFetch);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [movieId]);

  return <div>{typeof movie === "string" ? "" : movie.title}</div>;
}

export default ReviewsPage;
