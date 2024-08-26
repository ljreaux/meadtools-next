"use client";
import { useState, FormEvent, useEffect } from "react";
import { toBrix, toSG } from "@/lib/unitConversion";
import useAbv from "@/hooks/useAbv";
import refracCalc from "@/lib/unitConversion";
import AbvLine from "@/components/AbvLine";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Refractometer() {
  const { t } = useTranslation();
  const [refrac, setRefrac] = useState({
    cf: 1,
    og: 1.1,
    units: "SG",
    fgInBrix: 8.5,
  });

  const og = refrac.units === "SG" ? refrac.og : toSG(refrac.og);

  const handleChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setRefrac((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const handleUnitChange = (val: string) => {
    setRefrac((prev) => ({ ...prev, units: val }));
  };

  const { cf: corFac, fgInBrix: fgBr } = refrac;

  const actualFg = refracCalc(toBrix(og), fgBr, corFac);
  const abv = useAbv({ OG: og, FG: actualFg });
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-background">
      <h1 className="text-3xl">{t("refractometerHeading")} </h1>
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>{t("correctionFactor")} </TableHead>
            <TableCell colSpan={2}>
              <Input
                type="number"
                name="cf"
                id="cf"
                value={refrac.cf}
                onChange={handleChange}
                onFocus={(e) => e.target.select()}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t("ogLabel")} </TableCell>
            <TableCell className="p-1 md:p-4">
              <Select
                name="units"
                value={refrac.units}
                onValueChange={handleUnitChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SG">{t("SG")}</SelectItem>
                  <SelectItem value="Brix">{t("BRIX")}</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="p-1 md:p-4">
              <Input
                type="number"
                name="og"
                id="og"
                value={refrac.og}
                onChange={handleChange}
                onFocus={(e) => e.target.select()}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t("fgInBrix")} </TableCell>
            <TableCell colSpan={2}>
              <span className="flex justify-between gap-1">
                <Input
                  type="number"
                  name="fgInBrix"
                  id="fg"
                  value={refrac.fgInBrix}
                  onChange={handleChange}
                  onFocus={(e) => e.target.select()}
                  className="w-10/12"
                />
                <span className="text-center">
                  <p>{Math.round(actualFg * 1000) / 1000}</p>
                  <p>
                    {Math.round(toBrix(actualFg) * 100) / 100} {t("BRIX")}
                  </p>
                </span>
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              <span className="flex items-center justify-center text-center">
                <AbvLine {...abv} textSize="text-lg" />
              </span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
