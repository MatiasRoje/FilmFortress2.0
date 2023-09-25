export async function postRating(
  rating: number,
  movieId: number,
  userId: number,
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
    const res = await fetch("http:/localhost:3000/api/ratings", {
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
