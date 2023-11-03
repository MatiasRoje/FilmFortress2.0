import { ReviewTMDB } from "@/types/reviews";
import { StarIcon } from "@heroicons/react/24/solid";
import ExpandableText from "./ExpandableText";

type ReviewCardProps = {
  review: ReviewTMDB;
  width: string;
};

function ReviewCard({ review, width }: ReviewCardProps) {
  return (
    <div className="grow rounded bg-neutral-700 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Review by {review.author} </p>
          <p className="text-sm italic">Written on {review.createdDate}</p>
        </div>
        <p className="flex items-center justify-center gap-1 text-lg">
          <span>
            <StarIcon className="h-6 w-6 text-yellow-500" />
          </span>
          {review.rating}
        </p>
      </div>
      <article className={`mt-4 text-justify ${width} border-t pt-6`}>
        {<ExpandableText text={review.content} />}
      </article>
    </div>
  );
}

export default ReviewCard;
