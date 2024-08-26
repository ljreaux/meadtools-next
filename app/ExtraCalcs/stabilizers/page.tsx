import Sorbate from "@/components/Sorbate";
import Sulfite from "@/components/Sulfite";
import React from "react";

function StabilizerCalc() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-background p-8 gap-6">
      {" "}
      <Sorbate />
      <Sulfite />
    </div>
  );
}

export default StabilizerCalc;
