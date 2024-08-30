import React from 'react'
import TextInput from "../components/UI/TextInput";
import Button from "../components/UI/Button";
import CenterDiv from "../components/UI/CenterDiv";
import {useDispatch} from "react-redux";
import {updateUser} from "../redux/slices/UserSlice";
import {useNavigate} from "react-router-dom";
import {FlashMessageContext} from "../components/flashMessages/FlashMessagePovider";

export default function SignupPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {addMessage} = React.useContext(FlashMessageContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      //todo: show error flash message
      console.log("Please fill in all fields");
    }

    setLoading(true);
    (async () => {
      try{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, password, name})
        });

        const data = await res.json();

        if (data.error) {
          setLoading(false);
          console.log(data.error);
          return;
        }

        localStorage.setItem("token", data.access_token);
        dispatch(updateUser({email: data.email, name: data.name}));
        navigate("/dashboard");

      }
      catch(err){
        addMessage("Something went wrong", "error");
        setLoading(false);
        console.log(err);
      }

    })();
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
          <Button className={"w-full"} type={"submit"} disabled={loading}>Sign up</Button>
        </div>
      </form>
    </CenterDiv>
  )
}