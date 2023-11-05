import Link from "next/link";

const QUOTES = [
  {
    quote: "The first rule of 404 Club is: You do not find 404.",
    character: "Tyler Durden",
    movie: "Fight Club (1999)",
    movieId: 550,
  },
  {
    quote: "To 404 and beyond!",
    character: "Buzz Lightyear",
    movie: "Toy Story (1995)",
    movieId: 862,
  },
  {
    quote: "Why so 404-ious?",
    character: "Joker",
    movie: "The Dark Knight (2008)",
    movieId: 155,
  },
  {
    quote: "404: I'll be back... with the page you're looking for.",
    character: "The Terminator",
    movie: "The Terminator (1984)",
    movieId: 218,
  },
  {
    quote: "404 is inevitable.",
    movie: "Avengers: Endgame (2019)",
    character: "Thanos",
    movieId: 299534,
  },
];

function NotFoundPage() {
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <div className="mx-auto my-10 flex flex-col gap-5">
      <h2 className="text-4xl font-bold">{randomQuote.quote}</h2>
      <div className="flex justify-end gap-1">
        <p className="italic">{randomQuote.character},</p>
        <Link
          href={`/movies/${randomQuote.movieId}`}
          className="flex not-italic hover:underline"
        >
          <p>{randomQuote.movie}</p>
        </Link>
      </div>

      <p className="mt-16">
        The requested page was not found on our server. Go to the{" "}
        <Link href="/" className="hover:underline">
          <span>homepage</span>
        </Link>
        .
      </p>
    </div>
  );
}

export default NotFoundPage;
