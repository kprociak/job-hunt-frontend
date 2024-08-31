import React from 'react';

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password" | "email" | "date" | "number";
  inputClassName?: string;
}
export default function TextInput({label, placeholder, value, onChange, type, inputClassName}: TextInputProps) {
  return (
    <label className={"py-2 block"}>
      <span className={"block text-xs"}>{label}</span>
      <input
        type={type || "text"}
        className={`border border-gray-300 p-1 rounded ${inputClassName}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}