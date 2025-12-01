"use client";

import { useState, useEffect } from "react";
import { CellContext } from "@tanstack/react-table";
import styles from "./EditableCell.module.css";

interface EditableCellProps<TData, TValue> extends CellContext<TData, TValue> {}

export function EditableCell<TData, TValue>({
  getValue,
  row,
  column,
  table,
}: EditableCellProps<TData, TValue>) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  // 외부 데이터가 변경되면 동기화
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData?.(row.index, column.id, value);
    setIsEditing(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      table.options.meta?.updateData?.(row.index, column.id, value);
      setIsEditing(false);
    }
    if (e.key === "Escape") {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        className={styles.editInput}
        value={value as string}
        onChange={(e) => setValue(e.target.value as TValue)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoFocus
      />
    );
  }

  return (
    <div
      className={styles.cellValue}
      onDoubleClick={() => setIsEditing(true)}
      title="더블클릭하여 편집"
    >
      {value as string}
    </div>
  );
}
