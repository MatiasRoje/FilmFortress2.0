import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Watchlist from "@/models/watchlist";

export async function POST(request: NextRequest) {
  const { userId, movieId } = await request.json();
  await connectMongoDB();
  let watchlist = await Watchlist.findOne({ userId });

  if (!watchlist) {
    await Watchlist.create({ userId, movieIds: [movieId], name: "Watchlist" });
  } else {
    if (!watchlist.movieIds.includes(movieId)) {
      watchlist.movieIds.push(movieId);
      await watchlist.save();
    }
  }

  return NextResponse.json(
    { message: "Movie added to watchlist" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const watchlists = await Watchlist.find();
  return NextResponse.json({ watchlists });
}
