import { UserIcon } from "@heroicons/react/24/solid";

type ImagePlaceholderPersonProps = {
  dimensions: string;
};

function ImagePlaceholderPerson({ dimensions }: ImagePlaceholderPersonProps) {
  return (
    <div className="flex items-center justify-center rounded bg-neutral-500">
      <UserIcon className={`${dimensions} p-3 text-neutral-100`} />
    </div>
  );
}

export default ImagePlaceholderPerson;
