const apiKey = process.env.TMDB_API_KEY;
const imageUrl = process.env.TMBD_IMG_URL;

interface Movie {
  id: number;
  title: string;
  releaseDate: Date;
  voteAverage: number;
  posterPath: string;
}

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
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    posterPath: imageUrl + movie.poster_path,
  }));
}
