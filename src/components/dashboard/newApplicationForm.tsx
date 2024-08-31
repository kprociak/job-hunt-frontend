import React, {useContext, useState} from 'react';
import TextInput from "../UI/TextInput";
import {format} from 'date-fns';
import Button from "../UI/Button";
import SalaryInput from "../UI/SalaryInput";
import Textarea from "../UI/Textarea";
import {FlashMessageContext} from "../flashMessages/FlashMessagePovider";
export default function NewApplicationForm(){
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [offerUrl, setOfferUrl] = useState("");
  const [applicationDate, setApplicationDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [offeredSalaryFrom, setOfferSalaryFrom] = useState(0);
  const [offeredSalaryTo, setOfferSalaryTo] = useState(0);
  const [expectedSalaryFrom, setExpectedSalaryFrom] = useState(0);
  const [expectedSalaryTo, setExpectedSalaryTo] = useState(0);
  const [notes, setNotes] = useState("");

  const {addMessage} = useContext(FlashMessageContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}job-applications`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            company_name: companyName,
            job_title: jobTitle,
            offer_url: offerUrl,
            application_date: applicationDate,
            offered_salary_from :offeredSalaryFrom,
            offered_salary_to: offeredSalaryTo,
            expected_salary_from: expectedSalaryFrom,
            expected_salary_to: expectedSalaryTo,
            notes
          })
        });

        if (!res.ok) {
          addMessage("Error submitting application", "error");
          return;
        }

        addMessage("Application submitted", "success");

      } catch (e) {
        addMessage("Error submitting application", "error");
        console.error(e);
      }
    })();
  }

  return (
    <div>
      <h2 className={"text-2xl"}>Add new job application</h2>
      <form onSubmit={handleSubmit} className={"max-w-lg"}>
        <TextInput label={"Company name"} placeholder={"Company name"} value={companyName} onChange={setCompanyName} inputClassName={"w-full"} />
        <TextInput label={"Job Title"} placeholder={"Job Title"} value={jobTitle} onChange={setJobTitle} inputClassName={"w-full"}/>
        <TextInput label={"Offer URL"} placeholder={"Offer URL"} value={offerUrl} onChange={setOfferUrl} inputClassName={"w-full"}/>
        <TextInput label={"Application Date"} placeholder={"Application Date"} value={applicationDate} onChange={setApplicationDate} type={"date"} />
        <SalaryInput
          label={"Salary from the offer"}
          from={offeredSalaryFrom}
          to={offeredSalaryTo}
          onFromChange={setOfferSalaryFrom}
          onToChange={setOfferSalaryTo}

        />
        <SalaryInput
          label={"Provided expected salary"}
          from={expectedSalaryFrom}
          to={expectedSalaryTo}
          onFromChange={setOfferSalaryFrom}
          onToChange={setOfferSalaryTo}
        />
        <Textarea label={"Notes"} value={notes} onChange={setNotes} />
        <Button type={"submit"}>Submit</Button>
      </form>
    </div>
  );
}