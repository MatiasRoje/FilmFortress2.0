"use client";

import { Crew } from "@/types/movies";
import Image from "next/image";
import ImagePlaceholderPerson from "./ImagePlaceholderPerson";

type CrewListProps = {
  crewData: Record<string, Crew[]>;
};

function CrewList({ crewData }: CrewListProps) {
  return (
    <div>
      {Object.entries(crewData).map(([department, members]) => (
        <div key={department}>
          <h3 className="font-semibold">{department}</h3>
          {members.map(member => (
            <div key={member.name} className="flex">
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CrewList;
