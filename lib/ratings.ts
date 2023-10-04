import { Rating, RatingApi } from "@/types/ratings";

export async function postRating({ rating, movieId, userId }: Rating) {
  try {
    return await fetch("http://localhost:3000/api/ratings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ rating, movieId, userId }),
    });
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

export async function deleteRatingApi(id: string) {
  try {
    return await fetch(`http://localhost:3000/api/ratings?id=${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log("Error deleting rating: ", error);
  }
}

export type UpdateRatingParams = {
  rating: RatingApi;
  newRating: number;
};

export async function updateRatingApi({
  rating,
  newRating,
}: UpdateRatingParams) {
  try {
    return await fetch(`http://localhost:3000/api/ratings/${rating._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ newRating }),
    });
  } catch (error) {
    console.log("Error updating rating: ", error);
  }
}

export async function getUserRatings(
  userId: number | undefined
): Promise<RatingApi[]> {
  if (userId) {
    const { ratings } = await getRatings();
    const userRatings = ratings.filter(
      (rating: RatingApi) => rating.userId === userId
    );
    return userRatings;
  }
  return [];
}
