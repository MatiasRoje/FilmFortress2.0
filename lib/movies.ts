import { Cast, Credits, Crew, Movie, MovieDetails } from "@/types/movies";
import { formatMinutesToHoursAndMinutes } from "./utility";

const apiKey = process.env.TMDB_API_KEY;
const imageUrl = process.env.NEXT_PUBLIC_TMDB_IMG_URL;
const imageUrlMedium = process.env.NEXT_PUBLIC_TMDB_IMG_MEDIUM;
const imageUrlLow = process.env.NEXT_PUBLIC_TMDB_IMG_LOW;

// queries: top_rated, popular
export async function getMovies(
  query: string,
  queryString: string = "language=en-US&page=1"
) {
  if (!query) {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&${queryString}`,
      {
        next: { revalidate: 3600 },
      }
    );
    const data = await res.json();
    const movies = data.results?.map((movie: any) => stripMovie(movie));
    return {
      movies,
      totalPages: data.total_pages,
    };
  }
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}&${queryString}`,
    {
      next: { revalidate: 3600 },
    }
  );
  const data = await res.json();
  const movies = data.results?.map((movie: any) => stripMovie(movie));
  return {
    movies,
    totalPages: data.total_pages,
  };
}

export async function getMovie(id: number): Promise<MovieDetails> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  );
  const details = await res.json();
  const resCredits = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
  );
  const credits = await resCredits.json();
  return stripMovieDetails({ ...details, ...credits });
}

export async function searchMovies(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`
  );

  if (!res.ok) throw new Error("Something went wrong with fetching movies");

  const data = await res.json();
  if (data.Response === "False") throw new Error("Movie not found");

  const moviePromises: Promise<Movie>[] = data.results
    .slice(0, 8)
    .map((movie: any) => stripMovie(movie));
  const moviesData = await Promise.all(moviePromises);
  return moviesData;
}

export async function getRandomMovieFromCollection(movies: Movie[]) {
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  const movieDetails = await getMovie(randomMovie.id);
  return movieDetails;
}

export async function getCasting(movieId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
  );
  const credits = await res.json();
  return stripCredits(credits);
}

// NOTE Helper functions

export function stripMovie(movieObject: any): Movie {
  if (movieObject.poster_path) {
    return {
      id: movieObject.id,
      title: movieObject.title,
      releaseDate: new Date(movieObject.release_date).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      voteAverage: movieObject.vote_average,
      posterPath: imageUrlMedium + movieObject.poster_path,
    };
  } else {
    return {
      id: movieObject.id,
      title: movieObject.title,
      releaseDate: new Date(movieObject.release_date).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      voteAverage: movieObject.vote_average,
    };
  }
}

export function stripMovieDetails(movieObject: any): MovieDetails {
  if (movieObject.poster_path) {
    return {
      id: movieObject.id,
      title: movieObject.title,
      releaseDate: new Date(movieObject.release_date).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      voteAverage: movieObject.vote_average,
      posterPath: imageUrl + movieObject.poster_path,
      posterPathMedium: imageUrlMedium + movieObject.poster_path,
      overview: movieObject.overview,
      tagline: movieObject.tagline,
      runtime: formatMinutesToHoursAndMinutes(movieObject.runtime),
      genres: movieObject.genres,
      cast: movieObject.cast.slice(0, 6).map((cast: any) => stripCast(cast)),
      directors: movieObject.crew
        .filter(({ job }: any) => job === "Director")
        .map((crew: any) => stripCrew(crew)),
      writers: movieObject.crew
        .filter(({ job }: any) => job === "Writer")
        .map((crew: any) => stripCrew(crew)),
      backgropPath: imageUrl + movieObject.backdrop_path,
      status: movieObject.status,
      budget: `$${movieObject.budget.toLocaleString("en-US")}`,
      revenue: `$${movieObject.revenue.toLocaleString("en-US")}`,
      countries: movieObject.production_countries.map(
        (country: { iso_3166_1: string }) =>
          countryCodeToFlagEmoji(country.iso_3166_1)
      ),
    };
  } else {
    return {
      id: movieObject.id,
      title: movieObject.title,
      releaseDate: new Date(movieObject.release_date).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      voteAverage: movieObject.vote_average,
      overview: movieObject.overview,
      tagline: movieObject.tagline,
      runtime: formatMinutesToHoursAndMinutes(movieObject.runtime),
      genres: movieObject.genres,
      cast: movieObject.cast.slice(0, 6).map((cast: any) => stripCast(cast)),
      directors: movieObject.crew
        .filter(({ job }: any) => job === "Director")
        .map((crew: any) => stripCrew(crew)),
      writers: movieObject.crew
        .filter(({ job }: any) => job === "Writer")
        .map((crew: any) => stripCrew(crew)),
      backgropPath: imageUrl + movieObject.backdrop_path,
      status: movieObject.status,
      budget: `$${movieObject.budget.toLocaleString("en-US")}`,
      revenue: `$${movieObject.revenue.toLocaleString("en-US")}`,
      countries: movieObject.production_countries.map(
        (country: { iso_3166_1: string }) =>
          countryCodeToFlagEmoji(country.iso_3166_1)
      ),
    };
  }
}

function stripCredits(creditsObjet: any): Credits {
  const groupedCrew: Record<string, any[]> = {};

  creditsObjet.crew.forEach((crewMember: any) => {
    const department = crewMember.department;
    const name = crewMember.name;

    if (!groupedCrew[department]) {
      groupedCrew[department] = [];
    }

    // Check if the crew member with the same name already exists in the department
    const existingCrewMember = groupedCrew[department].find(
      member => member.name === name
    );

    if (existingCrewMember) {
      // If the crew member exists, append the new job to their existing entry
      existingCrewMember.job += `, ${crewMember.job}`;
    } else {
      // If the crew member doesn't exist, add a new entry
      groupedCrew[department].push(stripCrew(crewMember));
    }
  });

  return {
    cast: creditsObjet.cast.map((cast: any) => stripCast(cast)),
    crew: groupedCrew,
  };
}

function stripCast(castObject: any): Cast {
  if (castObject.profile_path) {
    return {
      name: castObject.name,
      profilePath: imageUrlMedium + castObject.profile_path,
      character: castObject.character,
    };
  } else {
    return { name: castObject.name, character: castObject.character };
  }
}

function stripCrew(crewObject: any): Crew {
  if (crewObject.profile_path) {
    return {
      name: crewObject.name,
      profilePath: imageUrlMedium + crewObject.profile_path,
      job: crewObject.job,
    };
  } else {
    return {
      name: crewObject.name,
      job: crewObject.job,
    };
  }
}

function countryCodeToFlagEmoji(countryCode: string): string {
  const flagEmoji = countryCode
    .toUpperCase()
    .split("")
    .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join("");

  return flagEmoji;
}
