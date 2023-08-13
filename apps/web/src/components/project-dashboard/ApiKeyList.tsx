/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { toast } from "react-toastify";
import { DataGrid } from "../data-grid/DataGrid";
import type { TableColumnHeader } from "@/common/types";
import { useCallback } from "react";
import { Button } from "@nextui-org/react";

type CellProps = {
  hashedSecret: string;
  id: string;
  name: string;
  createdAt: Date;
};

const columnHeaders: TableColumnHeader<Omit<CellProps, "id">>[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "hashedSecret",
    label: "API Key",
  },
  {
    key: "createdAt",
    label: "Timestamp",
  },
  {
    key: "actions",
    label: "",
  },
];

const Cell = ({ createdAt, hashedSecret, name }: CellProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-[3] items-center">{name}</div>
      <div className="flex flex-1 items-center text-slate-400">{`${hashedSecret.slice(
        0,
        3
      )}....${hashedSecret.slice(
        hashedSecret.length - 3,
        hashedSecret.length - 1
      )}`}</div>
      <div className="flex flex-1 items-center text-slate-400">
        {createdAt.toLocaleString()}
      </div>
      <div className="flex flex-1 items-center">
        <div className="flex items-center justify-end gap-x-6 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
          <span
            className="cursor-pointer text-slate-400 hover:underline"
            onClick={(event) => {
              event.stopPropagation();
              navigator.clipboard.writeText(hashedSecret);
              toast("Copied to clipboard", { type: "info" });
            }}
          >
            Copy
          </span>
          <span
            className="cursor-pointer text-red-600 hover:underline"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export const ApiKeyList = ({ apiKeys }: { apiKeys: CellProps[] }) => {
  const renderCell = useCallback((apiKey: CellProps, columnKey: string) => {
    const cellValue = apiKey[columnKey as keyof CellProps];

    switch (columnKey) {
      case "name":
        return <span className="font-bold">{cellValue as string}</span>;
      case "hashedSecret":
        const { length } = cellValue as string;
        return (
          <span className="font-mono">
            NOTIFI-XXXXXXXXXXXXXXXXXXXX
            {(cellValue as string).slice(length - 4, length - 1)}
          </span>
        );
      case "createdAt":
        return <>{(cellValue as Date).toLocaleString()}</>;
      case "actions":
        return (
          <div className="flex gap-x-2">
            <Button color="secondary" variant="light">
              Copy
            </Button>
            <Button color="danger" variant="light">
              Delete
            </Button>
          </div>
        );
      default:
        return <>cellValue</>;
    }
  }, []);

  return (
    <DataGrid
      columnHeaders={columnHeaders}
      data={apiKeys}
      itemKey="id"
      loading={false}
      onNext={() => {}}
      onPrev={() => {}}
      renderCell={renderCell}
    />
  );
};
