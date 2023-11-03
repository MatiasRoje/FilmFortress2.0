import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import NavBarUserSection from "./NavBarUserSection";

function NavBar() {
  return (
    <nav className="border-b p-4">
      <ul className="flex items-center gap-3">
        <li>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width="64" height="64"></Image>
          </Link>
        </li>
        <li>
          <Link
            href="/movies?popular&language=en-US&page=1"
            className="ml-2 rounded px-3 py-1 hover:cursor-pointer hover:bg-neutral-700"
          >
            Movies
          </Link>
        </li>
        {/* <li>
          <Link
            href="/"
            className="ml-2 rounded px-3 py-1 hover:cursor-pointer hover:bg-neutral-700"
          >
            TV Shows
          </Link>
        </li> */}
        <SearchBar />
        <NavBarUserSection />
      </ul>
    </nav>
  );
}

export default NavBar;
