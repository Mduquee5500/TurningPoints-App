"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

export type goalsProgressProps = {
  fileId: string;
  id: string;
  completionDate: Date;
  discontinuedDate: Date;
  goalDescription: string;
  goalTitle: string;
  goalType: string;
  individual: string;
  personalOutcome: string;
  programResidence: string;
  startDate: Date;
};

export const columns: ColumnDef<goalsProgressProps>[] = [
  {
    accessorKey: "completionDate",
    header: "Completion Date",
    cell: ({ row }) => formatDate(row.original.completionDate),
  },
  {
    accessorKey: "discontinuedDate",
    header: "Discontinued Date",
    cell: ({ row }) => formatDate(row.original.discontinuedDate),
  },
  {
    accessorKey: "goalDescription",
    header: "Goal Description",
  },
  {
    accessorKey: "goalTitle",
    header: "Goal Title",
  },
  {
    accessorKey: "goalType",
    header: "Goal Type",
  },
  {
    accessorKey: "individual",
    header: "Individual",
  },
  {
    accessorKey: "personalOutcome",
    header: "Personal Outcome",
  },
  {
    accessorKey: "programResidence",
    header: "Program or Residence",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => formatDate(row.original.startDate),
  },
];
