import { TvShow } from "@/types/tv";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const imageUrl = process.env.NEXT_PUBLIC_TMDB_IMG_URL;
const imageUrlLight = process.env.NEXT_PUBLIC_TMDB_IMG_LIGHT;

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
    posterPath: imageUrlLight + serie.poster_path,
  }));
}
