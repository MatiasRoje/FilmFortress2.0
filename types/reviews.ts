export interface ReviewTMDB {
  id: string;
  author: string | undefined;
  rating: number | undefined;
  content: string;
  createdDate: string;
}

export type UserReview = {
  _id: string;
  content: string;
  userId: number;
  movieId: number;
  movieTitle: string;
  movieReleaseDate: string;
  moviePoster: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ReviewObject = {
  author: string;
  author_details: any;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};
