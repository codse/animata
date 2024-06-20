import React from "react";
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface ISocialMediaProps {
  icon: React.ElementType;
  color: string;
  url: string;
}

export interface SocialMediaIconListProps {
  size?: number;
  className?: string;
}

const socialMediaList: ISocialMediaProps[] = [
  {
    icon: Twitter,
    color: "hover:fill-[#1DA1F2]",
    url: "https://www.twitter.com/",
  },
  {
    icon: Facebook,
    color: "hover:fill-[#1877F2]",
    url: "https://www.facebook.com/",
  },
  {
    icon: Instagram,
    color: "hover:fill-[#DD2A7B]",
    url: "https://www.instagram.com/",
  },
  {
    icon: Linkedin,
    color: "hover:fill-[#0077B5]",
    url: "https://www.linkedin.com/",
  },
  {
    icon: Github,
    color: "hover:fill-[#8D8888]",
    url: "https://www.github.com/",
  },
];

const SocialMediaIconList: React.FC<SocialMediaIconListProps> = ({
  size = 24,
  className,
}) => {
  return (
    <div className={cn("flex min-h-20 items-center justify-center", className)}>
      {socialMediaList.map((config, index) => {
        const Icon = config.icon;
        return (
          <div key={index} className="mx-2">
            <a href={config.url} target="_blank" rel="noopener noreferrer">
              <span className="flex h-10 w-10 items-center justify-center rounded-md text-gray-700 transition-colors duration-300 hover:text-white hover:shadow-lg">
                <Icon
                  size={size}
                  className={cn("text-current", config.color)}
                />
              </span>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaIconList;
