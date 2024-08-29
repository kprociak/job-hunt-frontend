import React from "react";
import {FlashMessageType} from "./FlashMessagePovider";




export default function FlashMessage({message, type}: FlashMessageType) {
  const colors = {
    error: "bg-red-300 text-red-800",
    success: "bg-green-300 text-green-800",
    info: "bg-blue-300 text-blue-800",
  };

  return (
    <div className={`rounded-xl px-4 py-2 ${colors[type]}`}>
      {message}
    </div>
  );
}