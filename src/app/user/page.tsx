import React, { Suspense } from "react";
import UserCard from "./_components/UserCard";
import { getUserQueryOptions } from "./query/userQuery";
import { ServerFetchBoundary } from "@/components/common/ServerFetchBoundary";

const User = () => {
  const serverFetchOptions = [
    getUserQueryOptions()
  ]

  return <Suspense fallback={"user 로딩중"}>
            <ServerFetchBoundary fetchOptions={serverFetchOptions}>
              <UserCard/>
            </ServerFetchBoundary>
          </Suspense>;
};

export default User;
