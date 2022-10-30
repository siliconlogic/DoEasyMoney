import Menu from "../components/Menu";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Users({ server_host }) {
  const [users, setUsers] = useState([]);

  useEffect(loadUsers, []);

  function loadUsers() {
    fetch(server_host + "/users/get/all", {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.ok) {
          setUsers(data.users);
        }
      });
  }

  return (
    <div>
      <Menu server_host={server_host} />
      <div className={"container"}>
        <h1>Users</h1>
        <div>{JSON.stringify(users)}</div>
      </div>
    </div>
  );
}
