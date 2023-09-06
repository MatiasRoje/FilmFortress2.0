import { Movie } from "@/lib/movies";
import { TvShow } from "@/lib/tv";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface MediaCardProps {
  media: Movie | TvShow;
}

function MediaCard({ media }: MediaCardProps) {
  return (
    <li className="px-3" style={{ flex: "0 0 16.66%" }}>
      <Link href={`/movies/${media.id}`} className="relative">
        <Image
          src={media.posterPath}
          alt=""
          width="270"
          height="185"
          className="rounded-t"
        />
        <p>
          <PlusCircleIcon className="absolute top-0 right-0 h-9 w-9 hover:text-yellow-400" />
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
            <SparklesIcon className="w-9 h-9 text-white hover:text-yellow-400 p-2 hover:bg-neutral-600 rounded" />
          </p>
        </div>
        <p>
          <Link
            href={`/movies/${media.id}`}
            className="font-bold hover:underline"
          >
            {media.title}
          </Link>
        </p>
        <p className="text-sm mt-auto">{media.releaseDate}</p>
      </div>
    </li>
  );
}

export default MediaCard;
