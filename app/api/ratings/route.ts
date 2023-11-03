import connectMongoDB from "@/lib/mongodb";
import Rating from "@/models/rating";
import Watchlist from "@/models/watchlist";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { rating, userId, movieId } = await request.json();
  await connectMongoDB();
  await Rating.create({ rating, userId, movieId });

  // Deleting the movie from the Watchlist in case it get watched
  let watchlist = await Watchlist.findOne({ userId });

  if (watchlist && watchlist.movieIds.includes(movieId)) {
    watchlist.movieIds = watchlist.movieIds.filter(
      (id: number) => id !== movieId
    );
    await watchlist.save();
  }

  return NextResponse.json({ message: "Rating created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const ratings = await Rating.find();
  return NextResponse.json({ ratings });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Rating.findByIdAndDelete(id);
  return NextResponse.json({ message: "Rating deleted" }, { status: 200 });
}
