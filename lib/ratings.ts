import { Rating } from "@/types/ratings";

export async function postRating(
  rating: number,
  movieId: number,
  userId: number
) {
  try {
    const res = await fetch("http://localhost:3000/api/ratings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ rating, movieId, userId }),
    });
    return res;
  } catch (error) {
    console.log("Error posting rating: ", error);
  }
}

export async function getRatings() {
  try {
    const res = await fetch("http://localhost:3000/api/ratings", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch ratings");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading ratings:", error);
  }
}

export async function getUserRatings(
  userId: number | undefined
): Promise<Rating[]> {
  if (userId) {
    const { ratings } = await getRatings();
    const userRatings = ratings.filter(
      (rating: Rating) => rating.userId === userId
    );
    return userRatings;
  }
  return [];
}

export type PostUserRatingParams = {
  rating: number;
  movieId: number;
  userId: number;
};

export async function postUserRating({
  rating,
  movieId,
  userId,
}: PostUserRatingParams) {
  return await postRating(rating, movieId, userId);
}
