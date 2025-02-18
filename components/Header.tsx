import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="text-white py-4 px-6">
      <nav className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-baseline">
        <Link href="/" className=" text-[3rem] anton">
          MIKAH & MOLLY
        </Link>
        <ul className="flex-col anton text-center text-[1.5rem] lg:text-[2rem] lg:flex lg:flex-row lg:space-x-5">
          <li>
            <Link href="/" className="hover:underline">
              HOME
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              WORKOUT PLAN
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              EXERCISES
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
