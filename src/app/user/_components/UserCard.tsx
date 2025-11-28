"use client";

import React from "react";
import { useUserQuery } from "../query/userQuery";

const UserCard = () => {
  const {data} = useUserQuery();
  return <div>
    <h2>user</h2>
    <h1>{data.compNm}</h1>
    <h4>어스 타입: {data.authTypeCd}</h4>
    <button onClick={async() => {
     await fetch(`api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Cookie: `refresh_token=${refreshToken}`,
      },
      credentials: "include"
    });
    }}>asdasdasd</button>
  </div>; 
};

export default UserCard;
