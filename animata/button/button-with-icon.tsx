import { ArrowTopRightIcon } from "@radix-ui/react-icons";

interface ButtonTitleProps {
  /**
   * Button title
   */
  text: string;
}
export default function ButtonWithIcon({
  text = "Instagram",
}: ButtonTitleProps) {
  return (
    <div className="group flex items-center justify-center gap-1 bg-blue-600 px-10 py-2 text-lg text-white duration-300 hover:cursor-pointer hover:text-yellow-300">
      <span>{text}</span>
      <ArrowTopRightIcon
        height={20}
        width={20}
        className="duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-yellow-300"
      />
    </div>
  );
}
