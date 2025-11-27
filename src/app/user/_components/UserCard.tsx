"use client";

import React from "react";
import { useUserQuery } from "../query/userQuery";

const UserCard = () => {
  const {data} = useUserQuery();
  return <div>
    <h1>{data.contents.compNm}</h1>
    <h4>어스 타입: {data.contents.authTypeCd}</h4>
  </div>;
};

export default UserCard;
