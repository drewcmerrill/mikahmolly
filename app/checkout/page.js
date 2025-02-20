import React from "react";
import Checkout from "@/components/Checkout";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const page = () => {
  return (
    <div>
      <FloatingNav navItems={navItems} />

      <div className="p-10 flex justify-center">
        <Checkout />
      </div>
    </div>
  );
};

export default page;
