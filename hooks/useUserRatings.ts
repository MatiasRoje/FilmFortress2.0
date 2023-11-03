import { getUserRatings } from "@/lib/ratings";
import { useQuery } from "@tanstack/react-query";

export function useUserRatings(userId: number | undefined) {
  const {
    isLoading,
    data: userRatings,
    error,
  } = useQuery({
    queryKey: ["ratings", userId],
    queryFn: () => getUserRatings(userId),
  });

  return { isLoading, userRatings, error };
}
