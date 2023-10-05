import { postReview } from "@/lib/reviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateReview() {
  const queryClient = useQueryClient();

  const { mutate: createReview, isLoading } = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  return { isLoading, createReview };
}
