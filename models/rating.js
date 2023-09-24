import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema(
  {
    rating: Number,
    userId: Number,
    movieId: Number,
  },
  {
    timestamps: true,
  },
);

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

export default Rating;
