"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

export type incidentReportProps = {
  individual: any;
  fileId: string;
  id: string;
  clientInvolved: string;
  programOrSite: string;
  dateAndTimeOfIncident: Date;
  degreeOfInjury: string;
  typeOfInjury: string;
  typeOfSeriousIncident: string;
};

export const columns: ColumnDef<incidentReportProps>[] = [
  {
    accessorKey: "clientInvolved",
    header: "Client Involved",
  },
  {
    accessorKey: "programOrSite",
    header: "Program Or Site",
  },
  {
    accessorKey: "dateAndTimeOfIncident",
    header: "Date and Time of Incident",
    cell: ({ row }) => formatDate(row.original.dateAndTimeOfIncident),
  },
  {
    accessorKey: "degreeOfInjury",
    header: "Degree of Injury",
  },
  {
    accessorKey: "typeOfInjury",
    header: "Type of Injury",
  },
  {
    accessorKey: "typeOfSeriousIncident",
    header: "Type of Serious Incident",
  },
];
