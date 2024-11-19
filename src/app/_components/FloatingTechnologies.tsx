"use client";
import Image from "next/image";
import { technologies } from "../_static-data/constants";

const FloatingTechnologies: React.FC = () => {
  const positions = [
    { top: "10%", left: "5%" },
    { top: "15%", left: "25%" },
    { top: "30%", left: "10%" },
    { top: "30%", left: "60%" },
    { top: "60%", left: "5%" },
    { top: "70%", left: "45%" },
    { top: "80%", left: "20%" },
    { top: "10%", left: "75%" },
    { top: "25%", left: "90%" },
    { top: "55%", left: "55%" },
    { top: "45%", left: "20%" },
    { top: "85%", left: "60%" },
    { top: "80%", left: "85%" },
    { top: "35%", left: "40%" },
    { top: "50%", left: "80%" },
  ];

  return (
    <div className="relative w-full h-[400px] overflow-hidden mb-10">
      {technologies.map((tech, index) => (
        <div
          key={tech.id}
          className="absolute p-2"
          style={{
            top: positions[index]?.top,
            left: positions[index]?.left,
            animation: `float-${index} 4s ease-in-out infinite alternate`,
          }}
        >
          <Image
            src={tech.src}
            quality={30}
            height={tech.big ? 70 : 50}
            width={tech.big ? 70 : 50}
            alt={tech.alt}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingTechnologies;
