import { WatchlistApi } from "@/types/watchlists";

type PostMovieToWatchlistParams = {
  movieId: number;
  userId: number | undefined;
};

export async function postMovieToWatchlist({
  movieId,
  userId,
}: PostMovieToWatchlistParams) {
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

export async function getUserWatchlist(userId: number | undefined) {
  try {
    if (userId) {
      const res = await fetch("/api/watchlists", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch watchlists");
      }

      const { watchlists } = await res.json();
      const userWatchlist = watchlists.find(
        (watchlist: WatchlistApi) => watchlist.userId === 1
      );
      return userWatchlist;
    }
    return {};
  } catch (error) {
    console.log("Error loading watchlists:", error);
  }
}
