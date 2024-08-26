"use client";
import { useState } from "react";
import useAbv from "../../../hooks/useAbv";
import { toBrix } from "@/lib/unitConversion";
import AbvLine from "@/components/AbvLine";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

function estimateOG(hydrometerFG: number, refractometerFG: number) {
  return -1.728 * hydrometerFG + 0.01085 * refractometerFG + 2.728;
}

export default function EstimatedOG() {
  const { t } = useTranslation();
  const [{ fgh, fgr }, setGravity] = useState({
    fgh: 1.0,
    fgr: 5,
  });

  const estOG = Math.round(estimateOG(fgh, fgr) * 1000) / 1000;
  const abv = useAbv({ OG: estOG, FG: fgh });
  return (
    <div className="flex flex-col items-center justify-center p-8 my-40 sm:my-8 rounded-xl bg-background">
      <h1 className="text-3xl">{t("ogHeading")} </h1>
      <label className="mx-2 my-2 text-center" htmlFor="hydrometerFG">
        {t("hydrometerFG")}{" "}
      </label>
      <Input
        value={fgh}
        onChange={(e) =>
          setGravity((prev) => ({ ...prev, fgh: Number(e.target.value) }))
        }
        type="number"
        id="hydrometerFG"
        className="max-w-96"
        onFocus={(e) => e.target.select()}
      />
      <label className="mx-2 my-2 text-center" htmlFor="refractometerFG">
        {t("refractometerFG")}{" "}
      </label>
      <Input
        value={fgr}
        onChange={(e) =>
          setGravity((prev) => ({ ...prev, fgr: Number(e.target.value) }))
        }
        type="number"
        id="refractometerFG"
        className="max-w-96"
        onFocus={(e) => e.target.select()}
      />
      <div className="flex gap-2 mt-8 text-lg text-center sm:text-2xl">
        <p>
          {t("estimatedOG")} {estOG}
        </p>
        <p>
          {Math.round(toBrix(estOG) * 100) / 100} {t("BRIX")}
        </p>
      </div>
      <AbvLine {...abv} textSize="text-lg" />
    </div>
  );
}
