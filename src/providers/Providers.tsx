"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/shared/libs/tanstack-query/client";

const Providers = ({children}: PropsWithChildren) => {
  return <QueryClientProvider client={getQueryClient()}>
    <ReactQueryDevtools initialIsOpen={true}/>
      {children}
    </QueryClientProvider>;
};

export default Providers;
