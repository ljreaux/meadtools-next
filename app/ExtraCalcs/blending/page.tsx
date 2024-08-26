"use client";
import { useState, FormEvent } from "react";
import useBlend from "@/hooks/useBlend";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@/components/ui/table";

export default function BlendingCalc() {
  const { t } = useTranslation();

  const [{ valueOne, valueTwo, volumeOne, volumeTwo }, setInputValues] =
    useState({
      valueOne: 0,
      valueTwo: 0,
      volumeOne: 0,
      volumeTwo: 0,
    });

  function handleChange(e: FormEvent<EventTarget>) {
    const target = e.target as HTMLInputElement;
    const key = target.id;
    setInputValues((prev) => ({
      ...prev,
      [key]: Number(target.value),
    }));
  }

  const { blendedValue, totalVolume } = useBlend([
    [valueOne, volumeOne],
    [valueTwo, volumeTwo],
  ]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-background">
      <h1 className="text-3xl">{t("blendingHeading")}</h1>
      <Table>
        <TableBody>
          <TableRow>
            <TableHead className="p-1 sm:p-4">{t("valOne")}</TableHead>
            <TableCell className="p-1 sm:p-4">
              <Input
                type="number"
                id="valueOne"
                value={valueOne}
                onChange={handleChange}
                onFocus={(e) => e.target.select()}
                step={0.001}
              />
            </TableCell>
            <TableHead className="p-1 sm:p-4">{t("volOne")}</TableHead>
            <TableCell className="p-1 sm:p-4">
              <Input
                type="number"
                id="volumeOne"
                value={volumeOne}
                onChange={handleChange}
                onFocus={(e) => e.target.select()}
                step={0.001}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="p-1 sm:p-4">{t("valTwo")}</TableHead>
            <TableCell className="p-1 sm:p-4">
              <Input
                type="number"
                id="valueTwo"
                value={valueTwo}
                onChange={handleChange}
                onFocus={(e) => e.target.select()}
                step={0.001}
              />
            </TableCell>
            <TableCell className="p-1 sm:p-4">{t("volTwo")}</TableCell>
            <TableCell className="p-1 sm:p-4">
              <Input
                type="number"
                id="volumeTwo"
                value={volumeTwo}
                onChange={handleChange}
                onFocus={(e) => e.target.select()}
                step={0.001}
              />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="p-1 sm:p-4">{t("totalVol")}</TableCell>
            <TableCell className="p-1 sm:p-4">
              <Input type="number" disabled value={totalVolume} />
            </TableCell>
            <TableCell className="p-1 sm:p-4">{t("blendedVal")}</TableCell>
            <TableCell className="p-1 sm:p-4">
              <Input
                id="blendedVal"
                type="number"
                disabled
                value={Math.round(blendedValue * 10 ** 4) / 10 ** 4}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
