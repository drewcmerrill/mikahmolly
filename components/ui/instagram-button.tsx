import React, { SVGProps } from "react";

/**
 *  UI: border magic from tailwind css btns
 *  Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 *  change border radius to rounded-lg
 *  add margin of md:mt-10
 *  remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
 */
const InstagramButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses = "",
}: {
  title: string;
  icon?: React.ReactNode;
  position?: "left" | "right";
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <a href="https://www.instagram.com/mikahmolly/" target="_blank">
      <button
        className={`p-[3px] relative flex items-center whitespace-nowrap ${otherClasses}`}
        onClick={handleClick}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center">
          {position === "left" && icon && <span className="mr-2">{icon}</span>}
          {title}
          {position === "right" && icon && <span className="ml-2">{icon}</span>}
        </div>
      </button>
    </a>
  );
};

export const Icon = ({ className, ...rest }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default InstagramButton;
