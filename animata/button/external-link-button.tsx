import { ArrowTopRightIcon } from "@radix-ui/react-icons";

interface ButtonTitleProps {
  /**
   * Button title
   */
  text: string;
}

export default function ExternalLinkButton({ text = "Open Link" }: ButtonTitleProps) {
  return (
    <button className="text-md group/link flex items-center justify-center gap-1 rounded-md bg-pink-600 px-6 py-3 text-white hover:cursor-pointer hover:text-yellow-300">
      <span>{text}</span>
      <ArrowTopRightIcon
        height={20}
        width={20}
        className="opacity-75 transition-all group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:scale-110 group-hover/link:text-yellow-300 group-hover/link:opacity-100"
      />
    </button>
  );
}
