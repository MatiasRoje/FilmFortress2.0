import { postMovieToWatchlist } from "@/lib/watchlists";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddMovieToWatchlist() {
  const queryClient = useQueryClient();

  const { mutate: addMovie, isLoading } = useMutation({
    mutationFn: postMovieToWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  return { isLoading, addMovie };
}
