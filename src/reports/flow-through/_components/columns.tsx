"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

export type flowThroughDataProps = {
  fileId: string;
  id: string;
  individual: string;
  programOrSite: string;
  startDate: Date;
  exitDate: Date;
  exitReason: "Graduated" | "Transferred";
};

export const columns: ColumnDef<flowThroughDataProps>[] = [
  {
    accessorKey: "individual",
    header: "Individual",
  },
  {
    accessorKey: "programOrSite",
    header: "Program or Site",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => formatDate(row.original.startDate),
  },
  {
    accessorKey: "exitDate",
    header: "Exit Date",
    cell: ({ row }) => formatDate(row.original.exitDate),
  },
  {
    accessorKey: "exitReason",
    header: "Exit Reason",
  },
];
