import React from "react";
import ButtonLink from "../UI/ButtonLink";
import useUser from "../../hooks/useUser";

export default function LoginLinks() {

  const {user} = useUser();

  return (
    <div className={"flex flex-row gap-4"}>
      {user.email ? (
        <ButtonLink to={"/dashboard"}>Open Dashboard</ButtonLink>
      ) : (
        <>
          <ButtonLink to={"/login"}>Log in</ButtonLink>
          <ButtonLink to={"/signup"}>Sign up</ButtonLink>
        </>
      )}
    </div>
  )
}