import { Suspense } from "react";
import ServerGridTest from "./_components/ServerGridTest";

export default function ServerGridTestPage() {
  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: 600 }}>
        ServerGrid 테스트 (서버사이드 페이지네이션)
      </h1>

      <div
        style={{
          marginBottom: "16px",
          padding: "12px",
          backgroundColor: "#f0f9ff",
          borderRadius: "8px",
          fontSize: "14px",
          color: "#0369a1",
        }}
      >
        💡 JSONPlaceholder API 사용 - 페이지/정렬 변경 시 서버에서 새 데이터를
        가져옵니다.
      </div>

      {/* <Suspense
        fallback={
          <div style={{ padding: "40px", textAlign: "center" }}>로딩중...</div>
        }
      > */}
        <ServerGridTest />
      {/* </Suspense> */}
    </div>
  );
}
