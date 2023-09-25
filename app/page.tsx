import Carousel from "@/components/Carousel";
import { getMovies } from "@/lib/movies";
import { getSeries } from "@/lib/tv";

const getRatings = async () => {
  try {
    const res = await fetch("http:/localhost:3000/api/ratings", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch ratings");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading ratings:", error);
  }
};

async function Home() {
  const { ratings } = await getRatings();
  const moviesByPopularity = await getMovies("popular");
  const moviesByRate = await getMovies("top_rated");
  const seriesByRate = await getSeries("top_rated");

  return (
    <main className="flex flex-col gap-10 py-6">
      {/* TODO Convert this subheading to a react component */}
      <div className="flex flex-col gap-4">
        <h2 className="flex gap-2 text-2xl font-bold">
          <span className="border-l-4 border-main-500 rounded"></span>Trending
        </h2>
        <Carousel mediaCollection={moviesByPopularity.slice(0, 18)} />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="flex gap-2 text-2xl font-bold">
          <span className="border-l-4 border-main-500 rounded"></span>Top 10
          movies on FilmFortress
        </h3>
        <Carousel mediaCollection={moviesByRate.slice(0, 10)} />
      </div>
      {ratings.map((rating: any) => (
        <p key={rating.id}>{rating.rating}</p>
      ))}
      {/* <h3 className="flex gap-2 text-2xl font-bold">
        <span className="border-l-4 border-main-500 rounded"></span>Top 10 TV
        Shows on FilmFortress
      </h3>
      <Carousel mediaCollection={seriesByRate.slice(0, 10)} />  */}
    </main>
  );
}

export default Home;
