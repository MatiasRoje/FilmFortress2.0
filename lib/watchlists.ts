export async function postMovieToWatchlist(movieId: number, userId: number) {
  try {
    const res = await fetch("http://localhost:3000/api/watchlists", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ movieId, userId }),
    });
    return res;
  } catch (error) {
    console.log("Error posting rating: ", error);
  }
}

export async function getWatchlists() {
  try {
    const res = await fetch("http:/localhost:3000/api/watchlists", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch watchlists");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading watchlists:", error);
  }
}
