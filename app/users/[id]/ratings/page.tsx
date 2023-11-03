"use client";

import ImagePlaceholderMovie from "@/components/ImagePlaceholderMovie";
import RatingModal from "@/components/RatingModal";
import Spinner from "@/components/Spinner";
import useRatedMovies from "@/hooks/useRatedMovies";
import { useUserRatings } from "@/hooks/useUserRatings";
import { useAuth } from "@/providers/AuthContext";
import { MovieWithRating } from "@/types/movies";
import { RatingApi } from "@/types/ratings";
import { SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function UserRatingsPage() {
  const router = useRouter();
  const [movieTVToggle, setMovieTVToggle] = useState("movies");
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieWithRating | null>(
    null
  );

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
            {/* <button
              className={`pb-1 font-semibold hover:cursor-pointer ${
                movieTVToggle === "tv" && "underline underline-offset-8"
              }`}
              onClick={() => setMovieTVToggle("tv")}
            >
              TV <span className="text-sm">—{0}</span>
            </button> */}
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
          movieIdsArray?.length && (
            <ul className="space-y-5">
              {moviesWithRating.map(movie => (
                <li key={movie.id} className="flex">
                  <Link href={`/movies/${movie.id}`}>
                    {movie.posterPathMedium ? (
                      <Image
                        src={movie.posterPathMedium}
                        alt={`${movie.title} poster`}
                        width="150"
                        height="224"
                        className="h-full w-full rounded-l"
                      />
                    ) : (
                      <ImagePlaceholderMovie
                        dimensions="h-56 w-[112px] sm:w-[137px] lg:w-[142px]"
                        rounded="rounded-l"
                      />
                    )}
                  </Link>
                  <div className="h-56 w-full rounded-r bg-neutral-700 px-6 py-4">
                    <p className="text-lg font-semibold">
                      <Link
                        href={`/movies/${movie.id}`}
                        className="hover:underline"
                      >
                        {movie.title}
                      </Link>{" "}
                      <span>({movie.releaseDate.slice(-4)})</span>
                    </p>
                    <div className="mb-1.5 hidden gap-1 lg:flex">
                      <p className="text-sm">{movie.runtime}</p>
                      <p className="text-sm text-neutral-400">|</p>
                      <p className="text-sm">
                        {movie.genres.map(genre => genre.name).join(", ")}
                      </p>
                    </div>
                    <p
                      className="flex max-w-min items-center gap-0.5 rounded pr-2 transition duration-300 hover:cursor-pointer hover:bg-neutral-600"
                      onClick={() => {
                        setSelectedMovie(movie);
                        setIsOpen(true);
                      }}
                    >
                      <span>
                        <SparklesIcon className="-mr-1 h-9 w-9 py-1.5 text-yellow-400" />
                      </span>
                      {movie.rating?.rating}
                    </p>
                    <p className="mb-1.5 text-sm italic">
                      Rated on{" "}
                      {new Date(movie.rating!.updatedAt).toLocaleString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <p className="mb-1.5 mt-5 line-clamp-3 lg:mt-0 lg:line-clamp-2">
                      {movie.overview}
                    </p>
                    <div className="hidden gap-1 lg:flex">
                      <p className="text-sm">
                        {movie.directors.length > 1
                          ? "Directors:"
                          : "Director:"}{" "}
                        {movie.directors
                          .map(director => director.name)
                          .join(", ")}
                      </p>
                      <p className="text-sm text-neutral-400">|</p>
                      <p className="text-sm">
                        Stars:{" "}
                        {movie.cast
                          .slice(0, 3)
                          .map(cast => cast.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        {/* {!isLoadingRatings && !isLoadingMovies && movieTVToggle === "tv" && (
          <p>You haven&apos;t rated any TV shows.</p>
        )} */}
        {selectedMovie && (
          <RatingModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            movie={selectedMovie}
            userRatingApi={selectedMovie.rating}
          />
        )}
      </section>
    </main>
  );
}

export default UserRatingsPage;
