import React from "react";
import { ServerFetchBoundary } from "@/components/common/ServerFetchBoundary";

import ShootListsSkeleton from "./_components/skeletons/shootLists/ShootListsSkeleton";
import ShootLists from "./_components/ShootLists";

import { postsQueries } from "./query/jsonPlaceholderQuery";
import ErrorHandlingWrapper from "@/components/common/ErrorHandlingWrapper";
import ErrorFallback from "@/components/common/ErrorFallback";

const page = () => {
  const serverFetchOptions = [
    postsQueries.all(),  // query-key-factory 사용
    // postsQueries.detail(123),  // id가 필요한 경우 예시
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
