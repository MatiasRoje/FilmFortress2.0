"use client";

import Button from "./Button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { MovieDetails } from "@/types/movies";
import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";

type ReviewsButtonProps = {
  movie: MovieDetails;
};

function ReviewsButton({ movie }: ReviewsButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleAddReview = () => {
    if (!isAuthenticated) router.push("/login");

    setIsOpen(true);
  };

  return (
    <>
      <Button onClick={handleAddReview}>
        <div className="flex items-center gap-1">
          <span>
            <PencilSquareIcon className="h-4 w-4" />
          </span>
          Add review
        </div>
      </Button>
      <ReviewModal isOpen={isOpen} setIsOpen={setIsOpen} movie={movie} />
    </>
  );
}

export default ReviewsButton;
