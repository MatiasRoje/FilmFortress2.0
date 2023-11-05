import CastList from "@/components/CastList";
import CrewList from "@/components/CrewList";
import ImagePlaceholderMovie from "@/components/ImagePlaceholderMovie";
import { getCasting, getMovie } from "@/lib/movies";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

type CastPageParams = {
  id: number;
};

type CastPageProps = {
  params: CastPageParams;
};

async function CastPage({ params: { id } }: CastPageProps) {
  const movie = await getMovie(id);
  const casting = await getCasting(id);

  return (
    <section className="my-6 flex gap-8">
      <div className="relative hidden flex-col items-center gap-4 sm:flex">
        {movie.posterPath ? (
          <Image
            src={movie.posterPath}
            alt=""
            width="300"
            height="450"
            className="rounded"
            priority
          />
        ) : (
          <ImagePlaceholderMovie dimensions="w-[300px] h-[450px]" />
        )}
        <Link
          href={`/movies/${movie.id}`}
          className={`absolute z-10 flex -translate-y-full transform items-center rounded-full border border-white bg-neutral-600/25 p-2 text-neutral-50 transition duration-300 hover:border-yellow-400 hover:text-yellow-400 sm:top-40 lg:top-52 xl:top-64`}
        >
          <ChevronLeftIcon className="h-12 w-12" />
        </Link>
      </div>
      <div className="space-y-4">
        <div className="flex gap-4 sm:hidden">
          {movie.posterPath ? (
            <Image
              src={movie.posterPath}
              alt=""
              width="90"
              height="135"
              className="relative rounded sm:hidden"
              priority
            />
          ) : (
            <ImagePlaceholderMovie dimensions="w-[90px] h-[135px] sm:hidden relative" />
          )}
          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-xl sm:text-3xl">{movie.title}</h1>
            <div className="flex gap-1 text-sm">
              <span>{movie.releaseDate}</span>
              <span>•</span>
              <span>{movie.runtime}</span>
            </div>
            <Link
              href={`/movies/${movie.id}`}
              className={`flex items-center rounded-full border border-white p-2 text-neutral-50 transition duration-300 hover:border-yellow-400 hover:text-yellow-400 sm:hidden`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-3xl">{movie.title}</h1>
          <div className="flex gap-1 text-sm">
            <span>{movie.releaseDate}</span>
            <span>•</span>
            <span>{movie.runtime}</span>
          </div>
        </div>
        <div className="flex flex-col gap-8 sm:flex-row">
          <CastList castData={casting.cast} />
          <CrewList crewData={casting.crew} />
        </div>
      </div>
    </section>
  );
}

export default CastPage;
