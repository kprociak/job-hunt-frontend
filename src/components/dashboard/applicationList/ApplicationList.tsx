import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FlashMessageContext} from "../../flashMessages/FlashMessagePovider";
import JobApplicationSlice, {loadJobApplications} from "../../../redux/slices/JobApplicationSlice";
import ApplicationListItem from "./ApplicationListItem";
import {JobApplication} from "../../../types/JobApplication";
import Button from "../../UI/Button";
import {useGetJobApplicationsQuery} from "../../../redux/api/apiSlice";
import TextInput from "../../UI/TextInput";

interface ApplicationListProps {
  selectedApplication: JobApplication | null;
  setSelectedApplication: (application: JobApplication | null) => void;
}

export default function ApplicationList({selectedApplication, setSelectedApplication}: ApplicationListProps) {
  //const dispatch = useDispatch();
  // @ts-ignore
  //const applications = useSelector((state) => state.jobApplications.jobApplications);
  const {addMessage} = useContext(FlashMessageContext);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [orderBy, setOrderBy] = useState<"application_date" | "last_update_date">("application_date");

  const sortOptions = [
    {label: "Application date", value: "application_date"},
    {label: "Last update", value: "last_update_date"},
  ];

  const {
    data: applications = [],
    isLoading,
    isSuccess,
    error
  } = useGetJobApplicationsQuery();

  const filteredApplications = useCallback(() => {
    // @ts-ignore
    if (typeof  applications?.jobApplications[Symbol.iterator] !== 'function'){
      return [];
    }
    if (searchPhrase.length < 3){
      // @ts-ignore
      return applications?.jobApplications;
    }
    // @ts-ignore
    return applications?.jobApplications?.filter((application: JobApplication) => {
      return application.company_name.toLowerCase().includes(searchPhrase.toLowerCase());
    });
  }, [applications, searchPhrase]);

  const sortedApplications = useCallback(() => {
    // @ts-ignore
    return filteredApplications().toSorted((a: JobApplication, b: JobApplication) => {
      // @ts-ignore
      return new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime();
    });
  }, [filteredApplications, orderBy]);



  return (
    <div className={"h-full"}>
      <div className={"flex justify-between items-center gap-2 mb-6"}>
        <h2 className="text-2xl">Your applications</h2>
        <div className={""}>
          <TextInput label={""} placeholder={"Search by company"} value={searchPhrase} onChange={setSearchPhrase} />
        </div>
        <div className={"flex-grow"}>
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as "application_date" | "last_update_date")}
            className={"p-1.5 border border-gray-300 rounded-md"}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <Button onClick={() => setSelectedApplication(null)}>Add new application</Button>
      </div>
      {isLoading ?
        <p>Loading...</p> : (
          <div className={"h-4/5"}>
          { // @ts-ignore
            applications?.jobApplications?.length > 0 ? (
            <div className={"h-full overflow-y-scroll no-scrollbar"}>
              { // @ts-ignore
                sortedApplications().map((application: JobApplication) => (
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
        )}
    </div>
  );
}