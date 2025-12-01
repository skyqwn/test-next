"use client";

import React from "react";
import { usePostsQuery } from "../query/jsonPlaceholderQuery";
import { Post } from "@/api/shoot/type";
import PostCard from "./PostCard";

// 더미 데이터
const dummyPosts: Post[] = [
  { id: 1, userNm: "홍길동", title: "첫 번째 게시글", content: "이것은 첫 번째 게시글의 내용입니다. 서버에서 prefetch된 데이터를 보여주는 예시입니다.", createdAt: "2024-01-15", status: "완료" },
  { id: 2, userNm: "김철수", title: "두 번째 게시글", content: "React Query와 Next.js를 활용한 SSR 데이터 페칭 테스트 중입니다.", createdAt: "2024-01-16", status: "진행중" },
  { id: 3, userNm: "이영희", title: "세 번째 게시글", content: "ErrorBoundary와 Suspense를 활용한 에러 핸들링 구현 완료!", createdAt: "2024-01-17", status: "대기" },
];

//예시용으로 만든거임

const ShootLists = () => {
  const { data } = usePostsQuery();
  console.log("🚀 ~ ShootLists.tsx ~ data:", data);

  const posts = dummyPosts;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>게시글 목록</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            userNm={post.userNm}
            createdAt={post.createdAt}
            status={post.status}
            title={post.title}
            content={post.content}
          />
        ))}
      </div>
    </div>
  );
};

export default ShootLists;
