import Menu from "../components/Menu";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard({ server_host }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ username: "" });

  const [needAuth, setNeedAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    (async () => {
      await checkAuth();
    })();
  }, []);

  async function checkAuth() {
    const res = await fetch(server_host + "/users/check/auth", {
      method: "post",
      credentials: "include",
    });
    const data = await res.json();

    if (data.ok) {
      setLoading(false);
      await loadData();
    } else {
      setNeedAuth(true);
      setLoading(false);
    }
  }

  async function loadData() {
    const res = await fetch(server_host + "/users/me/", {
      method: "get",
      credentials: "include",
    });
    const data = await res.json();

    if (data.ok) {
      setUser(data.user);
    }
  }

  if (loading) {
    return (
      <div className={"container"}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (needAuth) {
    return (
      <div className={"container"}>
        <h1>You need to login</h1>
        <div>
          <NavLink to={"/login"}>Go to the login form</NavLink>
        </div>
      </div>
    );
  }

  function changeUser(name, value) {
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function save() {
    setDisabled(true);
    setMessage("");
    const res = await fetch(server_host + "/users/update", {
      method: "post",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setDisabled(false);
    if (data.ok) {
      setMessage("Saved");
    } else {
      setMessage("Failed");
    }
  }

  return (
    <div>
      <Menu server_host={server_host} />
      <div className={"container"}>
        <h1>Personal area</h1>
        <div>{message}</div>
        <form className={"dashboard-form"}>
          <label>Username</label>
          <div>
            <input
              type={"text"}
              value={user.username}
              onChange={(e) => changeUser("username", e.target.value)}
            ></input>
          </div>
          <div>
            <button onClick={save} disabled={disabled}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
