"use client";

import { ColumnDef } from "@tanstack/react-table";

export type siteListProps = {
  fileId: string;
  id: string;
  Address: string;
  City: string;
  HousingType: string;
  ManagerOrSite: string;
  ManagerPhoneNumber: number;
  Site: string;
  SitePhoneNumber: number;
};

export const columns: ColumnDef<siteListProps>[] = [
  {
    accessorKey: "Address",
    header: "Address",
  },
  {
    accessorKey: "City",
    header: "City",
  },
  {
    accessorKey: "HousingType",
    header: "Housing Type",
  },
  {
    accessorKey: "ManagerOrSite",
    header: "Manager Or Site",
  },
  {
    accessorKey: "ManagerPhoneNumber",
    header: "Manager's Phone Number",
  },
  {
    accessorKey: "Site",
    header: "Site",
  },
  {
    accessorKey: "SitePhoneNumber",
    header: "Site Phone Number",
  },
];
