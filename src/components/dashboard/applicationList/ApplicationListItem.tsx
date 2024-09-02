import React from 'react';
import {JobApplicationType} from "../../../types/JobApplicationType";

export interface ApplicationListItemProps {
  application: JobApplicationType;
  selected: boolean;
  onClick: () => void;
}
export default function ApplicationListItem({application, selected, onClick}: ApplicationListItemProps) {
  return (
    <div
      className={`flex justify-between p-4 my-2 rounded-2xl ${selected ? 'bg-sky-200' : 'bg-gray-50'}`}
      onClick={onClick}
    >
      <div className="">
        <h3 className={"text-lg font-semibold"}>{application.companyName}</h3>
        <h4>{application.position}</h4>
      </div>
      <div>
        <p>Status: {application.status}</p>
        <p>Application Date: {application.applicationDate}</p>
      </div>
    </div>
  );
}