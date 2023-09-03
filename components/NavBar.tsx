import Image from "next/image";
import Link from "next/link";

function NavBar() {
  return (
    <nav>
      <ul className="flex gap-3 items-center">
        <li>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width="64" height="64"></Image>
          </Link>
        </li>
        <li className="ml-2">
          <Link href="/">Movies</Link>
        </li>
        <li>
          <Link href="/">TV Shows</Link>
        </li>
        <li className="ml-auto">
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
