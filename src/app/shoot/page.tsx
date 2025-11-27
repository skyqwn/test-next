import React from "react";
import { ServerFetchBoundary } from "@/components/common/ServerFetchBoundary";

import ShootListsSkeleton from "./_components/skeletons/shootLists/ShootListsSkeleton";
import ShootLists from "./_components/ShootLists";

import { getPostsQueryOptions } from "./query/jsonPlaceholderQuery";
import ErrorHandlingWrapper from "@/components/common/ErrorHandlingWrapper";
import ErrorFallback from "@/components/common/ErrorFallback";

const page = () => {
  const serverFetchOptions = [
    getPostsQueryOptions(),
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
