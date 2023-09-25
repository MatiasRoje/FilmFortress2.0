import { Dialog } from "@headlessui/react";
import { useRef, useState } from "react";
import StarRating from "./StarRating";
import Button from "./Button";
import { Movie, MovieDetails } from "@/types/movies";
import { TvShow } from "@/types/tv";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { postRating } from "@/lib/ratings";

type RateModalProps = {
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  media: Movie | MovieDetails | TvShow;
};

function RateModal({ isOpen, setIsOpen, media }: RateModalProps) {
  const router = useRouter();
  let titleRef = useRef<HTMLHeadingElement | null>(null);
  const [userRating, setUserRating] = useState(0);
  const { user, isAuthenticated } = useAuth();

  async function handleClick() {
    if (!isAuthenticated) router.push("/login");

    if (user && media && userRating) {
      const res = await postRating(userRating, media.id, user.id);

      if (res && res.ok) {
        router.back();
      } else {
        throw new Error("Failed to create a rating");
      }
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
        <Dialog.Panel className="flex flex-col items-center gap-5 py-8 px-12 mx-auto max-w-sm rounded bg-neutral-700">
          <Dialog.Title className="text-xs font-medium text-yellow-400">
            RATE THIS
          </Dialog.Title>
          <h2 className="text-xl font-bold text-center" ref={titleRef}>
            {media.title}
          </h2>
          <StarRating maxRating={10} size={28} onSetRating={setUserRating} />
          {userRating ? (
            <Button onClick={handleClick} paddingX="px-32">
              Rate
            </Button>
          ) : (
            <button
              className="bg-neutral-500 text-white px-32 py-2 rounded"
              disabled
            >
              Rate
            </button>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default RateModal;
