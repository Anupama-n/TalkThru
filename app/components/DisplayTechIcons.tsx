import React from 'react';
import { getTechLogos } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";

type TechIconProps = {
    techStack: string[];
};

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
    const techIcons = await getTechLogos(techStack);

    return (
        <div className="flex flex-row gap-2">
            {techIcons.slice(0, 3).map(({ tech, url }, index) => (
                <div
                    key={tech}
                    className={cn(
                        "relative group bg-dark-300 rounded-full p-2 flex items-center justify-center",
                        index >= 1 && "-ml-3"
                    )}
                >
          <span className="tech-tooltip absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
            {tech}
          </span>
                    <Image
                        src={url}
                        alt={tech}
                        width={100}
                        height={100}
                        className="size-5"
                    />
                </div>
            ))}
        </div>
    );
};

export default DisplayTechIcons;
