"use client";

import { Table, flexRender } from "@tanstack/react-table";
import styles from "./Grid.module.css";

interface GridTableProps<TData> {
  table: Table<TData>;
  enableSorting?: boolean;
}

export function GridTable<TData>({
  table,
  enableSorting = true,
}: GridTableProps<TData>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={styles.th}
                  onClick={
                    enableSorting && header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  style={{
                    cursor:
                      enableSorting && header.column.getCanSort()
                        ? "pointer"
                        : "default",
                  }}
                >
                  <div className={styles.headerContent}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {enableSorting && header.column.getCanSort() && (
                      <span className={styles.sortIcon}>
                        {{
                          asc: " ▲",
                          desc: " ▼",
                        }[header.column.getIsSorted() as string] ?? " ⇅"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.tr}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
