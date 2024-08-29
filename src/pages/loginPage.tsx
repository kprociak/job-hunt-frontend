import React, {useState} from 'react'
import TextInput from "../components/UI/TextInput";
import CenterDiv from "../components/UI/CenterDiv";
import Button from "../components/UI/Button";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      //todo: show error flash message
      console.log("Please fill in all fields");
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
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
        <h1 className={"font-bold text-2xl my-2"}>Log In</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput label={"Email"} placeholder={"Email"} value={email} onChange={setEmail} type={"email"}/>
        <TextInput label={"Password"} placeholder={"******"} value={password} onChange={setPassword} type={"password"}/>
        <div className={"mt-4"}>
          <Button className={"w-full"} type={"submit"}>Log in</Button>
        </div>
      </form>
    </CenterDiv>
  )
}