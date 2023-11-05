"use client";

import querystring from "querystring";

import React, { useState } from "react";
import { Disclosure, Listbox } from "@headlessui/react";
import Link from "next/link";
import { findValueByKey } from "@/lib/utility";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

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
    <Disclosure as="div" className="rounded bg-neutral-700">
      {({ open }) => (
        <>
          <Disclosure.Button className="inline-flex w-full items-center justify-between px-4 py-3">
            <h3>Sort</h3>
            {open ? (
              <p>
                <ChevronUpIcon className="h-4 w-4" />
              </p>
            ) : (
              <p>
                <ChevronDownIcon className="h-4 w-4" />
              </p>
            )}
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 py-3">
            <Listbox
              value={selectedOption}
              onChange={setSelectedOption}
              as="div"
              className="flex flex-col items-center justify-center"
            >
              <Listbox.Button
                onClick={() => setIsOpen(prev => !prev)}
                className={`mb-1 w-full rounded bg-neutral-600 px-4 py-2 text-sm transition-colors duration-300 hover:bg-neutral-500 ${
                  isOpen ? "bg-neutral-500" : ""
                }`}
              >
                {selectedOption.name}
              </Listbox.Button>
              {isOpen && (
                <Listbox.Options
                  static
                  as="div"
                  className="w-full list-none rounded bg-neutral-500 px-4 py-2"
                >
                  {sortingOptions.map(option => (
                    <Listbox.Option
                      key={option.id}
                      value={option}
                      className="rounded px-1 py-0.5 hover:bg-neutral-400"
                    >
                      {({ active, selected }) => (
                        <Link
                          href={`/movies?${queryString}${option.action}`}
                          onClick={() => {
                            setIsOpen(false);
                            setSelectedOption(option);
                          }}
                          className={`text-sm  ${active && "bg-neutral-400"} ${
                            selected && "underline"
                          }`}
                        >
                          {option.name}
                        </Link>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              )}
            </Listbox>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default SortSearch;
