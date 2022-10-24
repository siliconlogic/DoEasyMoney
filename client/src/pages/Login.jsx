import Menu from "../components/Menu";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ server_host }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function login() {
    setMessage("");
    if (!user.email || !user.password) {
      setMessage("Fill two fields!");
    }

    const res = await fetch(server_host + "/users/login", {
      method: "post",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.ok) {
      setMessage("Perform redirecting...");
      navigate("/dashboard");
    } else {
      setMessage("Wrong login or password");
    }
  }

  function changeUser(name, value) {
    setUser({
      ...user,
      [name]: value,
    });
  }

  return (
    <div>
      <Menu server_host={server_host} />
      <div className={"container text-center"}>
        <h1>Login</h1>
        <div>{message} </div>
        <div>
          <form className={"login"}>
            <div>
              <input
                type={"text"}
                name={"email"}
                placeholder={"email"}
                onChange={(e) => changeUser("email", e.target.value)}
                value={user.email}
              />
            </div>
            <div>
              <input
                type={"password"}
                name={"password"}
                placeholder={"password"}
                onChange={(e) => changeUser("password", e.target.value)}
                value={user.password}
              />
            </div>
            <button type={"button"} onClick={login}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
