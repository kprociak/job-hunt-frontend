import React from 'react';
import ButtonLink from "../components/UI/buttonLink";
import CenterDiv from "../components/UI/CenterDiv";
export default function Home() {
  return (
    <CenterDiv>
      <div>
        <img src={"./resume.png"} alt={"JobHunt Logo"} className={"w-60"}/>
      </div>
      <div className={"text-center"}>
      <h1 className={"text-5xl font-bold my-3"}>JobHunt</h1>
        <p>
          Overwhelmed by your job hunt? Sent out too many CVs and lost track of what's going on? <br/>
          Here's a simple tool to help you keep track of your job applications.
        </p>
      </div>
      <div className={"flex flex-row gap-4 pt-4"}>
        <ButtonLink to={"/login"}>Log in</ButtonLink>
        <ButtonLink to={"/signup"}>Sign up</ButtonLink>
      </div>
    </CenterDiv>
  );
}