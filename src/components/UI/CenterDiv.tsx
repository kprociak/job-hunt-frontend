import React from "react";
export default function CenterDiv({children}: {children: React.ReactNode}) {
  return (
    <div className={"min-h-screen flex items-center justify-center flex-col"}>
      {children}
    </div>
  );
}