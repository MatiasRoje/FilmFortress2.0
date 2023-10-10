export type Rating = {
  rating: number;
  movieId: number;
  userId: number;
};

export type RatingApi = {
  _id: string;
  createdAt: string;
  movieId: number;
  rating: number;
  updatedAt: string;
  userId: number;
};
