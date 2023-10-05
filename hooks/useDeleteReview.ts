import { deleteReviewApi } from "@/lib/reviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteReview() {
  const queryClient = useQueryClient();

  const { mutate: deleteReview, isLoading } = useMutation({
    mutationFn: deleteReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  return { isLoading, deleteReview };
}
