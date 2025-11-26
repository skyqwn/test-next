import React, { Suspense } from "react";
import { ServerFetchBoundary } from "@/components/common/ServerFetchBoundary";

import ShootListsSkeleton from "./_components/skeletons/shootLists/ShootListsSkeleton";
import ShootLists from "./_components/ShootLists";

import { getPostsQueryOptions } from "./query/jsonPlaceholderQuery";

const page = () => {
  const serverFetchOptions = [
    getPostsQueryOptions(),

  ]

  return <Suspense fallback={ <ShootListsSkeleton/>}>
            <ServerFetchBoundary fetchOptions={serverFetchOptions}>
              <ShootLists/>
            </ServerFetchBoundary>
          </Suspense>
};

export default page;
