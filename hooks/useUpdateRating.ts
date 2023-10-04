import { updateRatingApi } from "@/lib/ratings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateRating() {
  const queryClient = useQueryClient();

  const { mutate: updateRating, isLoading } = useMutation({
    mutationFn: updateRatingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
  });

  return { isLoading, updateRating };
}
