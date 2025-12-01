"use client";

import styles from "./Grid.module.css";

interface GridPaginationProps {
  /** 현재 페이지 (0-indexed) */
  pageIndex: number;
  /** 페이지 사이즈 */
  pageSize: number;
  /** 전체 페이지 수 */
  pageCount: number;
  /** 전체 데이터 수 */
  totalCount: number;
  /** 페이지 사이즈 옵션 */
  pageSizeOptions?: number[];
  /** 이전 페이지 가능 여부 */
  canPreviousPage: boolean;
  /** 다음 페이지 가능 여부 */
  canNextPage: boolean;
  /** 페이지 변경 핸들러 */
  onPageChange: (pageIndex: number) => void;
  /** 페이지 사이즈 변경 핸들러 */
  onPageSizeChange: (pageSize: number) => void;
}

export function GridPagination({
  pageIndex,
  pageSize,
  pageCount,
  totalCount,
  pageSizeOptions = [10, 20, 50],
  canPreviousPage,
  canNextPage,
  onPageChange,
  onPageSizeChange,
}: GridPaginationProps) {
  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
        총 {totalCount}개 중 {startItem}-{endItem}개 표시
      </div>

      <div className={styles.paginationControls}>
        <button
          onClick={() => onPageChange(0)}
          disabled={!canPreviousPage}
          className={styles.pageButton}
        >
          {"<<"}
        </button>
        <button
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={!canPreviousPage}
          className={styles.pageButton}
        >
          {"<"}
        </button>

        <span className={styles.pageInfo}>
          {pageIndex + 1} / {pageCount || 1}
        </span>

        <button
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={!canNextPage}
          className={styles.pageButton}
        >
          {">"}
        </button>
        <button
          onClick={() => onPageChange(pageCount - 1)}
          disabled={!canNextPage}
          className={styles.pageButton}
        >
          {">>"}
        </button>

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className={styles.pageSizeSelect}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}개씩
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
