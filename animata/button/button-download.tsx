import { ArrowRight } from "lucide-react";

export default function ButtonDownload() {
  return (
    <button
      className={`group my-2 flex items-center border-2 border-blue-950 bg-blue-950 px-6 py-3 text-white duration-300 hover:border-blue-900 hover:bg-blue-900`}
    >
      <a href="#" className="flex items-center gap-2" download>
        Download
        <ArrowRight className="duration-300 group-hover:rotate-90" />
      </a>
    </button>
  );
}
