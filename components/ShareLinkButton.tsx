"use client";

import { LinkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ShareLinkButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 rounded bg-neutral-600 px-4 py-2 transition duration-300 hover:bg-neutral-500 focus:outline-none focus:ring focus:ring-neutral-500 focus:ring-offset-2"
    >
      <LinkIcon className="h-4 w-4" />
      {clicked ? "Copied" : "Share"}
    </button>
  );
}
