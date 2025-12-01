import React from "react";
import { ServerFetchBoundary } from "@/components/common/ServerFetchBoundary";

import ShootListsSkeleton from "./_components/skeletons/shootLists/ShootListsSkeleton";
import ShootLists from "./_components/ShootLists";

import { postsKeys } from "./query/jsonPlaceholderQuery";
import ErrorHandlingWrapper from "@/components/common/ErrorHandlingWrapper";
import ErrorFallback from "@/components/common/ErrorFallback";

const page = () => {
  const serverFetchOptions = [
    postsKeys.all(),  // query-key-factory 사용
    // postsKeys.detail(123),  // id가 필요한 경우 예시
  ]

  return (
    <ErrorHandlingWrapper
      fallbackComponent={ErrorFallback}
      suspenseFallback={<ShootListsSkeleton/>}
    >
      <ServerFetchBoundary fetchOptions={serverFetchOptions}>
        <ShootLists/>
      </ServerFetchBoundary>
    </ErrorHandlingWrapper>
  )
};

export default page;
