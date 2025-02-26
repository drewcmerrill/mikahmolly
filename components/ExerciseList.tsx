"use client";

import React, { useState } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { AiOutlineDown } from "react-icons/ai";

const ExerciseList = ({
  videos,
}: {
  videos: {
    title: string;
    id: string;
  }[];
}) => {
  // State to track which sections are open
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Function to toggle sections
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section], // Toggle only the clicked section
    }));
  };

  return (
    <div className="flex flex-col gap-6 w-[90%] max-w-[700px] mx-auto my-24">
      {videos.map((video) => (
        <AccordionItem
          key={video.title}
          title={video.title}
          isOpen={openSections[video.title] || false}
          onClick={() => toggleSection(video.title)}
        >
          <div className="w-full">
            <BackgroundGradient className="rounded-[22px] bg-white dark:bg-zinc-900">
              <iframe
                className="w-full aspect-video rounded-[22px]"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={`${video.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </BackgroundGradient>
          </div>
        </AccordionItem>
      ))}
    </div>
  );
};

// AccordionItem Component
const AccordionItem = ({
  title,
  isOpen,
  onClick,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <div className="w-full border-b border-white">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 text-left dark:bg-zinc-800 rounded-md"
    >
      <span className="text-lg font-semibold">{title}</span>
      <AiOutlineDown
        className={`w-5 h-5 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    {isOpen && <div className="p-4">{children}</div>}
  </div>
);

export default ExerciseList;
