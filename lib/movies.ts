const apiKey = process.env.TMDB_API_KEY;
const imageUrl = process.env.NEXT_PUBLIC_TMDB_IMG_URL;

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

type Cast = {
  name: string;
  profilePath: string;
  character: string;
};

type Crew = {
  name: string;
  job: string;
};

type MovieDetails = Movie & {
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

// queries: top_rated, popular
export async function getMovies(query: string): Promise<Movie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}&language=en-US&page=1`,
  );
  const data = await res.json();
  const movies = data.results;
  return movies.map((movie: any) => StripMovie(movie));
}

export async function getMovie(id: number): Promise<MovieDetails> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
  );
  const details = await res.json();
  const resCredits = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
  );
  const credits = await resCredits.json();
  return StripMovieDetails({ ...details, ...credits });
}

export function StripMovie(MovieObject: any): Movie {
  return {
    id: MovieObject.id,
    title: MovieObject.title,
    releaseDate: new Date(MovieObject.release_date).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    voteAverage: MovieObject.vote_average,
    posterPath: imageUrl + MovieObject.poster_path,
  };
}

export function StripMovieDetails(movieObject: any): MovieDetails {
  return {
    id: movieObject.id,
    title: movieObject.title,
    releaseDate: new Date(movieObject.release_date).toLocaleString("en-US", {
      year: "numeric",
    }),
    voteAverage: movieObject.vote_average,
    posterPath: imageUrl + movieObject.poster_path,
    overview: movieObject.overview,
    tagline: movieObject.tagline,
    runtime: formatMinutesToHoursAndMinutes(movieObject.runtime),
    genres: movieObject.genres,
    cast: movieObject.cast.slice(0, 6).map((cast: any) => StripCast(cast)),
    directors: movieObject.crew
      .filter(({ job }: any) => job === "Director")
      .map((crew: any) => StripCrew(crew)),
    writers: movieObject.crew
      .filter(({ job }: any) => job === "Writer")
      .map((crew: any) => StripCrew(crew)),
    backgropPath: imageUrl + movieObject.backdrop_path,
    status: movieObject.status,
    budget: `$${movieObject.budget.toLocaleString("en-US")}`,
    revenue: `$${movieObject.revenue.toLocaleString("en-US")}`,
    countries: movieObject.production_countries.map(
      (country: { iso_3166_1: string }) =>
        countryCodeToFlagEmoji(country.iso_3166_1),
    ),
  };
}

function StripCast(castObject: any): Cast {
  return {
    name: castObject.name,
    profilePath: imageUrl + castObject.profile_path,
    character: castObject.character,
  };
}

function StripCrew(crewObject: any): Crew {
  return {
    name: crewObject.name,
    job: crewObject.name,
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

function countryCodeToFlagEmoji(countryCode: string): string {
  const flagEmoji = countryCode
    .toUpperCase()
    .split("")
    .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join("");

  return flagEmoji;
}
