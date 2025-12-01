"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useUserQuery } from "../query/userQuery";
import { shootAPi } from "@/api/shoot/api";

interface UserData {
  compNm: string;
  authTypeCd: string;
}

const UserCard = () => {
  const {data} = useUserQuery() as { data: UserData };

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
