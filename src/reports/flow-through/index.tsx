import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { cn } from "@/lib/utils.ts";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { DataTable } from "@/reports/flow-through/_components/data-table.tsx";
import {
  columns,
  flowThroughDataProps,
} from "@/reports/flow-through/_components/columns.tsx";
import { useParams } from "react-router-dom";
import useHttp from "@/lib/use-http.ts";
import { useEffect, useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import FlowThroughCharts from "@/reports/flow-through/_components/chart.tsx";
import { filterData } from "@/reports/flow-through/lib/filterByDateRange.ts";

export default function FlowThroughReport() {
  const [searchProgramOrSite, setSearchProgramOrSite] = useState<
    string | undefined
  >();
  const [searchExitReason, setExitReason] = useState<string | undefined>();
  const { id } = useParams();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [originalData, setOriginalData] = useState<
    flowThroughDataProps[] | null
  >();
  const [tableData, setTableData] = useState<flowThroughDataProps[] | null>();
  const [chartType, setChartType] = useState<boolean>(false);

  const { fetchData, loading } = useHttp<any, flowThroughDataProps[]>();
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);

  const filter = () => {
    setTableData(
      filterData(originalData ?? [], {
        from: startDate,
        to: endDate,
        programOrSite: searchProgramOrSite,
        exitReason: searchExitReason,
      })
    );
  };

  const clearFilter = async () => {
    setTableData(originalData);
    setStartDate(undefined);
    setEndDate(undefined);
    setShowTotalResponse(false);
    setSearchProgramOrSite(undefined);
    setExitReason(undefined);
  };

  const SwitchToChart = () => {
    setChartType(!chartType);
  };

  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET"
    )) as flowThroughDataProps[];
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
        <h2 className="text-2xl font-semibold">Flow-Through Report</h2>
        {/*{JSON.stringify(tableData)}*/}
        <div className="flex items-center space-x-4">
          <Input
            className="w-72"
            placeholder="Search by Program/Site"
            value={searchProgramOrSite ?? ""}
            onChange={(e) => setSearchProgramOrSite(e.target.value)}
          />
          <Input
            className="w-72"
            placeholder="Search by Exit Reason"
            value={searchExitReason ?? ""}
            onChange={(e) => setExitReason(e.target.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span>Pick a start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {endDate ? (
                  format(endDate, "PPP")
                ) : (
                  <span>Pick a end date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="flex items-center space-x-2">
            <span>Total Responses</span>
            <Checkbox
              checked={showTotalResponse}
              onCheckedChange={(checked) => setShowTotalResponse(checked)}
            />
          </div>
          <Button onClick={filter}>Apply Filter</Button>
          <Button onClick={clearFilter} variant="outline">
            Clear Filter
          </Button>
          <Button variant={"ghost"} onClick={SwitchToChart}>
            Switch to Chart
          </Button>
        </div>
      </div>
      {chartType ? (
        <FlowThroughCharts data={tableData ?? []} />
      ) : (
        <DataTable columns={columns} data={tableData ?? []} />
      )}

      <div>{showTotalResponse && <p>total is {tableData?.length}</p>}</div>
    </div>
  );
}
