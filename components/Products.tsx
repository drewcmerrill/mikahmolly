"use client";

import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
// import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";

const Products = () => {
  return (
    <a href="/checkout">
      <div className="flex justify-center mb-10">
        <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <Image
            src={`/logo.png`}
            alt="twinners"
            height="400"
            width="400"
            className="object-contain"
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            12 Week Hybrid Workout Program
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            This 12 week Hybrid Program is the perfect workout plan whether
            you&apos;re a beginner or a professional athlete. This program is
            intended to make you harder, faster, and stronger.
          </p>
          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <span>Buy now </span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              $9.95
            </span>
          </button>
        </BackgroundGradient>
      </div>
    </a>
  );
};

export default Products;
