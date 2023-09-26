import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Movie } from "@/types/movies";
import { TvShow } from "@/types/tv";
import RateModal from "./RateModal";
import { useState } from "react";
import { Rating } from "@/types/ratings";

type MediaCardProps = {
  media: Movie | TvShow;
  ratings: Rating[];
};

function MediaCard({ media, ratings }: MediaCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRating, setTempRating] = useState<string | number>("");
  const userRating = ratings.find(rating => rating.movieId === media.id);

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <li className="px-3" style={{ flex: "0 0 16.66%" }}>
      <Link href={`/movies/${media.id}`} className="relative">
        <Image
          src={media.posterPath}
          alt=""
          width="180"
          height="270"
          className="rounded-t max-w-none h-[17rem] w-auto"
        />
        <p>
          <PlusCircleIcon className="absolute top-0 right-1 h-9 w-9 hover:text-yellow-400 transition duration-300" />
        </p>
      </Link>
      <div className="h-36 flex flex-col gap-2 p-2 bg-neutral-700 rounded-b">
        <div className="flex gap-3 items-center">
          <p className="flex gap-1 items-center justify-center">
            <span>
              <StarIcon className="w-4 h-4 text-yellow-500" />
            </span>{" "}
            {media.voteAverage}
          </p>
          {userRating && (
            <p className="flex items-center">
              <span>
                <SparklesIcon className="w-9 h-9 text-yellow-400 py-2 -mr-1" />
              </span>{" "}
              {userRating.rating}
            </p>
          )}
          {tempRating && (
            <p className="flex items-center">
              <span>
                <SparklesIcon className="w-9 h-9 text-yellow-400 py-2 -mr-1" />
              </span>{" "}
              {tempRating}
            </p>
          )}
          {!userRating && !tempRating && (
            <p>
              <SparklesIcon
                className="w-9 h-9 text-white hover:text-yellow-400 p-2 hover:bg-neutral-600 rounded transition duration-300"
                onClick={handleClick}
              />
            </p>
          )}
        </div>
        <p>
          <Link
            href={`/movies/${media.id}`}
            className="font-semibold hover:underline line-clamp-2"
          >
            {media.title}
          </Link>
        </p>
        <p className="text-sm mt-auto">{media.releaseDate}</p>
      </div>
      <RateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        media={media}
        setTempRating={setTempRating}
      />
    </li>
  );
}

export default MediaCard;
