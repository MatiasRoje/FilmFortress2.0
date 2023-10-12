"use client";

import { Crew } from "@/types/movies";
import Image from "next/image";
import ImagePlaceholderPerson from "./ImagePlaceholderPerson";

type CrewListProps = {
  crewData: Record<string, Crew[]>;
};

function CrewList({ crewData }: CrewListProps) {
  const numUniqueCrewMembers = Object.keys(crewData).reduce(
    (count, department) => count + crewData[department].length,
    0
  );

  return (
    <div>
      <h2 className="text-xl font-semibold">
        Cast <span>—{numUniqueCrewMembers}</span>
      </h2>
      {Object.entries(crewData).map(([department, members]) => (
        <div key={department} className="my-4 space-y-2">
          <h3 className="font-semibold">{department}</h3>
          <ul className="space-y-2">
            {members.map(member => (
              <li key={member.name} className="flex gap-2">
                {member.profilePath ? (
                  <Image
                    src={member.profilePath}
                    alt={`${member.name} photo`}
                    width={48}
                    height={48}
                    className="h-16 w-16 rounded object-cover"
                  />
                ) : (
                  <ImagePlaceholderPerson dimensions="w-auto h-16" />
                )}
                <div>
                  <p>{member.name}</p>
                  <p className="text-sm">{member.job}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CrewList;
