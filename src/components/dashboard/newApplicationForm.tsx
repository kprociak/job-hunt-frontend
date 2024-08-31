import React, {useState} from 'react';
import TextInput from "../UI/TextInput";
import {format} from 'date-fns';
import Button from "../UI/Button";
export default function NewApplicationForm(){
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [offerUrl, setOfferUrl] = useState("");
  const [applicationDate, setApplicationDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(companyName, position, offerUrl, applicationDate);


  }

  return (
    <div>
      <h2 className={"text-2xl"}>Add new job application</h2>
      <form onSubmit={handleSubmit}>
        <TextInput label={"Company name"} placeholder={"Company name"} value={companyName} onChange={setCompanyName} />
        <TextInput label={"Position"} placeholder={"Position"} value={position} onChange={setPosition} />
        <TextInput label={"Offer URL"} placeholder={"Offer URL"} value={offerUrl} onChange={setOfferUrl} />
        <TextInput label={"Application Date"} placeholder={"Application Date"} value={applicationDate} onChange={setApplicationDate} type={"date"} />
        <Button type={"submit"}>Submit</Button>
      </form>
    </div>
  );
}