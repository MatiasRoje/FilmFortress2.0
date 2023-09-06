const apiKey = process.env.TMDB_API_KEY;
const imageUrl = process.env.TMBD_IMG_URL;

export type Movie = {
  id: number;
  title: string;
  releaseDate: string;
  voteAverage: number;
  posterPath: string;
};

type Genre = {
  id: number;
  name: string;
};

type MovieDetails = Movie & {
  overview: string;
  tagline: string;
  runtime: string;
  genres: Genre[];
};

// queries: top_rated, popular
export async function getMovies(query: string): Promise<Movie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}&language=en-US&page=1`,
  );
  const data = await res.json();
  const movies = data.results;
  return movies.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    releaseDate: new Date(movie.release_date).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    voteAverage: movie.vote_average,
    posterPath: imageUrl + movie.poster_path,
  }));
}

export async function getMovie(id: number): Promise<MovieDetails> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
  );
  const movie = await res.json();
  return StripMovieDetails(movie);
}

function StripMovieDetails(movieObjet: any): MovieDetails {
  return {
    id: movieObjet.id,
    title: movieObjet.title,
    releaseDate: new Date(movieObjet.release_date).toLocaleString("en-US", {
      year: "numeric",
    }),
    voteAverage: movieObjet.vote_average,
    posterPath: imageUrl + movieObjet.poster_path,
    overview: movieObjet.overview,
    tagline: movieObjet.tagline,
    runtime: formatMinutesToHoursAndMinutes(movieObjet.runtime),
    genres: movieObjet.genres,
  };
}

function formatMinutesToHoursAndMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // Build the formatted string
  let formattedTime = "";

  if (hours > 0) {
    formattedTime += hours + "h ";
  }

  if (remainingMinutes > 0) {
    formattedTime += remainingMinutes + "m";
  }

  return formattedTime;
}
