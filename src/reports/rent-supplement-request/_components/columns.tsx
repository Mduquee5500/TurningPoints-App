"use client";

import { ColumnDef } from "@tanstack/react-table";

export type rentSupplementsProps = {
  fileId: string;
  id: string;
  Individual: string;
  Notes: string;
  programOrSite: string;
};

export const columns: ColumnDef<rentSupplementsProps>[] = [
  {
    accessorKey: "Individual",
    header: "Individual",
  },
  {
    accessorKey: "Notes",
    header: "Notes",
  },
  {
    accessorKey: "programOrSite",
    header: "Program or Site",
  },
];
