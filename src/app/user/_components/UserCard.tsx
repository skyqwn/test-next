"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useUserQuery } from "../query/userQuery";
import { shootAPi } from "@/api/shoot/api";

const UserCard = () => {
  const {data} = useUserQuery();

  const testMutation = useMutation({
    mutationFn: shootAPi.testErrorMutation,
  });

  return <div>
    <h1>{data.compNm}</h1>
    <h4>어스 타입: {data.authTypeCd}</h4>
    <button onClick={() => testMutation.mutate()}>
      ErrorTest
    </button>
  </div>;
};

export default UserCard;
