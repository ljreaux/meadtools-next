import { useEffect, useState } from "react";

// this type is consists of a multidimensional array. The inner arrays contain two numbers, the value and the volume. The outer array can have any number of inner arrays to blend any number of items together.
export type BlendArray = [number, number][];

export default function useBlend(arr: BlendArray) {

  const [blend, setBlend] = useState({
    blendedValue: 0,
    totalVolume: 0,
  });

  useEffect(() => {

    let numerator = 0;
    let denominator = 0;
    for (const [val, vol] of arr) {
      if (vol > 0) numerator = numerator + val * vol;
      denominator += vol;
    }

    setBlend({
      blendedValue: denominator !== 0 ? numerator / denominator : 0,
      totalVolume: denominator,
    });


  }, [arr]);

  return blend;
}
