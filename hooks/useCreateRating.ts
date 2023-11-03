import { postRating } from "@/lib/ratings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateRating() {
  const queryClient = useQueryClient();

  const { mutate: createRating, isLoading } = useMutation({
    mutationFn: postRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  return { isLoading, createRating };
}
