import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import FooterUserSection from "./FooterUserSection";

function Footer() {
  return (
    <footer className="flex h-max flex-col items-center justify-center gap-3 border-t p-4 align-middle">
      <FooterUserSection />
      <ul className="flex gap-3">
        <li>
          <Link
            href="/"
            className="flex items-center justify-center rounded-full p-3 hover:bg-neutral-700"
          >
            <FontAwesomeIcon icon={faInstagram} style={{ fontSize: 20 }} />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center justify-center rounded-full p-3 hover:bg-neutral-700"
          >
            <FontAwesomeIcon icon={faYoutube} style={{ fontSize: 20 }} />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center justify-center rounded-full p-3 hover:bg-neutral-700"
          >
            <FontAwesomeIcon icon={faFacebook} style={{ fontSize: 20 }} />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center justify-center rounded-full p-3 hover:bg-neutral-700"
          >
            <FontAwesomeIcon icon={faTwitter} style={{ fontSize: 20 }} />
          </Link>
        </li>
      </ul>
      <div className="text-center">
        <p className="text-xs">
          Movie data and images courtesy of{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            className="hover:underline"
          >
            TMDB
          </a>
          .
        </p>
        <p className="text-xs">
          © 2023 by{" "}
          <a
            href="https://github.com/MatiasRoje"
            target="_blank"
            className="hover:underline"
          >
            Matías Roje
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
