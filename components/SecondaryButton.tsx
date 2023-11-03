import { ReactNode } from "react";

type SecondaryButtonProps = {
  paddingX?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

function SecondaryButton({
  onClick,
  children,
  paddingX = "px-4",
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 rounded bg-neutral-600 ${paddingX} py-2 transition duration-300 hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none focus:outline focus:outline-offset-2 focus:outline-neutral-500`}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
