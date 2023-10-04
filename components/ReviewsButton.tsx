"use client";

import { useAuth } from "@/providers/AuthContext";
import Button from "./Button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { MovieDetails } from "@/types/movies";

type ReviewsButtonProps = {
  media: MovieDetails;
  setTempReview: (review: string) => void;
};

function ReviewsButton({ setTempReview, media }: ReviewsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleAddReview = () => {
    setIsOpen(true);
  };

  return (
    isAuthenticated && (
      <>
        <Button onClick={handleAddReview}>
          <div className="flex items-center gap-1">
            <span>
              <PencilSquareIcon className="h-4 w-4" />
            </span>
            Add review
          </div>
        </Button>
        <ReviewModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          media={media}
          setTempReview={setTempReview}
        />
      </>
    )
  );
}

export default ReviewsButton;
