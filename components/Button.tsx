import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  paddingX?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  href?: string;
};

function Button({ onClick, children, paddingX = "px-4", href }: ButtonProps) {
  if (href)
    return (
      <Link
        href={href}
        className={`bg-main-500 text-main-50 ${paddingX} rounded py-2 outline-none transition-colors duration-300 hover:bg-main-600 focus:bg-main-600 focus:outline-none focus:outline focus:outline-offset-1 focus:outline-main-500`}
      >
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className={`bg-main-500 text-main-50 ${paddingX} rounded py-2 outline-none transition-colors duration-300 hover:bg-main-600 focus:bg-main-600 focus:outline-none focus:outline focus:outline-offset-1 focus:outline-main-500`}
    >
      {children}
    </button>
  );
}

export default Button;
