import ExerciseList from "@/components/ExerciseList";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems, Videos } from "@/data";
import React from "react";

const page = () => {
  return (
    <div>
      <FloatingNav navItems={navItems} />

      <ExerciseList videos={Videos} />
    </div>
  );
};

export default page;
