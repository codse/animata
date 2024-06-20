import React, { useState } from "react";
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react";

interface ISocialMediaProps {
  mediaName: string;
  icon: React.FC<{ size?: number; fill?: string }>;
  color: string;
  url: string;
}

export interface SocialMediaIconListProps {
  size?: number;
}

const colorCodes = {
  twitter: "#1DA1F2",
  facebook: "#1877F2",
  instagram: "#E4405F",
  linkedin: "#0A66C2",
  github: "#171515",
};

const socialMediaList: ISocialMediaProps[] = [
  {
    mediaName: "Twitter",
    icon: ({ size, fill }) => (
      <Twitter size={size || 24} fill={fill || "currentColor"} />
    ),
    color: colorCodes.twitter,
    url: "https://www.twitter.com/",
  },
  {
    mediaName: "Facebook",
    icon: ({ size, fill }) => (
      <Facebook size={size || 24} fill={fill || "currentColor"} />
    ),
    color: colorCodes.facebook,
    url: "https://www.facebook.com/",
  },
  {
    mediaName: "Instagram",
    icon: ({ size, fill }) => (
      <Instagram size={size || 24} fill={fill || "currentColor"} />
    ),
    color: colorCodes.instagram,
    url: "https://www.instagram.com/",
  },
  {
    mediaName: "LinkedIn",
    icon: ({ size, fill }) => (
      <Linkedin size={size || 24} fill={fill || "currentColor"} />
    ),
    color: colorCodes.linkedin,
    url: "https://www.linkedin.com/",
  },
  {
    mediaName: "Github",
    icon: ({ size, fill }) => (
      <Github size={size || 24} fill={fill || "currentColor"} />
    ),
    color: colorCodes.github,
    url: "https://www.github.com/",
  },
];

const SocialMediaIconList: React.FC<SocialMediaIconListProps> = ({
  size = 24,
}) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <div className="flex min-h-20 items-center justify-center">
      {socialMediaList.map((config, index) => {
        const Icon = config.icon;
        return (
          <div key={index} className="mx-2">
            <a href={config.url} target="_blank" rel="noopener noreferrer">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-md text-white hover:shadow-lg"
                onMouseEnter={() => setHoveredIcon(config.mediaName)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Icon
                  size={size}
                  fill={
                    hoveredIcon === config.mediaName
                      ? config.color
                      : "currentColor"
                  }
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
