import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Button from "./Button";

function Footer() {
  return (
    <footer className="flex flex-col gap-3 justify-center items-center align-middle border-t p-4">
      <Button>
        <Link href="/login">Join the community</Link>
      </Button>
      <ul className="flex gap-3">
        <li>
          <Link
            href="/"
            className="flex items-center justify-center p-3 rounded-full hover:bg-neutral-700"
          >
            <FontAwesomeIcon icon={faInstagram} style={{ fontSize: 22 }} />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center justify-center p-3 rounded-full hover:bg-neutral-700"
          >
            <FontAwesomeIcon icon={faYoutube} style={{ fontSize: 22 }} />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center justify-center p-3 rounded-full hover:bg-neutral-700"
          >
            <FontAwesomeIcon icon={faFacebook} style={{ fontSize: 22 }} />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center justify-center p-3 rounded-full hover:bg-neutral-700"
          >
            <FontAwesomeIcon icon={faTwitter} style={{ fontSize: 22 }} />
          </Link>
        </li>
      </ul>
      <p className="text-xs">
        © 2023 by{" "}
        <a
          href="https://github.com/MatiasRoje"
          target="_blank"
          className="hover:underline"
        >
          Matias Roje
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
