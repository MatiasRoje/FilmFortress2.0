import { Review, ReviewObject } from "@/types/reviews";

const apiKey = process.env.TMDB_API_KEY;

export async function getReviewsFromMovie(movieId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`,
    {
      next: { revalidate: 3600 },
    }
  );
  const data = await res.json();
  const reviews = data.results;
  return reviews.map((review: ReviewObject) => StripReview(review));
}

export async function postReview(
  content: string,
  movieId: number,
  userId: number
) {
  try {
    const res = await fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ content, movieId, userId }),
    });
    return res;
  } catch (error) {
    console.log("Error posting review: ", error);
  }
}

export async function getReviews() {
  try {
    const res = await fetch("http://localhost:3000/api/reviews", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading reviews:", error);
  }
}

// NOTE Helper functions

export function StripReview(reviewObject: ReviewObject): Review {
  return {
    id: reviewObject.id,
    author: reviewObject.author,
    rating: reviewObject.author_details.rating,
    content: reviewObject.content,
    createdDate: new Date(reviewObject.created_at).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
}
