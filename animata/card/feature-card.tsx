import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FeatureCardProps {
  title?: string;
  placeholder?: string;
  buttonText?: string;
}

export default function FeatureCard({
  title = "Want to read the rest?",
  placeholder = "justin@buttondown.email",
  buttonText = "Subscribe for $5/mo",
}: FeatureCardProps) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div
      className={`mx-auto flex w-full max-w-lg ${isButtonHovered ? "skew-x-0 skew-y-0" : "-skew-x-3 skew-y-2"} flex-col gap-2 rounded-lg bg-white py-6 transition-transform duration-300`}
    >
      <h3 className="px-8 font-sans font-bold text-black">{title}</h3>
      <div className="flex flex-col gap-2 px-4">
        <Input placeholder={placeholder} className="rounded-none bg-gray-100" />
        <Button
          className="relative cursor-pointer bg-gray-500 text-white transition-all duration-300 hover:bg-green-600"
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          <Check className="absolute left-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <p className="pl-4 hover:font-bold">{buttonText}</p>
        </Button>
      </div>
    </div>
  );
}
