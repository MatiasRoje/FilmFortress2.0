import connectMongoDB from "@/lib/mongodb";
import Watchlist from "@/models/watchlist";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const { id } = params;
  const { newMovieIds: movieIds } = await request.json();
  await connectMongoDB();
  await Watchlist.findByIdAndUpdate(id, { movieIds });
  return NextResponse.json({ message: "Watchlist updated" }, { status: 200 });
}
