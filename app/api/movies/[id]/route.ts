import { getMovie } from "@/lib/movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const movieId = request.nextUrl.pathname.split("/").at(-1);

  if (movieId) {
    const movie = await getMovie(parseInt(movieId));
    return NextResponse.json(movie);
  }
}
