import React, { useState } from "react";
import SecondaryButton from "./SecondaryButton";
import Link from "next/link";

interface MinMaxInputProps {
  title: string;
  minValue: number;
  maxValue: number;
  queryString: string;
  step?: number;
  minQuery: string;
  maxQuery: string;
  border?: string;
}

const MinMaxInput: React.FC<MinMaxInputProps> = ({
  title,
  minValue,
  maxValue,
  step = 1,
  queryString,
  minQuery,
  maxQuery,
  border = "",
}) => {
  const [min, setMin] = useState<number>(minValue);
  const [max, setMax] = useState<number>(maxValue);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(event.target.value, 10);
    if (!isNaN(newMin) && newMin <= max) {
      setMin(newMin);
    }
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(event.target.value, 10);
    if (!isNaN(newMax) && newMax >= min) {
      setMax(newMax);
    }
  };

  return (
    <form className="space-y-2 rounded bg-neutral-700 px-4 py-5">
      <h3>{title}</h3>
      <div className={`flex items-center justify-between gap-3 ${border}`}>
        <div className="flex flex-col gap-2">
          <div className="space-x-2">
            <label className="text-sm">From</label>
            <input
              type="number"
              className="rounded border-none p-1 text-sm text-neutral-800 transition-all duration-300 focus:-translate-y-px focus:shadow-lg focus:outline-none"
              value={min}
              onChange={handleMinChange}
              min={minValue}
              max={maxValue}
              step={step}
            />
          </div>
          <div className="space-x-2">
            <label className="text-sm">To</label>
            <input
              type="number"
              className="rounded border-none p-1 text-sm text-neutral-800 transition-all duration-300 focus:-translate-y-px focus:shadow-lg focus:outline-none"
              value={max}
              onChange={handleMaxChange}
              min={minValue}
              max={maxValue}
              step={step}
            />
          </div>
        </div>
        <div>
          <Link
            href={`/movies?${queryString}&${minQuery}=${min}&${maxQuery}=${max}`}
            className={`flex items-center gap-1 rounded bg-neutral-600 px-4 py-2 transition duration-300 hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none focus:outline focus:outline-offset-2 focus:outline-neutral-500`}
          >
            Search
          </Link>
        </div>
      </div>
    </form>
  );
};

export default MinMaxInput;
