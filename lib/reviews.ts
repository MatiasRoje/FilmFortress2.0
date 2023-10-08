import { useUserRatings } from "@/hooks/useUserRatings";
import { MovieDetails } from "@/types/movies";
import { ReviewTMDB, ReviewObject, UserReview } from "@/types/reviews";
import { User } from "@/types/users";

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

export async function getReviews() {
  try {
    const res = await fetch("/api/reviews", {
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

export async function getUserReviews(
  userId: number | undefined
): Promise<UserReview[] | undefined> {
  try {
    if (userId) {
      const res = await fetch("/api/reviews", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const { reviews } = await res.json();
      const userReviews = reviews.filter(
        (review: UserReview) => review.userId === 1
      );
      return userReviews;
    }
    return [];
  } catch (error) {
    console.log("Error loading reviews:", error);
  }
}

export async function getUserReviewForMovie(movieId: number) {
  try {
    const res = await fetch("/api/reviews", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const { reviews } = await res.json();
    const userReviews = reviews.find(
      (review: UserReview) => review.movieId === movieId
    );
    if (userReviews) return userReviews;
    return {};
  } catch (error) {
    console.log("Error loading reviews:", error);
  }
}

type PostReviewParams = {
  content: string;
  userId: number;
  movieId: number;
  movieTitle: string;
  movieReleaseDate: string;
  moviePoster: string;
};

export async function postReview({
  content,
  userId,
  movieId,
  movieTitle,
  movieReleaseDate,
  moviePoster,
}: PostReviewParams) {
  try {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content,
        userId,
        movieId,
        movieTitle,
        movieReleaseDate,
        moviePoster,
      }),
    });
    return res;
  } catch (error) {
    console.log("Error posting review: ", error);
  }
}

export type UpdateReviewApiParams = {
  review: UserReview;
  newContent: string;
};

export async function updateReviewApi({
  review,
  newContent,
}: UpdateReviewApiParams) {
  try {
    return await fetch(`/api/reviews/${review._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ newContent }),
    });
  } catch (error) {
    console.log("Error updating rating: ", error);
  }
}

export async function deleteReviewApi(id: string) {
  try {
    return await fetch(`/api/reviews?id=${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log("Error deleting review: ", error);
  }
}

// NOTE Helper functions

export function StripReview(reviewObject: ReviewObject): ReviewTMDB {
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

export function ConvertUserReviewToReviewTMDB(
  review: UserReview
): ReviewTMDB | undefined {
  const { userRatings } = useUserRatings(1);
  const userRating = userRatings?.find(
    rating => rating.movieId === review?.movieId
  );

  if (!review) return;

  const convertedReview = {
    id: review._id,
    author: "Alice",
    rating: userRating?.rating,
    content: review.content,
    createdDate: new Date(review.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };

  if (convertedReview.content) {
    return convertedReview;
  } else return undefined;
}
