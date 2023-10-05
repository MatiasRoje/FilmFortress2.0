import { UserReview } from "@/types/reviews";
import { StarIcon } from "@heroicons/react/24/solid";
import ExpandableText from "./ExpandableText";
import { useAuth } from "@/providers/AuthContext";
import { Rating } from "@/types/ratings";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { MovieDetails } from "@/types/movies";
import { useDeleteReview } from "@/hooks/useDeleteReview";
import DeleteReviewModal from "./DeleteReviewModal";

type ReviewCardProps = {
  review: UserReview | undefined;
  width: string;
  userRating: Rating | undefined;
  movie: MovieDetails;
};

function UserReviewCard({ review, width, userRating, movie }: ReviewCardProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  function handleEdit() {
    setIsOpen(true);
  }

  function handleDelete() {
    setDeleteIsOpen(true);
  }

  return (
    <div className="grow rounded border-2 border-main-400 bg-neutral-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-lg font-semibold">Review by {user?.username} </p>
            <p className="text-sm italic">
              Written on{" "}
              {review &&
                new Date(review.createdAt).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
            </p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <button
              className="rounded p-1 hover:cursor-pointer hover:bg-neutral-600"
              onClick={handleEdit}
            >
              <PencilSquareIcon className="h-6 w-6" />
            </button>
            <div className="relative">
              <button
                className="rounded p-1 hover:cursor-pointer hover:bg-neutral-600"
                onClick={handleDelete}
              >
                <TrashIcon className="h-6 w-6" />
              </button>
              <DeleteReviewModal
                deleteIsOpen={deleteIsOpen}
                setDeleteIsOpen={setDeleteIsOpen}
                movie={movie}
                review={review}
              />
            </div>
          </div>
        </div>
        <p className="flex items-center justify-center gap-1 text-lg">
          <span>
            <StarIcon className="h-6 w-6 text-yellow-500" />
          </span>
          {userRating?.rating}
        </p>
      </div>
      <article className={`mt-4 text-justify ${width}`}>
        {review && <ExpandableText text={review.content} />}
      </article>
      <ReviewModal
        userReviewApi={review}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        movie={movie}
      />
    </div>
  );
}

export default UserReviewCard;
