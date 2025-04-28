"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

export type shelderDiversionFollowupProps = {
  fileId: string;
  id: string;
  community: string;
  currentGoals: string;
  currentGoalsDescription: string;
  diversionCost: number;
  diversionMethod: string;
  divertedTo: string;
  evictionPrevention: string;
  followUpLog: string;
  initialFollowUpDate: Date;
  referralLog: string;
  successfulDiversion: string;
};

export const columns: ColumnDef<shelderDiversionFollowupProps>[] = [
  {
    accessorKey: "community",
    header: "Community",
  },
  {
    accessorKey: "currentGoals",
    header: "Current Goals",
  },
  {
    accessorKey: "currentGoalsDescription",
    header: "Current Goals Description",
  },
  {
    accessorKey: "diversionCost",
    header: "Diversion Cost",
  },
  {
    accessorKey: "diversionMethod",
    header: "Diversion Method",
  },
  {
    accessorKey: "divertedTo",
    header: "Diverted To",
  },
  {
    accessorKey: "evictionPrevention",
    header: "Eviction Prevention",
  },
  {
    accessorKey: "followUpLog",
    header: "Follow-Up Log",
  },
  {
    accessorKey: "initialFollowUpDate",
    header: "Initial Follow-Up Date",
    cell: ({ row }) => formatDate(row.original.initialFollowUpDate),
  },
  {
    accessorKey: "referralLog",
    header: "Referral Log",
  },
  {
    accessorKey: "successfulDiversion",
    header: "Successfull Diversion",
  },
];
