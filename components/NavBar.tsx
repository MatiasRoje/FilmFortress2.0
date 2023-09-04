import Image from "next/image";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="border-b p-4">
      <ul className="flex gap-3 items-center">
        <li>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width="64" height="64"></Image>
          </Link>
        </li>
        <li className="ml-2 px-3 py-1 rounded hover:bg-main-500">
          <Link href="/">Movies</Link>
        </li>
        <li className="ml-2 px-3 py-1 rounded hover:bg-main-500">
          <Link href="/">TV Shows</Link>
        </li>
        <li className="ml-auto px-3 py-1 rounded hover:bg-main-500">
          <Link href="/">+Watchlist</Link>
        </li>
        <li className="ml-2 px-3 py-1 rounded hover:bg-main-500">
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
