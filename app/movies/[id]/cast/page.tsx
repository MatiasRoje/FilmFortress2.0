import CrewList from "@/components/CrewList";
import { getCasting } from "@/lib/movies";
import { Crew } from "@/types/movies";

type CastPageParams = {
  id: number;
};

type CastPageProps = {
  params: CastPageParams;
};

async function CastPage({ params: { id } }: CastPageProps) {
  const casting = await getCasting(id);

  return (
    <div>
      <CrewList crewData={casting.crew} />
    </div>
  );
}

export default CastPage;
