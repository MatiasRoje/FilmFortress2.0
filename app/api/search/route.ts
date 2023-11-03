import { searchMovies } from "@/lib/movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  if (query !== null) {
    const movies = await searchMovies(query);
    return NextResponse.json(movies);
  }
}
