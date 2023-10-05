import connectMongoDB from "@/lib/mongodb";
import { getReviewsFromMovie } from "@/lib/reviews";
import Review from "@/models/review";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const { id } = params;
  const { newContent: content } = await request.json();
  await connectMongoDB();
  await Review.findByIdAndUpdate(id, { content });
  return NextResponse.json({ message: "Review updated" }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const movieId = request.nextUrl.pathname.split("/").at(-1);

  if (movieId) {
    const reviews = await getReviewsFromMovie(parseInt(movieId));
    return NextResponse.json(reviews);
  }
}
