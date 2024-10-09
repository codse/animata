import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SubscribeCardProps {
  title?: string;
  placeholder?: string;
  buttonText?: string;
}

export default function SubscribeCard({
  title = "Want to read the rest?",
  placeholder = "justin@buttondown.email",
  buttonText = "Subscribe for $5/mo",
}: SubscribeCardProps) {
  return (
    <div className="mx-auto flex w-full max-w-lg -skew-x-3 skew-y-2 flex-col gap-2 rounded-lg bg-white py-6 transition-transform duration-300 hover:skew-x-0 hover:skew-y-0">
      <h3 className="px-8 font-sans font-bold text-black">{title}</h3>
      <div className="flex flex-col gap-2 px-4">
        <Input placeholder={placeholder} className="rounded-none bg-gray-100" />
        <Button
          className="group relative cursor-pointer bg-gray-500 text-white transition-all duration-300 hover:bg-green-600"
          aria-label={buttonText}
        >
          <Check className="absolute left-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <p className="pl-4 hover:font-bold">{buttonText}</p>
        </Button>
      </div>
    </div>
  );
}
