import { getUserReviewForMovie } from "@/lib/reviews";
import { useQuery } from "@tanstack/react-query";

export function useUserReviewForMovie(movieId: number) {
  const {
    isLoading,
    data: userReviewForMovie,
    error,
  } = useQuery({
    queryKey: ["userReview", movieId],
    queryFn: () => getUserReviewForMovie(movieId),
  });

  return { isLoading, userReviewForMovie, error };
}
