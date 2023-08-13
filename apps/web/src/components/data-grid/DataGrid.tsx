// import { Pagination } from "./Pagination";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
} from "@nextui-org/react";
import type { TableColumnHeader } from "@/common/types";

type Props<T> = {
  data: T[];
  itemKey: keyof T;
  columnHeaders: TableColumnHeader<T>[];
  onPageChange: (updatedPageNumber: number) => void;
  loading: boolean;
  displayPagination?: boolean;
  renderCell?: (item: T, columnKey: string) => JSX.Element;
  rowCount?: number;
};

export const DataGrid = <T,>({
  columnHeaders,
  data,
  itemKey,
  displayPagination = false,
  renderCell,
  rowCount = 10,
  onPageChange,
}: Props<T>) => {
  return (
    <>
      <Table isStriped>
        <TableHeader columns={columnHeaders}>
          {(column) => (
            <TableColumn
              key={column.key as string}
              align={column.key === "actions" ? "center" : "start"}
              allowsResizing
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data}
          emptyContent={<>Yay! No errors reported. All cool!</>}
        >
          {(item) => (
            <TableRow key={item[itemKey] as string}>
              {(columnKey) => (
                <TableCell>
                  {renderCell
                    ? renderCell(item, columnKey as string)
                    : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {displayPagination && (
        <Pagination
          total={rowCount}
          initialPage={0}
          isCompact
          showControls
          showShadow
          onChange={onPageChange}
        />
      )}
    </>
  );
};
