import connectMongoDB from "@/lib/mongodb";
import Review from "@/models/review";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    content,
    userId,
    movieId,
    movieTitle,
    moviePoster,
    movieReleaseDate,
  } = await request.json();
  await connectMongoDB();
  await Review.create({
    content,
    userId,
    movieId,
    movieTitle,
    moviePoster,
    movieReleaseDate,
  });

  return NextResponse.json({ message: "Review created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const reviews = await Review.find();
  return NextResponse.json({ reviews });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Review.findByIdAndDelete(id);
  return NextResponse.json({ message: "Review deleted" }, { status: 200 });
}
