"use client";

import querystring from "querystring";

import { findValueByKey } from "@/lib/utility";
import MinMaxInput from "./MinMaxInput";

function MovieRuntimeSearch({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const minRuntimeQuery = findValueByKey(searchParams, "with_runtime.gte");
  const maxRuntimeQuery = findValueByKey(searchParams, "with_runtime.lte");

  if (minRuntimeQuery && maxRuntimeQuery) {
    delete searchParams["vote_average.gte"];
    delete searchParams["vote_average.lte"];
  }

  const queryString = querystring.stringify(searchParams);

  return (
    <MinMaxInput
      title="Runtime"
      minValue={0}
      maxValue={400}
      step={20}
      minQuery="with_runtime.gte"
      maxQuery="with_runtime.lte"
      queryString={queryString}
    />
  );
}

export default MovieRuntimeSearch;
