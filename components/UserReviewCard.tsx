import { UserReview } from "@/types/reviews";
import { StarIcon } from "@heroicons/react/24/solid";
import ExpandableText from "./ExpandableText";
import { useAuth } from "@/providers/AuthContext";
import { Rating } from "@/types/ratings";

type ReviewCardProps = {
  review: UserReview | undefined;
  width: string;
  userRating: Rating | undefined;
};

function UserReviewCard({ review, width, userRating }: ReviewCardProps) {
  const { user } = useAuth();

  return (
    <div className="grow rounded border-2 border-main-400 bg-neutral-700 p-4">
      <div className="flex items-center justify-between">
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
    </div>
  );
}

export default UserReviewCard;
