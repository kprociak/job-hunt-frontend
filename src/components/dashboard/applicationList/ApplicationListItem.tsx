import React from 'react';
import {JobApplicationType} from "../../../types/JobApplicationType";

export interface ApplicationListItemProps {
  application: JobApplicationType;
}
export default function ApplicationListItem({application}: ApplicationListItemProps) {
  return (
    <div>
      <div className="flex justify-between">
        <h2>{application.companyName}</h2>
        <h3>{application.position}</h3>
      </div>
      <div>
        <p>Status: {application.status}</p>
        <p>Application Date: {application.ApplicationDate}</p>
      </div>
    </div>
  );
}