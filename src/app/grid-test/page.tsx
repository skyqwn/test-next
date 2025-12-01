"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Grid, EditableCell } from "@/components/common/Grid";

// 목데이터 타입
interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  status: "활성" | "비활성" | "대기";
  joinDate: string;
}

// 목데이터
const mockData: User[] = [
  { id: 1, name: "김철수", email: "kim@example.com", department: "개발팀", role: "시니어 개발자", status: "활성", joinDate: "2022-03-15" },
  { id: 2, name: "이영희", email: "lee@example.com", department: "디자인팀", role: "UI 디자이너", status: "활성", joinDate: "2021-07-20" },
  { id: 3, name: "박민수", email: "park@example.com", department: "개발팀", role: "주니어 개발자", status: "대기", joinDate: "2024-01-10" },
  { id: 4, name: "정수진", email: "jung@example.com", department: "마케팅팀", role: "마케터", status: "활성", joinDate: "2023-05-08" },
  { id: 5, name: "최동현", email: "choi@example.com", department: "인사팀", role: "HR 매니저", status: "활성", joinDate: "2020-11-25" },
  { id: 6, name: "강미영", email: "kang@example.com", department: "개발팀", role: "백엔드 개발자", status: "비활성", joinDate: "2019-08-30" },
  { id: 7, name: "윤재호", email: "yoon@example.com", department: "기획팀", role: "PM", status: "활성", joinDate: "2022-09-12" },
  { id: 8, name: "송지원", email: "song@example.com", department: "디자인팀", role: "UX 디자이너", status: "활성", joinDate: "2023-02-28" },
  { id: 9, name: "임성준", email: "lim@example.com", department: "개발팀", role: "프론트엔드 개발자", status: "활성", joinDate: "2021-12-05" },
  { id: 10, name: "한소희", email: "han@example.com", department: "마케팅팀", role: "콘텐츠 매니저", status: "대기", joinDate: "2024-03-01" },
  { id: 11, name: "오현우", email: "oh@example.com", department: "개발팀", role: "DevOps 엔지니어", status: "활성", joinDate: "2020-06-18" },
  { id: 12, name: "배수연", email: "bae@example.com", department: "인사팀", role: "리크루터", status: "활성", joinDate: "2022-04-22" },
];

export default function GridTestPage() {
  // 컬럼 정의
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 60,
      },
      {
        accessorKey: "name",
        header: "이름",
        cell: EditableCell, // 편집 가능한 셀
      },
      {
        accessorKey: "email",
        header: "이메일",
        cell: EditableCell,
      },
      {
        accessorKey: "department",
        header: "부서",
      },
      {
        accessorKey: "role",
        header: "직책",
        cell: EditableCell,
      },
      {
        accessorKey: "status",
        header: "상태",
        cell: ({ getValue }) => {
          const status = getValue() as string;
          const colors: Record<string, string> = {
            활성: "#10b981",
            비활성: "#ef4444",
            대기: "#f59e0b",
          };
          return (
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "12px",
                backgroundColor: `${colors[status]}20`,
                color: colors[status],
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "joinDate",
        header: "입사일",
      },
    ],
    []
  );

  const handleDataChange = (newData: User[]) => {
    console.log("데이터 변경됨:", newData);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: 600 }}>
        Grid 공통 컴포넌트 테스트
      </h1>

      <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#f0f9ff", borderRadius: "8px", fontSize: "14px", color: "#0369a1" }}>
        💡 <strong>이름, 이메일, 직책</strong> 셀을 더블클릭하면 편집할 수 있습니다.
      </div>

      <Grid
        data={mockData}
        columns={columns}
        enablePagination={true}
        enableSorting={true}
        enableGlobalFilter={true}
        pageSizeOptions={[5, 10, 20]}
        onDataChange={handleDataChange}
      />
    </div>
  );
}
