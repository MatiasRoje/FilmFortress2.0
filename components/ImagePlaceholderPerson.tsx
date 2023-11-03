import { UserIcon } from "@heroicons/react/24/solid";

type ImagePlaceholderPersonProps = {
  dimensions: string;
  rounded?: string;
};

function ImagePlaceholderPerson({
  dimensions,
  rounded = "rounded",
}: ImagePlaceholderPersonProps) {
  return (
    <div
      className={`flex items-center justify-center bg-neutral-700 shadow ${rounded}`}
    >
      <UserIcon className={`p-3 text-neutral-400/80 ${dimensions}`} />
    </div>
  );
}

export default ImagePlaceholderPerson;
