import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

function Button({ children }: ButtonProps) {
  return (
    <button className="bg-main-500 text-white px-4 py-2 rounded hover:bg-main-600">
      {children}
    </button>
  );
}

export default Button;
