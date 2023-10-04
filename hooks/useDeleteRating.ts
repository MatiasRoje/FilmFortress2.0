import { deleteRatingApi } from "@/lib/ratings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteRating() {
  const queryClient = useQueryClient();

  const { mutate: deleteRating, isLoading } = useMutation({
    mutationFn: deleteRatingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
  });

  return { isLoading, deleteRating };
}
