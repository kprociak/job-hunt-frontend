import React from 'react'
import TextInput from "../components/UI/TextInput";
import Button from "../components/UI/Button";
import CenterDiv from "../components/UI/CenterDiv";

export default function SignupPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      //todo: show error flash message
      console.log("Please fill in all fields");
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password, name})
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error);
        }
        console.log(data);
      })
      .catch(err => {
        console.log(err);
    });

  }

  return (
    <CenterDiv>
      <div>
        <h1 className={"font-bold text-2xl my-2"}>Sign up!</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput label={"Email"} placeholder={"your@email.com"} value={email} onChange={setEmail} type={"email"}/>
        <TextInput label={"Password"} placeholder={"******"} value={password} onChange={setPassword} type={"password"}/>
        <TextInput label={"Name"} placeholder={"John Doe"} value={name} onChange={setName} />
        <div className={"mt-4"}>
          <Button className={"w-full"} type={"submit"}>Sign up</Button>
        </div>
      </form>
    </CenterDiv>
  )
}