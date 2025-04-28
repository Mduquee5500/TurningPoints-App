"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

export type overdoseSafetyPlanProps = {
  fileId: string;
  id: string;
  CrisisContacts: string;
  Individual: string;
  ProgramOrSite: string;
  RiskFactors: string;
  RiskReductionActions: string;
  StaffMember: string;
  SupportPeople: string;
  TodaysDate: Date;
  WellnessHabits: string;
};

export const columns: ColumnDef<overdoseSafetyPlanProps>[] = [
  {
    accessorKey: "CrisisContacts",
    header: "Crisis Contact",
  },
  {
    accessorKey: "Individual",
    header: "Individual",
  },
  {
    accessorKey: "ProgramOrSite",
    header: "Program or Site",
  },
  {
    accessorKey: "RiskFactors",
    header: "Risk Factors",
  },
  {
    accessorKey: "RiskReductionActions",
    header: "Risk Reduction Actions",
  },
  {
    accessorKey: "StaffMember",
    header: "Staff Member",
  },
  {
    accessorKey: "SupportPeople",
    header: "Support People",
  },
  {
    accessorKey: "TodaysDate",
    header: "Today's Date",
    cell: ({ row }) => formatDate(row.original.TodaysDate),
  },
  {
    accessorKey: "WellnessHabits",
    header: "Wellness Habits",
  },
];
