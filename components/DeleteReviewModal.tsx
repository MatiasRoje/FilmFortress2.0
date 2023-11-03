import { Dialog } from "@headlessui/react";
import { useRef } from "react";
import SecondaryButton from "./SecondaryButton";
import { Movie, MovieDetails } from "@/types/movies";
import { UserReview } from "@/types/reviews";
import { useDeleteReview } from "@/hooks/useDeleteReview";

type DeleteReviewModal = {
  deleteIsOpen: boolean;
  setDeleteIsOpen: (boolean: boolean) => void;
  movieTitle: string;
  review: UserReview | undefined;
};

function DeleteReviewModal({
  deleteIsOpen,
  setDeleteIsOpen,
  movieTitle,
  review,
}: DeleteReviewModal) {
  let titleRef = useRef<HTMLHeadingElement | null>(null);

  const { deleteReview } = useDeleteReview();

  function handleDelete() {
    if (review) {
      deleteReview(review._id);
      setDeleteIsOpen(false);
    }
  }

  return (
    <Dialog
      open={deleteIsOpen}
      onClose={() => setDeleteIsOpen(false)}
      initialFocus={titleRef}
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto flex max-w-sm flex-col items-center gap-6 rounded bg-neutral-700 px-12 py-8">
          <Dialog.Title className="text-xs font-medium text-yellow-400">
            DELETE REVIEW FOR
          </Dialog.Title>
          <h2 className="text-center text-xl font-bold" ref={titleRef}>
            {movieTitle}
          </h2>

          <SecondaryButton onClick={handleDelete}>
            Delete review
          </SecondaryButton>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default DeleteReviewModal;
