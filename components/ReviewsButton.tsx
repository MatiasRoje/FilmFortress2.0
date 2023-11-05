"use client";

import Button from "./Button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { MovieDetails } from "@/types/movies";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type ReviewsButtonProps = {
  movie: MovieDetails;
};

function ReviewsButton({ movie }: ReviewsButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const handleAddReview = () => {
    if (!session) router.push("/login");

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
      {movie.posterPath ? (
        <ReviewModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          movieId={movie.id}
          movieTitle={movie.title}
          moviePoster={movie.posterPath}
          movieReleaseDate={movie.releaseDate}
        />
      ) : (
        <ReviewModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          movieId={movie.id}
          movieTitle={movie.title}
          movieReleaseDate={movie.releaseDate}
        />
      )}
    </>
  );
}

export default ReviewsButton;
