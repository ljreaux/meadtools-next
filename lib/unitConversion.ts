export const toBrix = (value: number) => {
  return -668.962 + 1262.45 * value - 776.43 * value ** 2 + 182.94 * value ** 3;
};

export const toSG = (gravityReading: number) => {
  return (
    1.00001 +
    0.0038661 * gravityReading +
    1.3488 * 10 ** -5 * gravityReading ** 2 +
    4.3074 * 10 ** -8 * gravityReading ** 3
  );
};

export function temperatureCorrection(
  sg: number,
  curTemp: number,
  calTemp: number
) {
  const tempCorrect =
    sg *
    ((1.00130346 -
      0.000134722124 * curTemp +
      0.00000204052596 * curTemp ** 2 -
      0.00000000232820948 * curTemp ** 3) /
      (1.00130346 -
        0.000134722124 * calTemp +
        0.00000204052596 * calTemp ** 2 -
        0.00000000232820948 * calTemp ** 3));
  return tempCorrect;
}
export function toFahrenheit(currentTemp: number) {
  return currentTemp * (9 / 5) + 32;
}

export default function refracCalc(ogBr: number, fgBr: number, corFac: number) {
  return -0.002349 * (ogBr / corFac) + 0.006276 * (fgBr / corFac) + 1;
}
