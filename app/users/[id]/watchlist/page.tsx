"use client";

import ImagePlaceholderMovie from "@/components/ImagePlaceholderMovie";
import RatingModal from "@/components/RatingModal";
import Spinner from "@/components/Spinner";
import { useDeleteMovieFromWatchlist } from "@/hooks/useDeleteMovieFromWatchlist";
import { useUserWatchlist } from "@/hooks/useUserWatchlist";
import useWatchlistMovies from "@/hooks/useWatchlistMovies";
import { MovieDetails } from "@/types/movies";
import { PlusCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";

function UserWatchlistPage() {
  const [movieTVToggle, setMovieTVToggle] = useState("movies");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const { userWatchlist } = useUserWatchlist(session?.user?.id);
  const { movies, isLoading } = useWatchlistMovies(userWatchlist?.movieIds);
  const { deleteMovie } = useDeleteMovieFromWatchlist();

  function handleDeleteMovie(movie: MovieDetails) {
    const newMovieIds = userWatchlist?.movieIds.filter(
      (movieId: number) => movieId !== movie.id
    );
    if (userWatchlist && newMovieIds)
      deleteMovie({ watchlist: userWatchlist, newMovieIds });
  }

  return (
    <main>
      {session?.user && (
        <section className="mx-auto my-6 flex max-w-4xl flex-col gap-6">
          <div className="flex items-baseline gap-5">
            <h2 className="text-2xl font-semibold">My Watchlist</h2>
            <div className="flex gap-3">
              <button
                className={`pb-1 font-semibold hover:cursor-pointer ${
                  movieTVToggle === "movies" && "underline underline-offset-8"
                }`}
                onClick={() => setMovieTVToggle("movies")}
              >
                Movies{" "}
                <span className="text-sm">
                  —{userWatchlist?.movieIds.length}
                </span>
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
          {isLoading && (
            <div className="my-10 flex items-center justify-center">
              <Spinner dimensions="w-12 h-12" />
            </div>
          )}
          {!isLoading &&
            movieTVToggle === "movies" &&
            !userWatchlist?.movieIds.length && (
              <p>You haven&apos;t added any movies to your Watchlist.</p>
            )}
          {!isLoading &&
            movieTVToggle === "movies" &&
            userWatchlist?.movieIds.length && (
              <ul className="space-y-5">
                {movies
                  .slice()
                  .reverse()
                  .map(movie => (
                    <li key={movie.id} className="relative flex h-56">
                      <p>
                        <PlusCircleIcon
                          className="absolute top-0 z-10 h-9 w-9 text-yellow-400 hover:cursor-pointer"
                          onClick={() => handleDeleteMovie(movie)}
                        />
                      </p>
                      <Link href={`/movies/${movie.id}`}>
                        {movie.posterPathMedium ? (
                          <Image
                            src={movie.posterPathMedium}
                            alt={`${movie.title} poster`}
                            width="150"
                            height="224"
                            className="h-56 w-56 rounded-l lg:h-full lg:w-full"
                          />
                        ) : (
                          <ImagePlaceholderMovie
                            dimensions="w-[133px] h-[224px] sm:w-[168px] lg:w-[142px]"
                            rounded="rounded-l"
                          />
                        )}
                      </Link>
                      <div className="w-full rounded-r bg-neutral-700 px-6 py-4 lg:h-56">
                        <p className="line-clamp-1 text-lg font-semibold">
                          <Link
                            href={`/movies/${movie.id}`}
                            className="hover:underline"
                          >
                            {movie.title}
                          </Link>{" "}
                          <span>({movie.releaseDate.slice(-4)})</span>
                        </p>
                        <div className="mb-2.5 hidden gap-1 lg:flex">
                          <p className="text-sm">{movie.runtime}</p>
                          <p className="text-sm text-neutral-400">|</p>
                          <p className="text-sm">
                            {movie.genres.map(genre => genre.name).join(", ")}
                          </p>
                        </div>
                        <p
                          className="mb-2.5 flex max-w-min items-center gap-0.5 rounded pr-2 transition duration-300 hover:cursor-pointer hover:bg-neutral-600"
                          onClick={() => {
                            setSelectedMovie(movie);
                            setIsOpen(true);
                          }}
                        >
                          <span>
                            <SparklesIcon className="-mr-1 h-9 w-9 rounded p-2 transition duration-300 hover:cursor-pointer hover:bg-neutral-600 hover:text-yellow-400" />
                          </span>
                        </p>
                        <div className="mb-1.5 hidden gap-1 lg:flex">
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
                        <p className="line-clamp-4 lg:line-clamp-2">
                          {movie.overview}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          {/* {!isLoading && movieTVToggle === "tv" && (
          <p>You haven&apos;t added any TV shows to your Watchlist.</p>
        )} */}
          {selectedMovie && (
            <RatingModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              movie={selectedMovie}
            />
          )}
        </section>
      )}
    </main>
  );
}

export default UserWatchlistPage;
