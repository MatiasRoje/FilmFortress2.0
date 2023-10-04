import { Dialog } from "@headlessui/react";
import { useRef, useState } from "react";
import StarRating from "./StarRating";
import Button from "./Button";
import { Movie, MovieDetails } from "@/types/movies";
import { TvShow } from "@/types/tv";
import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
import { Rating, RatingApi } from "@/types/ratings";
import { UpdateRatingParams } from "@/lib/ratings";

type RateModalProps = {
  userRatingApi: RatingApi | undefined;
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  media: Movie | MovieDetails | TvShow;
  createRating: UseMutateFunction<
    Response | undefined,
    unknown,
    Rating,
    unknown
  >;
  deleteRating: UseMutateFunction<
    Response | undefined,
    unknown,
    string,
    unknown
  >;
  updateRating: UseMutateFunction<
    Response | undefined,
    unknown,
    UpdateRatingParams,
    unknown
  >;
};

function RatingModal({
  userRatingApi,
  isOpen,
  setIsOpen,
  media,
  createRating,
  deleteRating,
  updateRating,
}: RateModalProps) {
  const router = useRouter();
  let titleRef = useRef<HTMLHeadingElement | null>(null);
  const [userRating, setUserRating] = useState(0);
  const { user, isAuthenticated } = useAuth();

  function handleClick() {
    if (!isAuthenticated) router.push("/login");

    if (userRatingApi) {
      updateRating(
        {
          rating: userRatingApi,
          newRating: userRating,
        },
        {
          onSuccess: () => {
            setIsOpen(false);
          },
        }
      );
    }

    if (!userRatingApi && user && media && userRating) {
      createRating(
        {
          rating: userRating,
          movieId: media.id,
          userId: user?.id,
        },
        {
          onSuccess: () => {
            setIsOpen(false);
          },
        }
      );
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        setUserRating(0);
      }}
      className="relative z-50"
      initialFocus={titleRef}
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto flex max-w-sm flex-col items-center gap-5 rounded bg-neutral-700 px-12 py-8">
          <Dialog.Title className="text-xs font-medium text-yellow-400">
            RATE THIS
          </Dialog.Title>
          <h2 className="text-center text-xl font-bold" ref={titleRef}>
            {media.title}
          </h2>
          {userRatingApi ? (
            <StarRating
              maxRating={10}
              size={28}
              onSetRating={setUserRating}
              defaultRating={userRatingApi.rating}
            />
          ) : (
            <StarRating maxRating={10} size={28} onSetRating={setUserRating} />
          )}
          {userRating ? (
            <Button onClick={handleClick} paddingX="px-32">
              Rate
            </Button>
          ) : (
            <button className="rounded bg-neutral-500 px-32 py-2" disabled>
              Rate
            </button>
          )}
          {userRatingApi && (
            <button
              className="hover:underline"
              onClick={() => {
                deleteRating(userRatingApi._id, {
                  onSuccess: () => {
                    setIsOpen(false);
                  },
                });
              }}
            >
              Remove rating
            </button>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default RatingModal;
