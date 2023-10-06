"use client";

import querystring from "querystring";

import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import Link from "next/link";
import { findValueByKey } from "@/lib/utility";

const sortingOptions = [
  { id: 1, name: "Popularity descending", action: "&sort_by=popularity.desc" },
  { id: 2, name: "Popularity ascending", action: "&sort_by=popularity.asc" },
  { id: 3, name: "Rating descending", action: "&sort_by=vote_average.desc" },
  { id: 4, name: "Rating ascending", action: "&sort_by=vote_average.asc" },
  {
    id: 5,
    name: "Release date descending",
    action: "&sort_by=primary_release_date.desc",
  },
  {
    id: 6,
    name: "Release date ascending",
    action: "&sort_by=primary_release_date.asc",
  },
];

function SortSearch({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [selectedOption, setSelectedOption] = useState(sortingOptions[0]);
  const [isOpen, setIsOpen] = useState(false);

  const sortByQuery = findValueByKey(searchParams, "sort_by");
  if (sortByQuery) {
    delete searchParams["sort_by"];
  }

  const queryString = querystring.stringify(searchParams);

  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      <Listbox.Button
        onClick={() => setIsOpen(prev => !prev)}
        className="text-sm"
      >
        {selectedOption.name}
      </Listbox.Button>
      {isOpen && (
        <Listbox.Options static>
          {sortingOptions.map(option => (
            <Listbox.Option key={option.id} value={option}>
              <Link
                href={`/movies?${queryString}${option.action}`}
                onClick={() => {
                  setIsOpen(false);
                  setSelectedOption(option);
                }}
                className="text-sm"
              >
                {option.name}
              </Link>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      )}
    </Listbox>
  );
}

export default SortSearch;
