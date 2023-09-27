import { ReactNode } from "react";

type ButtonProps = {
  paddingX?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

function Button({ onClick, children, paddingX = "px-4" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-main-500 text-white ${paddingX} rounded py-2 transition duration-300 hover:bg-main-600`}
    >
      {children}
    </button>
  );
}

export default Button;
