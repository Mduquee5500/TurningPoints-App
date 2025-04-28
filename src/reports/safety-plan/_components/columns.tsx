"use client";

import { ColumnDef } from "@tanstack/react-table";

export type safetyPlanProps = {
  fileId: string;
  id: string;
  individual: string;
  programOrSite: string;
  selfSoothingStrategies: string;
  reasonsForLiving: string;
  supportConnections: string;
  safeSpaces: string;
};

export const columns: ColumnDef<safetyPlanProps>[] = [
  {
    accessorKey: "individual",
    header: "Individual",
  },
  {
    accessorKey: "programOrSite",
    header: "Program or Site",
  },
  {
    accessorKey: "selfSoothingStrategies",
    header: "Self-soothing Strategies",
  },
  {
    accessorKey: "reasonsForLiving",
    header: "Reasons For Living",
  },
  {
    accessorKey: "supportConnections",
    header: "Support Connections",
  },
  {
    accessorKey: "safeSpaces",
    header: "Safe Spaces",
  },
];
