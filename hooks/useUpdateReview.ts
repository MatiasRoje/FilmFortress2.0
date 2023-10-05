import { updateReviewApi } from "@/lib/reviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateReview() {
  const queryClient = useQueryClient();

  const { mutate: updateReview, isLoading } = useMutation({
    mutationFn: updateReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  return { isLoading, updateReview };
}
