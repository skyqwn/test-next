import { ColumnDef, RowData, SortingState } from "@tanstack/react-table";

// TanStack Table meta 타입 확장
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export interface GridProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  /** 페이지네이션 사용 여부 */
  enablePagination?: boolean;
  /** 페이지 사이즈 옵션 */
  pageSizeOptions?: number[];
  /** 정렬 사용 여부 */
  enableSorting?: boolean;
  /** 글로벌 필터 사용 여부 */
  enableGlobalFilter?: boolean;
  /** 데이터 업데이트 핸들러 (편집 시 사용) */
  onDataChange?: (data: TData[]) => void;
}

// ============================================
// ServerGrid 타입
// ============================================

export interface ServerGridFetchParams {
  page: number;
  pageSize: number;
  sorting?: SortingState;
  globalFilter?: string;
}

export interface ServerGridFetchResult<TData> {
  data: TData[];
  totalCount: number;
}

export interface ServerGridProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  /** 서버에서 데이터를 가져오는 함수 */
  queryFn: (params: ServerGridFetchParams) => Promise<ServerGridFetchResult<TData>>;
  /** 초기 페이지 사이즈 */
  initialPageSize?: number;
  /** 페이지 사이즈 옵션 */
  pageSizeOptions?: number[];
  /** 정렬 사용 여부 */
  enableSorting?: boolean;
  /** 글로벌 필터 사용 여부 */
  enableGlobalFilter?: boolean;
  /** 행 선택(체크박스) 사용 여부 */
  enableRowSelection?: boolean;
  /** 선택된 행이 변경될 때 콜백 */
  onSelectionChange?: (selectedRows: TData[]) => void;
}
