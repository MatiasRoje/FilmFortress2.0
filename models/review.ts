import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    moviePoster: {
      type: String,
      required: true,
    },
    movieReleaseDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a unique index constraint on userId and movieId fields
reviewSchema.index({ userId: 1, movieId: 1 }, { unique: true });

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
