"use client";

import Spinner from "@/components/Spinner";
import useRatedMovies from "@/hooks/useRatedMovies";
import { useUserRatings } from "@/hooks/useUserRatings";
import { StripMovieDetails } from "@/lib/movies";
import { useAuth } from "@/providers/AuthContext";
import { MovieDetails, MovieWithRating } from "@/types/movies";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function UserRatingsPage() {
  const router = useRouter();
  const [movieTVToggle, setMovieTVToggle] = useState("movies");
  const { user, isAuthenticated } = useAuth();

  const { userRatings, isLoading: isLoadingRatings } = useUserRatings(user?.id);
  const movieIdsArray = useMemo(
    () => userRatings?.map(userReview => userReview.movieId),
    [userRatings]
  );

  const { movies, isLoading: isLoadingMovies } = useRatedMovies(movieIdsArray);

  const moviesWithRating: MovieWithRating[] = movies.map(movie => {
    const userRating = userRatings?.find(rating => rating.movieId === movie.id);
    return { ...movie, rating: userRating };
  });

  console.log(moviesWithRating.at(0)?.writers);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  return (
    <main>
      <section className="mx-auto my-6 flex max-w-4xl flex-col gap-6">
        <div className="flex items-baseline gap-5">
          <h2 className="text-2xl font-semibold">My Ratings</h2>
          <div className="flex gap-3">
            <button
              className={`pb-1 font-semibold hover:cursor-pointer ${
                movieTVToggle === "movies" && "underline underline-offset-8"
              }`}
              onClick={() => setMovieTVToggle("movies")}
            >
              Movies <span className="text-sm">—{movieIdsArray?.length}</span>
            </button>
            <button
              className={`pb-1 font-semibold hover:cursor-pointer ${
                movieTVToggle === "tv" && "underline underline-offset-8"
              }`}
              onClick={() => setMovieTVToggle("tv")}
            >
              TV <span className="text-sm">—{0}</span>
            </button>
          </div>
        </div>
        {(isLoadingRatings || isLoadingMovies) && (
          <div className="my-10 flex items-center justify-center">
            <Spinner dimensions="w-12 h-12" />
          </div>
        )}
        {!isLoadingRatings &&
          !isLoadingMovies &&
          movieTVToggle === "movies" &&
          !movieIdsArray?.length && <p>You haven&apos;t rated any movies.</p>}
        {!isLoadingRatings &&
          !isLoadingMovies &&
          movieTVToggle === "movies" &&
          movieIdsArray?.length &&
          moviesWithRating.map(movie => <p key={movie.id}>{movie.title}</p>)}
      </section>
    </main>
  );
}

export default UserRatingsPage;
