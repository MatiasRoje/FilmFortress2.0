import mongoose, { Schema } from "mongoose";

const watchlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  movieIds: [
    {
      type: Number,
      unique: true,
    },
  ],
});

const Watchlist =
  mongoose.models.Watchlist || mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;
