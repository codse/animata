import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export default function ButtonWithIcon({
  text = "Instagram",
}: {
  text?: string;
}) {
  return (
    <div className="group flex h-12 w-40 items-center justify-center gap-1 bg-blue-600 text-lg text-white duration-300 hover:cursor-pointer hover:text-yellow-300">
      <span>{text}</span>
      <ArrowTopRightIcon
        height={20}
        width={20}
        className="duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-yellow-300"
      />
    </div>
  );
}
