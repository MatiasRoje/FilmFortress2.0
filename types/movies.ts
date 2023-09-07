export type Movie = {
  id: number;
  title: string;
  releaseDate: string;
  voteAverage: number;
  posterPath: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Cast = {
  name: string;
  profilePath: string;
  character: string;
};

export type Crew = {
  name: string;
  job: string;
};

export type MovieDetails = Movie & {
  overview: string;
  tagline: string;
  runtime: string;
  genres: Genre[];
  cast: Cast[];
  directors: Crew[];
  writers: Crew[];
  backgropPath: string;
  status: string;
  budget: string;
  revenue: string;
  countries: string[];
};