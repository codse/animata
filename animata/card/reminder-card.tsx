import { ChevronRight, Clock } from "lucide-react";

export default function ReminderCard() {
  return (
    <div className="group flex min-h-32 flex-col justify-center rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-500 hover:shadow-xl">
      <div className="relative flex-1 overflow-hidden py-12">
        <div className="text-md mx-8 flex items-center gap-1 rounded-xl bg-blue-100 px-3 py-1 tracking-tight text-blue-600">
          <Clock className="inline-block h-4 w-4" />
          <span className="">Tomorrow at 10:00 AM</span>
          <ChevronRight className="ease-slow inline-block h-4 w-4 transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110" />
        </div>
      </div>
      <h4 className="text-lg font-semibold text-gray-800">
        Meeting with John Doe
      </h4>
      <p className="text-md text-gray-500">Discuss about the project</p>
    </div>
  );
}
