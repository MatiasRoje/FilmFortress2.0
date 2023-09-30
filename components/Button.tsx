import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  paddingX?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  href?: string;
};

function Button({ onClick, children, paddingX = "px-4", href }: ButtonProps) {
  if (onClick)
    return (
      <button
        onClick={onClick}
        className={`bg-main-500 text-main-50 ${paddingX} rounded py-2 outline-none transition-colors duration-300 hover:bg-main-600 focus:outline-none focus:ring focus:ring-main-400 focus:ring-offset-2`}
      >
        {children}
      </button>
    );

  if (href)
    return (
      <Link
        href={href}
        className={`bg-main-500 text-main-50 ${paddingX} rounded py-2 outline-none transition-colors duration-300 hover:bg-main-600 focus:bg-main-600 focus:outline-none focus:ring focus:ring-main-400 focus:ring-offset-2`}
      >
        {children}
      </Link>
    );
}

export default Button;
