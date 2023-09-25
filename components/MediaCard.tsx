import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Movie } from "@/types/movies";
import { TvShow } from "@/types/tv";
import RateModal from "./RateModal";
import { useState } from "react";

type MediaCardProps = {
  media: Movie | TvShow;
};

function MediaCard({ media }: MediaCardProps) {
  let [isOpen, setIsOpen] = useState(false);

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
          <PlusCircleIcon className="absolute top-0 right-1 h-9 w-9 hover:text-yellow-400" />
        </p>
      </Link>
      <div className="h-36 flex flex-col gap-2 p-2 bg-neutral-700 rounded-b">
        <div className="flex gap-3 items-center">
          <p className="flex gap-1 items-center">
            <span>
              <StarIcon className="w-4 h-4 text-yellow-500" />
            </span>{" "}
            {media.voteAverage}
          </p>
          <p>
            <SparklesIcon
              className="w-9 h-9 text-white hover:text-yellow-400 p-2 hover:bg-neutral-600 rounded"
              onClick={handleClick}
            />
          </p>
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
      <RateModal isOpen={isOpen} setIsOpen={setIsOpen} media={media} />
    </li>
  );
}

export default MediaCard;
