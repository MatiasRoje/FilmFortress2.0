import { Cast } from "@/types/movies";
import Image from "next/image";
import ImagePlaceholderPerson from "./ImagePlaceholderPerson";

type CastListProps = {
  castData: Cast[];
};

function CastList({ castData }: CastListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">
        Cast <span>—{castData.length}</span>
      </h2>
      <ul className="my-4 space-y-2">
        {castData.map(cast => (
          <li key={cast.name} className="flex gap-2">
            {cast.profilePath ? (
              <Image
                src={cast.profilePath}
                alt={`${cast.name} photo`}
                width={48}
                height={48}
                className="h-16 w-16 rounded object-cover"
              />
            ) : (
              <ImagePlaceholderPerson dimensions="w-auto h-16" />
            )}
            <div>
              <p>{cast.name}</p>
              <p className="text-sm">{cast.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CastList;
