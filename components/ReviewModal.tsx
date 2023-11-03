import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useCreateReview } from "@/hooks/useCreateReview";
import { UserReview } from "@/types/reviews";
import { useUpdateReview } from "@/hooks/useUpdateReview";

type ReviewModalProps = {
  userReviewApi?: UserReview | undefined;
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  movieId: number;
  movieTitle: string;
  movieReleaseDate: string;
  moviePoster?: string;
};

function ReviewModal({
  userReviewApi,
  isOpen,
  setIsOpen,
  movieId,
  movieTitle,
  movieReleaseDate,
  moviePoster,
}: ReviewModalProps) {
  const router = useRouter();
  const [userReview, setUserReview] = useState(
    userReviewApi ? userReviewApi.content : ""
  );
  const { user, isAuthenticated } = useAuth();

  const { createReview } = useCreateReview();
  const { updateReview } = useUpdateReview();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isAuthenticated) router.push("/login");

    if (userReviewApi) {
      updateReview(
        {
          review: userReviewApi,
          newContent: userReview,
        },
        {
          onSuccess: () => {
            setIsOpen(false);
          },
        }
      );
    }

    if (!userReviewApi && user && userReview) {
      if (moviePoster) {
        createReview(
          {
            content: userReview,
            userId: user.id,
            movieId,
            movieTitle,
            movieReleaseDate,
            moviePoster,
          },
          {
            onSuccess: () => {
              setIsOpen(false);
            },
          }
        );
      } else {
        createReview(
          {
            content: userReview,
            userId: user.id,
            movieId,
            movieTitle,
            movieReleaseDate,
          },
          {
            onSuccess: () => {
              setIsOpen(false);
            },
          }
        );
      }
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        setUserReview("");
      }}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto flex flex-col items-center gap-5 rounded bg-neutral-700 px-12 py-8">
          <Dialog.Title className="text-xs font-medium text-yellow-400">
            REVIEW THIS
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <h2 className="text-center text-xl font-bold">{movieTitle}</h2>
            <textarea
              defaultValue={userReviewApi?.content}
              onChange={e => setUserReview(e.target.value)}
              className="h-80 w-[40rem] rounded border-none px-4 py-2 text-lg text-neutral-800 transition-all duration-300 focus:outline-none focus:ring focus:ring-main-400"
            ></textarea>
            <div className="flex justify-center">
              {userReview.length > 0 ? (
                <Button paddingX="px-32">Review</Button>
              ) : (
                <button className="rounded bg-neutral-500 px-32 py-2" disabled>
                  Review
                </button>
              )}
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ReviewModal;
