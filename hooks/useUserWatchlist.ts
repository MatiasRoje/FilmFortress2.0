import { getUserWatchlist } from "@/lib/watchlists";
import { useQuery } from "@tanstack/react-query";

export function useUserWatchlist(userId: number | undefined) {
  const {
    isLoading,
    data: userWatchlist,
    error,
  } = useQuery({
    queryKey: ["watchlist", userId],
    queryFn: () => getUserWatchlist(userId),
  });

  return { isLoading, userWatchlist, error };
}
