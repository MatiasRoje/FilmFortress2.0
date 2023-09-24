import { getReviewsFromMovie } from "@/lib/reviews";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const movieId = request.nextUrl.pathname.split("/").at(-1);

  if (movieId) {
    const reviews = await getReviewsFromMovie(parseInt(movieId));
    return NextResponse.json(reviews);
  }
}
