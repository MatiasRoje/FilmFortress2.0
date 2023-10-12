import CastList from "@/components/CastList";
import CrewList from "@/components/CrewList";
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
      <div className="flex flex-col items-center gap-4">
        <Image
          src={movie.posterPath}
          alt=""
          width="300"
          height="450"
          className="relative rounded"
          priority
        />
        <Link
          href={`/movies/${movie.id}`}
          className={`absolute top-1/2 z-10 flex -translate-y-full transform items-center rounded-full border border-white bg-neutral-600/25 p-2 text-neutral-50 transition duration-300 hover:border-yellow-400 hover:text-yellow-400`}
        >
          <ChevronLeftIcon className="h-12 w-12" />
        </Link>
      </div>
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl">{movie.title}</h1>
          <div className="flex gap-1 text-sm">
            <span>{movie.releaseDate}</span>
            <span>•</span>
            <span>{movie.runtime}</span>
          </div>
        </div>
        <div className="flex gap-8">
          <CastList castData={casting.cast} />
          <CrewList crewData={casting.crew} />
        </div>
      </div>
    </section>
  );
}

export default CastPage;
