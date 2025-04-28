import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { Calendar } from "@/components/ui/calendar.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/shelter-diversion-log/_components/data-table";
import {
  columns,
  shelderDiversionFollowupProps,
} from "@/reports/shelter-diversion-log/_components/columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select.tsx";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";
import { useParams } from "react-router-dom";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/ui/checkbox.tsx";

import { filterData } from "@/lib/filterShelterDiversion";
import ShelterDiversionChart from "./_components/chart";

export default function ShelterDiversion() {
  const [searchDivertedTo, setDivertedTo] = useState<string | undefined>();
  const [searchDiversionMethod, setDiversionMethod] = useState<
    string | undefined
  >();
  const { id } = useParams();
  const [chartType, setChartType] = useState<boolean>(false);
  const [initialFollowUpDate, setInitialFollowUpDate] = useState<Date>();
  const [originalData, setOriginalData] = useState<
    shelderDiversionFollowupProps[] | null
  >();
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);
  const [tableData, setTableData] = useState<
    shelderDiversionFollowupProps[] | null
  >();

  const { fetchData, loading } = useHttp<
    any,
    shelderDiversionFollowupProps[]
  >();

  const filter = () => {
    const filteredData = filterData({
      form,
      originalData: originalData ?? [],
      divertedTo: searchDivertedTo,
      diversionMethod: searchDiversionMethod,
    });

    console.log("Filtered data: ", filteredData);
    setTableData(filteredData);
  };

  const FormSchema = z.object({
    community: z.string().optional(),
    evictionPrevention: z.string().optional(),
    successfullDiversion: z.string().optional(),
    initialFollowUpDate: z.date().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      community: "",
      evictionPrevention: "",
      initialFollowUpDate: undefined,
      successfullDiversion: "",
    },
  });

  const clearFilter = async () => {
    setInitialFollowUpDate(undefined);
    setTableData(originalData ?? []);
    setShowTotalResponse(false);
    setDiversionMethod(undefined);
    setDivertedTo(undefined);
    form.reset({
      community: "",
      evictionPrevention: "",
      initialFollowUpDate: undefined,
      successfullDiversion: "",
    });
  };

  const SwitchToChart = () => {
    setChartType(!chartType);
  };

  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET"
    )) as shelderDiversionFollowupProps[];

    console.log("Fetched Data: ", res);
    console.log("ID:", id);

    setTableData(res);
    setOriginalData(res);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="sticky top-0 left-0 bg-white z-50 flex flex-col justify-center space-y-4">
        <h2 className="text-2xl font-semibold">
          Shelter Diversion Follow-Up Report
        </h2>

        <div className="flex flex-wrap gap-4 items-center">
          <Input
            className="w-72"
            placeholder="Diverted To"
            value={searchDivertedTo ?? ""}
            onChange={(e) => setDivertedTo(e.target.value)}
          />
          <Input
            className="w-72"
            placeholder="Search by Diversion Method"
            value={searchDiversionMethod ?? ""}
            onChange={(e) => setDiversionMethod(e.target.value)}
          />
          {/* Filter by Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !initialFollowUpDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {initialFollowUpDate ? (
                  format(initialFollowUpDate, "PPP")
                ) : (
                  <span>Pick a Follow-up Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={initialFollowUpDate}
                onSelect={(date) => {
                  setInitialFollowUpDate(date);
                  form.setValue("initialFollowUpDate", date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Filter by Community */}
          <Input
            placeholder="Filter by Community"
            value={form.watch("community")}
            onChange={(e) => form.setValue("community", e.target.value)}
            className="w-[240px]"
          />

          {/* Filter by Eviction Prevention */}
          <Select
            value={form.watch("evictionPrevention")}
            onValueChange={(val) => form.setValue("evictionPrevention", val)}
          >
            <SelectTrigger className="w-[200px]">
              {form.watch("evictionPrevention") || "Eviction Prevention"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter by Successful Diversion */}
          <Select
            value={form.watch("successfullDiversion")}
            onValueChange={(val) => form.setValue("successfullDiversion", val)}
          >
            <SelectTrigger className="w-[200px]">
              {form.watch("successfullDiversion") || "Successful Diversion"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>

          {/* Show total count */}
          <div className="flex items-center space-x-2">
            <span>Total Responses</span>
            <Checkbox
              checked={showTotalResponse}
              onCheckedChange={(checked) =>
                setShowTotalResponse(checked === true)
              }
            />
          </div>

          {/* Actions */}
          <Button onClick={filter}>Apply Filter</Button>
          <Button onClick={clearFilter} variant="outline">
            Clear Filter
          </Button>
          <Button variant={"ghost"} onClick={SwitchToChart}>
            {chartType ? "Show Table" : "Show Chart"}
          </Button>
        </div>
      </div>

      {/* Visualization */}
      <div className="pt-4">
        {chartType ? (
          <ShelterDiversionChart data={tableData ?? []} />
        ) : (
          <DataTable columns={columns} data={tableData ?? []} />
        )}
        <div>{showTotalResponse && <p>total is {tableData?.length}</p>}</div>
      </div>
    </div>
  );
}
