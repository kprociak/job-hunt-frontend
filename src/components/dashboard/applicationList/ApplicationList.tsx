import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FlashMessageContext} from "../../flashMessages/FlashMessagePovider";
import JobApplicationSlice, {loadJobApplications} from "../../../redux/slices/JobApplicationSlice";
import ApplicationListItem from "./ApplicationListItem";
import {JobApplication} from "../../../types/JobApplication";
import Button from "../../UI/Button";
import {useGetJobApplicationsQuery} from "../../../redux/api/apiSlice";

interface ApplicationListProps {
  selectedApplication: JobApplication | null;
  setSelectedApplication: (application: JobApplication | null) => void;
}

export default function ApplicationList({selectedApplication, setSelectedApplication}: ApplicationListProps) {
  //const dispatch = useDispatch();
  // @ts-ignore
  //const applications = useSelector((state) => state.jobApplications.jobApplications);
  const {addMessage} = React.useContext(FlashMessageContext);

  const {
    data: applications = [],
    isLoading,
    isSuccess,
    error
  } = useGetJobApplicationsQuery()


  return (
    <div>
      <div className={"flex justify-between mb-6"}>
        <h2 className="text-2xl">Your applications</h2>
        <Button onClick={() => setSelectedApplication(null)}>Add new application</Button>
      </div>
      {isLoading && <p>Loading...</p>}
      { // @ts-ignore
        applications?.jobApplications?.length > 0 ? (
        <div className={""}>
          { // @ts-ignore
            applications?.jobApplications?.map((application: JobApplication) => (
            <ApplicationListItem
              application={application}
              key={application.id}
              selected={selectedApplication?.id === application.id}
              onClick={() => setSelectedApplication(application)}
            />
          ))}
        </div>
      ) : (
        <p>No applications found</p>
      )}
    </div>
  );
}