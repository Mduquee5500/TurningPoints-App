"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/lib/utils.ts";
// This type is used to define the shape of our data.
export interface ColumnsHeaderProps {
  id: string;
  filename: string;
  filetypeId: string;
  uploadtime: Date;
  filetype: {
    id: string;
    typename: string;
    createAt: Date;
  };
}

export const columns: ColumnDef<ColumnsHeaderProps>[] = [
  {
    accessorKey: "filename",
    header: "File Name",
  },
  {
    accessorKey: "filetypeId",
    header: "Filetype Id",
  },
  {
    accessorKey: "uploadtime",
    header: "upload time",
    cell: ({ row }) => formatDate(row.original.uploadtime),
  },
  {
    accessorKey: "id",
    header: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                const typename = row.original?.filetype?.typename;
                const id = row.original?.id;

                if (typename === "Flow Through" && id) {
                  navigate(`/report/flow-through/${id}`);
                }
                if (typename === "Loss of Service" && id) {
                  navigate(`/report/loss-of-service/${id}`);
                }
                if (typename === "Goals and Progress" && id) {
                  navigate(`/report/goals-and-progress/${id}`);
                }
                if (typename === "Incident Report" && id) {
                  navigate(`/report/incident-report/${id}`);
                }
                if (typename === "Individuals" && id) {
                  navigate(`/report/individuals-report/${id}`);
                }
                if (typename === "Overdose Safety Plan" && id) {
                  navigate(`/report/overdose-safety-plan/${id}`);
                }
                if (typename === "Safety Plan" && id) {
                  navigate(`/report/safety-plan/${id}`);
                }
                if (typename === "Rent Supplement Request" && id) {
                  navigate(`/report/rent-supplement-request/${id}`);
                }
                if (typename === "Shelter Diversion Follow-Up Log" && id) {
                  navigate(`/report/shelter-diversion-log/${id}`);
                }
                if (typename === "Site List" && id) {
                  navigate(`/report/site-list/${id}`);
                }
              }}
            >
              Check Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
