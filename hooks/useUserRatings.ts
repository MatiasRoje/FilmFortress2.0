import { getUserRatings } from "@/lib/ratings";
import { useQuery } from "@tanstack/react-query";

export function useUserRatings(userId: number | undefined) {
  const {
    isLoading,
    data: userRatings,
    error,
  } = useQuery(["ratings", userId], () => getUserRatings(userId));

  return { isLoading, userRatings, error };
}
