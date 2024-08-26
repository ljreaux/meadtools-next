import { useEffect, useState } from "react";

export const useMetric = () => {
  const [isMetric, setIsMetric] = useState(false);

  useEffect(() => {
    const storedMetric = localStorage.getItem("isMetric");
    if (storedMetric !== null) {
      setIsMetric(!!JSON.parse(storedMetric));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isMetric", JSON.stringify(isMetric));
  }, [isMetric]);

  return {
    isMetric,
    toggleMetric: () => setIsMetric(!isMetric),
  };
};
