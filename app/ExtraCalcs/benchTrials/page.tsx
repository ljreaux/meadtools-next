"use client";
import { useState, FormEvent, useEffect } from "react";
import Trials, { BatchDetails } from "@/components/Trials";
import { useTranslation } from "react-i18next";
import Tooltip from "@/components/Tooltips";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function BenchTrials() {
  const { t } = useTranslation();
  const [batchDetails, setBatchDetails] = useState<BatchDetails>({
    batchSize: 1,
    sampleSize: 50,
    stockSolutionConcentration: 10,
    units: "gallon",
  });
  const [firstMount, setFirstMount] = useState(true);

  function handleBatchDetails(
    e: FormEvent<EventTarget>,
    key: keyof BatchDetails
  ): void {
    const target = e.target as HTMLInputElement;
    const value = key == "units" ? target.value : Number(target.value);
    setBatchDetails({
      ...batchDetails,
      [key]: value,
    });
  }

  useEffect(() => {
    const newBatchSize =
      batchDetails.units === "gallon"
        ? batchDetails.batchSize / 3.785
        : batchDetails.batchSize * 3.785;

    if (!firstMount)
      setBatchDetails((prev) => ({ ...prev, batchSize: newBatchSize }));
    setFirstMount(false);
  }, [batchDetails.units]);

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:my-24 rounded-xl bg-background sm:p-8">
      <span className="flex items-center justify-center gap-2">
        <h1 className="text-3xl">{t("benchTrialsHeading")}</h1>
        <Tooltip
          body={t("tipText.benchTrials.body")}
          links={[
            [
              "https://www.youtube.com/watch?v=AaibXsslBlE&ab_channel=Doin%27theMostBrewing",
              t("tipText.benchTrials.linkTexts.0"),
            ],
            [
              "https://scottlab.com/bench-trial-protocol",
              t("tipText.benchTrials.linkTexts.1"),
            ],
            [
              "https://www.reddit.com/r/mead/wiki/process/bench_trials/",
              t("tipText.benchTrials.linkTexts.2"),
            ],
          ]}
        />
      </span>
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>{t("batchSize")}</TableHead>
            <TableCell>
              <Input
                id="batchSize"
                type="number"
                value={batchDetails.batchSize}
                onChange={(e) => handleBatchDetails(e, "batchSize")}
                onFocus={(e) => e.target.select()}
                step={0.01}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>{t("UNITS")}:</TableHead>
            <TableCell>
              <Select
                name="trialBatchUnits"
                value={batchDetails.units}
                onValueChange={(val: "gallon" | "liter") => {
                  setBatchDetails((prev) => {
                    return { ...prev, units: val };
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gallon">{t("GAL")}</SelectItem>
                  <SelectItem value="liter">{t("LIT")}</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>{t("sampleSize")}</TableHead>
            <TableCell>
              <Input
                id="sampleSize"
                type="number"
                value={batchDetails.sampleSize}
                onChange={(e) => handleBatchDetails(e, "sampleSize")}
                onFocus={(e) => e.target.select()}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>{t("stockSolutionConcentration")}</TableHead>
            <TableCell>
              <Input
                id="concentration"
                type="number"
                value={batchDetails.stockSolutionConcentration}
                onChange={(e) =>
                  handleBatchDetails(e, "stockSolutionConcentration")
                }
                onFocus={(e) => e.target.select()}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Trials batchDetails={batchDetails} />
    </div>
  );
}
