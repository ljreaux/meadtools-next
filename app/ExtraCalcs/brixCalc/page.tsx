"use client";
import { useEffect, useState } from "react";
import { toBrix, toSG } from "@/lib/unitConversion";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

export default function Brix() {
  const { t } = useTranslation();

  const [gravity, setGravity] = useState(1);
  const [gravityUnits, setGravityUnits] = useState<"SG" | "Brix">("SG");

  useEffect(() => {
    gravityUnits === "Brix"
      ? setGravity(Math.round(toBrix(gravity) * 100) / 100)
      : setGravity(Math.round(toSG(gravity) * 1000) / 1000);
  }, [gravityUnits]);

  const displayString =
    gravityUnits === "SG"
      ? `${Math.round(toBrix(gravity) * 100) / 100} ${t("BRIX")}`
      : Math.round(toSG(gravity) * 1000) / 1000;

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-8 my-8 rounded-xl bg-background ">
      <h1 className="text-3xl">{t("brixHeading")}</h1>
      <label className="mx-2 my-2 text-center" htmlFor="gravity">
        {t("gravityLabel")}
      </label>
      <Input
        className="max-w-96"
        type="number"
        id="gravity"
        value={gravity}
        onChange={(e) => setGravity(Number(e.target.value))}
        onFocus={(e) => e.target.select()}
      />
      <p>{gravityUnits === "Brix" ? t(gravityUnits.toUpperCase()) : null}</p>
      <Select
        name="units"
        value={gravityUnits}
        onValueChange={(val: "SG" | "Brix") => setGravityUnits(val)}
      >
        <SelectTrigger className="max-w-96">
          <SelectValue placeholder={t("SG")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="SG">{t("SG")}</SelectItem>
          <SelectItem value="Brix">{t("BRIX")}</SelectItem>
        </SelectContent>
      </Select>
      <p>{displayString}</p>
    </div>
  );
}
