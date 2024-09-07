import React from 'react';
import ButtonLink from "../components/UI/ButtonLink";
import CenterDiv from "../components/UI/CenterDiv";
import LoginLinks from "../components/hompepage/LoginLinks";
import {Link} from "react-router-dom";
export default function HomePage() {
  return (
    <CenterDiv>
      <div>
        <img src={"./resume.png"} alt={"JobHunt Logo"} className={"w-60"}/>
      </div>
      <div className={"text-center"}>
        <h1 className={"text-5xl font-bold mt-5 mb-8"}>JobHunt</h1>
        <p>
          Overwhelmed by your job hunt process? Sent out too many CVs and lost track of what's going on? <br/>
          Here's a simple tool to help you keep track of your job applications.
        </p>
      </div>
      <div className={"flex flex-row gap-4 pt-4"}>
        <LoginLinks/>
      </div>
      <div className="pt-20 text-sm text-gray-500">
        <Link to={"/faq"}>FAQ</Link>
      </div>
      <div className="pt-20">
        <p className="text-sm text-gray-500">
          &copy;
          <a href={"https://github.com/kprociak"} target={"_blank"}>Krzysztof Prociak</a>
        </p>
      </div>
    </CenterDiv>
);
}