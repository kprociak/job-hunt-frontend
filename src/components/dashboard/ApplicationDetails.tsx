import React from 'react';
import {useSelector} from "react-redux";

interface ApplicationDetailsProps {
  applicationId: number;
}

interface ApplicationDetailsFieldProps {
  label: string;
  value: string;
  isLink?: boolean;
}
function ApplicationDetailsField({label, value, isLink}: ApplicationDetailsFieldProps) {
  return (
    <div className={"pb-4"}>
      <span className={"block text-xs"}>{label}</span>
      <span className={"block"}>
        {isLink ? <a href={value} target={"_blank"} className={"text-blue-700 hover:underline"}>{value}</a> : value}
      </span>
    </div>
  );
}

export default function ApplicationDetails({applicationId}: ApplicationDetailsProps) {
  const application = useSelector((state: any) => state.jobApplications.jobApplications.find((app: any) => app.id === applicationId));

  return (
    <div>
      <div className={"mb-6"}>
        <h2 className={"text-2xl"}>Application Details</h2>
      </div>
      <ApplicationDetailsField label={"Company Name"} value={application.companyName} />
      <ApplicationDetailsField label={"Position"} value={application.position} />
      <ApplicationDetailsField label={"Offer URL"} value={application.offerUrl} isLink={true}/>
      <ApplicationDetailsField label={"Status"} value={application.status} />
    </div>
  );
}