import { deleteMovieFromWatchlist } from "@/lib/watchlists";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteMovieFromWatchlist() {
  const queryClient = useQueryClient();

  const { mutate: deleteMovie, isLoading } = useMutation({
    mutationFn: deleteMovieFromWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  return { isLoading, deleteMovie };
}
