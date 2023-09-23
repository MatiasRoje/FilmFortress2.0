import { Review } from "@/types/reviews";
import { StarIcon } from "@heroicons/react/24/solid";
import ExpandableText from "./ExpandableText";

type ReviewCardProps = {
  review: Review;
  width: string;
};

function ReviewCard({ review, width }: ReviewCardProps) {
  return (
    <div className="bg-neutral-700 rounded p-4 grow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Review by {review.author} </p>
          <p className="text-sm italic">Written on {review.createdDate}</p>
        </div>
        <p className="flex items-center justify-center gap-1 text-lg">
          <span>
            <StarIcon className="w-6 h-6 text-yellow-500" />
          </span>{" "}
          {review.rating?.toFixed(1)}
        </p>
      </div>
      <article className={`mt-4 text-justify ${width}`}>
        {<ExpandableText text={review.content} />}
      </article>
    </div>
  );
}

export default ReviewCard;
