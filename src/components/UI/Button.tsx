import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: "submit" | "button" | "reset",
  children: React.ReactNode;
  className?: string;
}
export default function Button({onClick, type, children, className}: ButtonProps) {
  return (
    <button onClick={onClick} type={type || "button"} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}>
      {children}
    </button>
  );
}