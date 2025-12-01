"use client";

import { useMemo, useState, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ServerGrid } from "@/components/common/Grid";
import { shootAPi } from "@/api/shoot/api";

// JSONPlaceholder Post 타입
interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function ServerGridTest() {
  const [selectedRows, setSelectedRows] = useState<JsonPlaceholderPost[]>([]);

  // 컬럼 정의
  const columns = useMemo<ColumnDef<JsonPlaceholderPost>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 60,
      },
      {
        accessorKey: "userId",
        header: "User ID",
        size: 80,
      },
      {
        accessorKey: "title",
        header: "제목",
      },
      {
        accessorKey: "body",
        header: "내용",
        cell: ({ getValue }) => {
          const body = getValue() as string;
          // 내용이 길면 잘라서 표시
          return body.length > 50 ? `${body.slice(0, 50)}...` : body;
        },
      },
    ],
    []
  );

  const handleSelectionChange = (rows: JsonPlaceholderPost[]) => {
    setSelectedRows(rows);
  };

  return (
    <div>
      {/* 선택된 행 정보 */}
      <div style={{
        marginBottom: "16px",
        padding: "12px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px"
      }}>
        <strong>선택된 항목: {selectedRows.length}개</strong>
        {selectedRows.length > 0 && (
          <span style={{ marginLeft: "12px", color: "#666" }}>
            (ID: {selectedRows.map(r => r.id).join(", ")})
          </span>
        )}
        {selectedRows.length > 0 && (
          <button
            style={{
              marginLeft: "12px",
              padding: "6px 12px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => alert(`선택된 ID: ${selectedRows.map(r => r.id).join(", ")}`)}
          >
            선택이행
          </button>
        )}
      </div>

      <ServerGrid<JsonPlaceholderPost>
        columns={columns}
        queryFn={shootAPi.getPostsPaginated}
        initialPageSize={10}
        pageSizeOptions={[5, 10, 20]}
        enableSorting={true}
        enableGlobalFilter={true}
        enableRowSelection={true}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
}
