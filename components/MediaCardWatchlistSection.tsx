import { Movie } from "@/types/movies";
import { Rating } from "@/types/ratings";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useUserWatchlist } from "@/hooks/useUserWatchlist";
import { useAddMovieToWatchlist } from "@/hooks/useAddMovieToWatchlist";
import { useDeleteMovieFromWatchlist } from "@/hooks/useDeleteMovieFromWatchlist";
import { useSession } from "next-auth/react";

type MediaCardWatchlistSectionProps = {
  movie: Movie;
  userRating: Rating | undefined;
};

function MediaCardWatchlistSection({
  movie,
  userRating,
}: MediaCardWatchlistSectionProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const { userWatchlist } = useUserWatchlist(session?.user?.id);
  const inWatchlist = userWatchlist?.movieIds?.includes(movie.id);
  const { addMovie } = useAddMovieToWatchlist();
  const { deleteMovie } = useDeleteMovieFromWatchlist();

  function handleAddMovie() {
    if (!session) router.push("/login");

    addMovie({ movieId: movie.id, userId: session?.user?.id });
  }

  function handleDeleteMovie() {
    const newMovieIds = userWatchlist?.movieIds.filter(
      (movieId: number) => movieId !== movie.id
    );
    if (userWatchlist && newMovieIds)
      deleteMovie({ watchlist: userWatchlist, newMovieIds });
  }

  return (
    <>
      {userRating && (
        <p>
          <CheckCircleIcon className="absolute left-0 top-0 z-10 h-9 w-9 text-green-500" />
        </p>
      )}
      {!userRating && !userWatchlist && (
        <p>
          <PlusCircleIcon
            className="absolute left-0 top-0 z-10 h-9 w-9 hover:cursor-pointer hover:text-yellow-400"
            onClick={handleAddMovie}
          />
        </p>
      )}
      {!userRating && userWatchlist && inWatchlist && (
        <p>
          <PlusCircleIcon
            className="absolute left-0 top-0 z-10 h-9 w-9 text-yellow-400 hover:cursor-pointer"
            onClick={handleDeleteMovie}
          />
        </p>
      )}
      {!userRating && userWatchlist && !inWatchlist && (
        <p>
          <PlusCircleIcon
            className="absolute left-0 top-0 z-10 h-9 w-9 hover:cursor-pointer hover:text-yellow-400"
            onClick={handleAddMovie}
          />
        </p>
      )}
    </>
  );
}

export default MediaCardWatchlistSection;
