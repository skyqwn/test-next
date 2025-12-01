"use client";

import { useState, useMemo, useEffect, useRef, InputHTMLAttributes } from "react";
import {
  useReactTable,
  getCoreRowModel,
  SortingState,
  PaginationState,
  RowSelectionState,
  ColumnDef,
} from "@tanstack/react-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ServerGridProps } from "./types";
import { GridTable } from "./GridTable";
import { GridPagination } from "./GridPagination";
import styles from "./Grid.module.css";

// indeterminate 상태를 지원하는 체크박스 컴포넌트
function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return <input type="checkbox" ref={ref} {...rest} />;
}

export function ServerGrid<TData>({
  columns: userColumns,
  queryFn,
  initialPageSize = 10,
  pageSizeOptions = [10, 20, 50],
  enableSorting = true,
  enableGlobalFilter = true,
  enableRowSelection = false,
  onSelectionChange,
}: ServerGridProps<TData>) {
  // 상태 관리
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // 체크박스 컬럼 생성
  const selectColumn: ColumnDef<TData, unknown> = {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <IndeterminateCheckbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    size: 40,
  };

  // 컬럼 조합 (체크박스 + 사용자 컬럼)
  const columns = useMemo(() => {
    if (enableRowSelection) {
      return [selectColumn, ...userColumns];
    }
    return userColumns;
  }, [enableRowSelection, userColumns]);

  // queryKey 생성 - 상태 변경 시 자동 refetch
  const queryKey = useMemo(
    () => [
      "serverGrid",
      {
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sorting,
        globalFilter,
      },
    ],
    [pagination.pageIndex, pagination.pageSize, sorting, globalFilter]
  );

  // 서버 데이터 fetching
  const { data: result } = useSuspenseQuery({
    queryKey,
    queryFn: () =>
      queryFn({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sorting,
        globalFilter,
      }),
  });

  const { data, totalCount } = result;
  const pageCount = Math.ceil(totalCount / pagination.pageSize);

  // TanStack Table 설정
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      sorting,
      globalFilter,
      pagination,
      rowSelection,
    },
    enableRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // 서버사이드 페이지네이션
    manualSorting: true, // 서버사이드 정렬
    manualFiltering: true, // 서버사이드 필터링
  });

  // 선택된 행이 변경될 때 콜백 호출
  useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, onSelectionChange, table]);

  return (
    <div className={styles.gridContainer}>
      {/* 글로벌 필터 */}
      {enableGlobalFilter && (
        <div className={styles.filterWrapper}>
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              // 필터 변경 시 첫 페이지로 이동
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
            placeholder="검색..."
            className={styles.filterInput}
          />
        </div>
      )}

      {/* 테이블 */}
      <GridTable table={table} enableSorting={enableSorting} />

      {/* 페이지네이션 */}
      <GridPagination
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        pageCount={pageCount}
        totalCount={totalCount}
        pageSizeOptions={pageSizeOptions}
        canPreviousPage={pagination.pageIndex > 0}
        canNextPage={pagination.pageIndex < pageCount - 1}
        onPageChange={(pageIndex) =>
          setPagination((prev) => ({ ...prev, pageIndex }))
        }
        onPageSizeChange={(pageSize) =>
          setPagination({ pageIndex: 0, pageSize })
        }
      />
    </div>
  );
}
