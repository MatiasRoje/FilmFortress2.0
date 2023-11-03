import { getUserReviews } from "@/lib/reviews";
import { useQuery } from "@tanstack/react-query";

export function useUserReviews(userId: number | undefined) {
  const {
    isLoading,
    data: userReviews,
    error,
  } = useQuery({
    queryKey: ["reviews", userId],
    queryFn: () => getUserReviews(userId),
  });

  return { isLoading, userReviews, error };
}
