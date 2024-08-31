import React from 'react';

interface SalaryInputProps {
  label: string;
  from: number;
  to: number;
  onFromChange: (value: number) => void;
  onToChange: (value: number) => void;
}

export default function SalaryInput({label, from, to, onFromChange, onToChange}: SalaryInputProps) {
  return (
    <div>
      <label className={"py-2 block"}>
        <span className={"block text-xs"}>{label}</span>
        <div className={"flex flex-row gap-2"}>
          <input
            type={"number"}
            className={"border border-gray-300 p-1 rounded w-24"}
            placeholder={"From"}
            value={from}
            onChange={(e) => onFromChange(parseInt(e.target.value))}
          />
          <input
            type={"number"}
            className={"border border-gray-300 p-1 rounded w-24"}
            placeholder={"To"}
            value={to}
            onChange={(e) => onToChange(parseInt(e.target.value))}
          />
        </div>
      </label>
    </div>
  );
}