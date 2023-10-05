import { WatchlistApi } from "@/types/watchlists";

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
        (watchlist: WatchlistApi) => watchlist.userId === userId
      );
      return userWatchlist;
    }
    return {};
  } catch (error) {
    console.log("Error loading watchlists:", error);
  }
}

type DeleteMovieFromWatchlistParams = {
  watchlist: WatchlistApi;
  newMovieIds: number[];
};

export async function deleteMovieFromWatchlist({
  watchlist,
  newMovieIds,
}: DeleteMovieFromWatchlistParams) {
  try {
    return await fetch(`/api/watchlists/${watchlist._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ newMovieIds }),
    });
  } catch (error) {
    console.log("Error deleting movie from the watchlist: ", error);
  }
}

type PostMovieToWatchlistParams = {
  movieId: number;
  userId: number | undefined;
};

export async function postMovieToWatchlist({
  movieId,
  userId,
}: PostMovieToWatchlistParams) {
  try {
    const res = await fetch("/api/watchlists", {
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
