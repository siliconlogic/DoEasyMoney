import Menu from "../components/Menu";
import React, { useState } from "react";
import emailValidator from "email-validator";
import { useNavigate } from "react-router-dom";

export default function SignUp({ server_host }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [secondPassword, setSecondPassword] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  function changeUser(name, value) {
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function signUp() {
    setDisabled(true);
    setMessage("");
    if (!user.email || !user.password || !secondPassword) {
      setMessage("Fill all fields");
      setDisabled(false);
      return;
    }
    if (secondPassword !== user.password) {
      setMessage("Passwords are not match!");
      setDisabled(false);
      return;
    }
    if (!emailValidator.validate(user.email)) {
      setMessage("Email is not valid");
      setDisabled(false);
      return;
    }

    const res = await fetch(server_host + "/users/signup", {
      method: "post",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.ok) {
      setMessage(" Successful registration. Redirection to you personal area.");
      navigate("/dashboard");
    } else {
      setDisabled(false);
      setMessage("Error. Please try another registration data");
    }
  }

  return (
    <div>
      <Menu server_host={server_host} />
      <div className={"container text-center"}>
        <h1>Signup</h1>
        <div className={"message"}>{message}</div>
        <form className={"sign-up"}>
          <div>
            <label>Email</label>
            <div>
              <input
                type={"text"}
                name={"email"}
                onChange={(e) => changeUser("email", e.target.value)}
                value={user.email}
              />
            </div>
          </div>
          <div>
            <label>Password</label>
            <div>
              <input
                type={"password"}
                onChange={(e) => changeUser("password", e.target.value)}
                value={user.password}
              />
            </div>
          </div>
          <div>
            <label>Confirm password</label>
            <div>
              <input
                type={"password"}
                onChange={(e) => setSecondPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type={"button"} onClick={signUp} disabled={disabled}>
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
