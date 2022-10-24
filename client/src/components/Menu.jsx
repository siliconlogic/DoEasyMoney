import { NavLink } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Menu({ server_host }) {
  const [loading, setLoading] = useState(true);
  const [authorised, setAuthorised] = useState(undefined);
  const [role, setRole] = useState(undefined);

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
      setAuthorised(true);
      setRole(data.role);
    } else {
      setLoading(false);
    }
  }

  return (
    <div className={"menu"}>
      <span>
        <NavLink to={"/"}> Main</NavLink>
      </span>
      {!authorised && (
        <span>
          <NavLink to={"/login"}> Login</NavLink>
        </span>
      )}
      {authorised && (
        <span>
          <NavLink to={"/dashboard"}> Dashboard</NavLink>
        </span>
      )}
      {!authorised && (
        <span>
          <NavLink to={"/signup"}> Signup</NavLink>
        </span>
      )}
      {role === "admin" && (
        <span>
          <NavLink to={"/admin"}> Admin</NavLink>
        </span>
      )}
      {authorised && (
        <span>
          <a href={server_host + "/users/logout"}> Exit</a>
        </span>
      )}
    </div>
  );
}
