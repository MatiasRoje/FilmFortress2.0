const apiKey = process.env.TMDB_API_KEY;
const imageUrl = process.env.TMBD_IMG_URL;

export interface TvShow {
  id: number;
  title: string;
  releaseDate: string;
  voteAverage: number;
  posterPath: string;
}

// queries: top_rated, popular
export async function getSeries(query: string): Promise<TvShow[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${query}?api_key=${apiKey}&language=en-US&page=1`,
  );
  const data = await res.json();
  const series = data.results;
  return series.map((serie: any) => ({
    id: serie.id,
    title: serie.name,
    releaseDate: serie.first_air_date,
    voteAverage: serie.vote_average,
    posterPath: imageUrl + serie.poster_path,
  }));
}
