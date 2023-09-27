import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ratingSchema.index({ movieId: 1, userId: 1 }, { unique: true });

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

export default Rating;
