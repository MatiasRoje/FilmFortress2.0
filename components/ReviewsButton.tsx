"use client";

import { useAuth } from "@/contexts/AuthContext";
import Button from "./Button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

function ReviewsButton() {
  const { isAuthenticated } = useAuth();

  const handleAddReview = () => {};

  return (
    isAuthenticated && (
      <Button onClick={handleAddReview}>
        <div className="flex items-center gap-1">
          <span>
            <PencilSquareIcon className="h-4 w-4" />
          </span>
          Add review
        </div>
      </Button>
    )
  );
}

export default ReviewsButton;
