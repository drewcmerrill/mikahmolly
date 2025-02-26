"use client";

import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";

const ExerciseList = ({
  videos,
}: {
  videos: {
    title: string;
    id: string;
  }[];
}) => {
  return (
    <div className="flex flex-col gap-24 my-24 ">
      {videos.map((video, idx) => (
        <div key={video.title} className="flex flex-col items-center">
          <p className=" text-3xl lg:text-5xl mb-5">{video.title}</p>
          <div className="w-[90vw] max-w-[700px] mx-5">
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
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
