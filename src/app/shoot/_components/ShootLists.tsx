"use client";

import React from "react";
import { usePostsQuery } from "../query/jsonPlaceholderQuery";

const ShootLists = () => {
  const {data} = usePostsQuery();
  console.log('🚀 ~ ShootLists.tsx:8 ~ ShootLists ~ data:', data);
  return <div>ShootLists</div>;
};

export default ShootLists;
