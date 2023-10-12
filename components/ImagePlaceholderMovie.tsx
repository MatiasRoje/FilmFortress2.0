import { FilmIcon } from "@heroicons/react/24/outline";

type ImagePlaceholderPersonProps = {
  dimensions: string;
  rounded?: string;
};

function ImagePlaceholderMovie({
  dimensions,
  rounded = "rounded",
}: ImagePlaceholderPersonProps) {
  return (
    <div
      className={`relative z-10 flex items-center justify-center bg-neutral-700 shadow ${rounded}`}
    >
      <FilmIcon className={`p-3 text-neutral-400/80 ${dimensions}`} />
    </div>
  );
}

export default ImagePlaceholderMovie;
