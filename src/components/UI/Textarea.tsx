import React from 'react';

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Textarea({label, value, onChange}: TextareaProps) {
  return (
    <label className="py-2 block">
      <span className="block text-xs">{label}</span>
      <textarea
        className="border border-gray-300 p-2 w-full"
        value={value}
        onChange={(e)=>{onChange(e.target.value)}}
      />
    </label>
  )
}