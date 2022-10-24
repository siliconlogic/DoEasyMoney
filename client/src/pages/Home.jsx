import Menu from "../components/Menu";
import React from "react";

export default function Home({ server_host }) {
  return (
    <div>
      <Menu server_host={server_host} />
      <div className={"container"}>
        <h1>Main</h1>
      </div>
    </div>
  );
}
