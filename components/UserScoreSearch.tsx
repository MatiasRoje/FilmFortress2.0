"use client";

import querystring from "querystring";

import { findValueByKey } from "@/lib/utility";
import MinMaxInput from "./MinMaxInput";

function UserScoreSearch({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const minScoreQuery = findValueByKey(searchParams, "vote_average.gte");
  const maxScoreQuery = findValueByKey(searchParams, "vote_average.lte");

  if (minScoreQuery && maxScoreQuery) {
    delete searchParams["vote_average.gte"];
    delete searchParams["vote_average.lte"];
  }

  const queryString = querystring.stringify(searchParams);

  return (
    <MinMaxInput
      title="User Score"
      minValue={0}
      maxValue={10}
      queryString={queryString}
      minQuery="vote_average.gte"
      maxQuery="vote_average.lte"
      border="border-b pb-10"
    />
  );
}

export default UserScoreSearch;
