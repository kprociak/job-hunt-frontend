import React from "react";
import {FlashMessageType} from "./FlashMessagePovider";




export default function FlashMessage({message, type}: FlashMessageType) {
  const colors = {
    error: "bg-red-300 text-red-700 border-red-700",
    success: "bg-green-300 text-green-900 border-green-700",
    info: "bg-blue-300 text-blue-700 border-blue-700",
  };

  return (
    <div className={`rounded-xl px-4 py-2 border ${colors[type]}`}>
      {message}
    </div>
  );
}