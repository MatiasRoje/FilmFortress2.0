import { ReactNode } from "react";

type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-main-500 text-white px-4 py-2 rounded hover:bg-main-600"
    >
      {children}
    </button>
  );
}

export default Button;
