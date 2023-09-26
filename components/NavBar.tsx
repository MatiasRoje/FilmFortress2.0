import Image from "next/image";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import SearchBar from "./SearchBar";
import NavBarUserSection from "./NavBarUserSection";

function NavBar() {
  return (
    <nav className="border-b p-4">
      <ul className="flex gap-3 items-center">
        <li>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width="64" height="64"></Image>
          </Link>
        </li>
        <li className="ml-2 px-3 py-1 rounded hover:bg-neutral-700">
          <Link href="/movies">Movies</Link>
        </li>
        <li className="ml-2 px-3 py-1 rounded hover:bg-neutral-700">
          <Link href="/">TV Shows</Link>
        </li>
        <SearchBar />
        <li className="ml-auto px-3 py-1 rounded hover:bg-neutral-700">
          <Link href="/">
            <div className="flex gap-1">
              <span>
                <PlusCircleIcon className="w-6 h-6" />
              </span>
              Watchlist
            </div>
          </Link>
        </li>
        <NavBarUserSection />
      </ul>
    </nav>
  );
}

export default NavBar;
