import { useAuth } from "@/contexts/AuthContext";
import { postMovieToWatchlist } from "@/lib/watchlists";
import { Movie } from "@/types/movies";
import { Rating } from "@/types/ratings";
import { TvShow } from "@/types/tv";
import { Watchlist } from "@/types/watchlists";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MediaCartWatchlistSectionProps = {
  watchlists: Watchlist[];
  media: Movie | TvShow;
  userRating: Rating | undefined;
  tempRating: string | number;
};

function MediaCartWatchlistSection({
  media,
  watchlists,
  userRating,
  tempRating,
}: MediaCartWatchlistSectionProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [watchlist, setWatchlist] = useState<undefined | Watchlist>(undefined);
  const inWatchlist = watchlist?.movieIds.includes(media.id);

  useEffect(() => {
    if (user) {
      const watchlist = watchlists.find(
        watchlist => watchlist.userId === user.id
      );
      setWatchlist(watchlist);
    }
  }, [user, watchlists]);

  async function handleAddMovieToWatchlist() {
    if (!isAuthenticated) router.push("/login");

    if (user) {
      const res = await postMovieToWatchlist(media.id, user.id);

      if (res && res.ok) {
        setWatchlist((prevWatchlist: Watchlist | undefined) => {
          if (!prevWatchlist) {
            // If there is no previous watchlist, create a new one
            return {
              userId: user.id,
              movieIds: [media.id],
              name: "Watchlist",
            };
          } else {
            // If there is a previous watchlist, update movieIds
            return {
              ...prevWatchlist,
              movieIds: [...prevWatchlist.movieIds, media.id],
            };
          }
        });
      } else {
        throw new Error("Failed to add the movie to the watchlist");
      }
    }
  }

  return (
    <>
      {userRating && (
        <p>
          <CheckCircleIcon className="absolute top-0 z-10 h-9 w-9 text-green-500" />
        </p>
      )}
      {tempRating && (
        <p>
          <CheckCircleIcon className="absolute top-0 z-10 h-9 w-9 text-green-500" />
        </p>
      )}
      {!userRating && !tempRating && !watchlist && (
        <p>
          <PlusCircleIcon
            className="absolute top-0 z-10 h-9 w-9 hover:cursor-pointer hover:text-yellow-400"
            onClick={handleAddMovieToWatchlist}
          />
        </p>
      )}
      {!userRating && !tempRating && watchlist && inWatchlist && (
        <p>
          <PlusCircleIcon className="absolute top-0 z-10 h-9 w-9 text-yellow-400 hover:cursor-pointer" />
        </p>
      )}
      {!userRating && !tempRating && watchlist && !inWatchlist && (
        <p>
          <PlusCircleIcon
            className="absolute top-0 z-10 h-9 w-9 hover:cursor-pointer hover:text-yellow-400"
            onClick={handleAddMovieToWatchlist}
          />
        </p>
      )}
    </>
  );
}

export default MediaCartWatchlistSection;
