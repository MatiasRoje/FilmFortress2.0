import connectMongoDB from "@/lib/mongodb";
import Rating from "@/models/rating";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string> },
) {
  const { id } = params;
  const { newRating: rating } = await request.json();
  await connectMongoDB();
  await Rating.findByIdAndUpdate(id, { rating });
  return NextResponse.json({ message: "Rating updated" }, { status: 200 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> },
) {
  const { id } = params;
  await connectMongoDB();
  const rating = await Rating.findOne({ _id: id });
  return NextResponse.json({ rating }, { status: 200 });
}
