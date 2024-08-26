"use client";
import { toBrix } from "@/lib/unitConversion";
import { Fragment, useState } from "react";
import useAbv from "@/hooks/useAbv";
import AbvLine from "@/components/AbvLine";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

export default function AbvCalculator() {
  const { t } = useTranslation();

  const [inputValues, setInputValues] = useState([1.105, 1]);
  const abv = useAbv({ OG: inputValues[0], FG: inputValues[1] });
  const inputArr = [t("OG"), t("FG")];

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 md:px-12 p-8 my-8 rounded-xl bg-background items-center justify-center">
      <h1 className="col-span-3 text-3xl">{t("abvHeading")} </h1>
      {inputArr.map((item, index) => {
        const brix = toBrix(inputValues[index]);
        return (
          <Fragment key={index}>
            <label htmlFor={item}>{t(`${item.toLowerCase()}Label`)}</label>
            <Input
              type="number"
              id={item}
              step="0.001"
              value={inputValues[index]}
              onChange={(e) => {
                setInputValues(
                  inputValues.map((value, i) =>
                    index === i ? Number(e.target.value) : value
                  )
                );
              }}
              onFocus={(e) => e.target.select()}
            />
            <p>
              {Math.round(brix * 100) / 100} {t("BRIX")}
            </p>
          </Fragment>
        );
      })}
      <div className="flex items-center justify-center col-span-3">
        <AbvLine {...abv} />
      </div>
    </div>
  );
}
