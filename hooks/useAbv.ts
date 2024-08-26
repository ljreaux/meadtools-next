import { useState, useEffect } from "react";
import { toBrix } from "@/lib/unitConversion";

interface TAbvObj {
  OG: number;
  FG: number;
  vol?: number;
  units?: string;
}

export const calcAbv = (OG: number, FG: number) => {
  const OE = -668.962 + 1262.45 * OG - 776.43 * OG ** 2 + 182.94 * OG ** 3;
  const AE = -668.962 + 1262.45 * FG - 776.43 * FG ** 2 + 182.94 * FG ** 3;
  const q = 0.22 + 0.001 * OE;
  const RE = (q * OE + AE) / (1 + q);
  const ABW = (OE - RE) / (2.0665 - 0.010665 * OE);
  const ABV = ABW * (FG / 0.794);

  const delle = toBrix(FG) + 4.5 * ABV;
  return { ABV, delle };
}


export default function useAbv(obj: TAbvObj) {
  const [abv, setAbv] = useState<{ ABV: number; delle: number }>({
    ABV: 0,
    delle: 0,
  });
  const { OG, FG } = obj;

  useEffect(() => {
    const abv = calcAbv(OG, FG);
    setAbv(abv);
  }, [OG, FG]);

  return abv;
}
