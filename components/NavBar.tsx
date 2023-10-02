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
        <li className="ml-2 rounded px-3 py-1 hover:bg-neutral-700">
          <Link href="/movies">Movies</Link>
        </li>
        <li className="ml-2 rounded px-3 py-1 hover:bg-neutral-700">
          <Link href="/">TV Shows</Link>
        </li>
        <SearchBar />
        <NavBarUserSection />
      </ul>
    </nav>
  );
}

export default NavBar;
