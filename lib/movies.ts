import { Cast, Crew, Movie, MovieDetails } from "@/types/movies";
import { formatMinutesToHoursAndMinutes } from "./utility";

const apiKey = process.env.TMDB_API_KEY;
const imageUrl = process.env.NEXT_PUBLIC_TMDB_IMG_URL;
const imageUrlLight = process.env.NEXT_PUBLIC_TMDB_IMG_LIGHT;

// queries: top_rated, popular
export async function getMovies(query: string): Promise<Movie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}&language=en-US&page=1`,
    {
      next: { revalidate: 3600 },
    },
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

export async function searchMovies(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`,
  );

  if (!res.ok) throw new Error("Something went wrong with fetching movies");

  const data = await res.json();
  if (data.Response === "False") throw new Error("Movie not found");

  const moviePromises: Promise<Movie>[] = data.results
    .slice(0, 8)
    .map((movie: any) => StripMovie(movie));
  const moviesData = await Promise.all(moviePromises);
  return moviesData;
}

// NOTE Helper functions

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
    posterPath: imageUrlLight + MovieObject.poster_path,
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
    profilePath: imageUrlLight + castObject.profile_path,
    character: castObject.character,
  };
}

function StripCrew(crewObject: any): Crew {
  return {
    name: crewObject.name,
    job: crewObject.name,
  };
}

function countryCodeToFlagEmoji(countryCode: string): string {
  const flagEmoji = countryCode
    .toUpperCase()
    .split("")
    .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join("");

  return flagEmoji;
}
