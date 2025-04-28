"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

export type losOfServiceProps = {
  EndDateTimeOfLOS: string;
  Individual: string;
  ManagerApproved: string;
  ProgramOrSite: string;
  RationaleForLOSMore48Hours: string;
  ReasonAndRationaleForRestriction: string;
  ReviewForTPCSLOS: string;
  StaffReporting: string;
  StartDateTimeOfLOS: string;
  WasThisRelatedToACriticalIncident: string;
  fileId: string;
  id: string;
};

export const columns: ColumnDef<losOfServiceProps>[] = [
  {
    accessorKey: "Individual",
    header: "Individual",
  },
  {
    accessorKey: "EndDateTimeOfLOS",
    header: "End Date",
    cell: ({ row }) => formatDate(new Date(row.original.EndDateTimeOfLOS)),
  },
  {
    accessorKey: "ManagerApproved",
    header: "Manager Approved",
  },
  {
    accessorKey: "ProgramOrSite",
    header: "Program or Site",
  },
  {
    accessorKey: "RationaleForLOSMore48Hours",
    header: "Rationale LOS",
  },
  {
    accessorKey: "ReasonAndRationaleForRestriction",
    header: "Reason Restriction",
  },
  {
    accessorKey: "ReviewForTPCSLOS",
    header: "Review TPCSLOS",
  },
  {
    accessorKey: "StaffReporting",
    header: "Staff Reporting",
  },
  {
    accessorKey: "StartDateTimeOfLOS",
    header: "Start Date",
    cell: ({ row }) => formatDate(new Date(row.original.StartDateTimeOfLOS)),
  },
  {
    accessorKey: "WasThisRelatedToACriticalIncident",
    header: "Related to Incident",
  },
];
