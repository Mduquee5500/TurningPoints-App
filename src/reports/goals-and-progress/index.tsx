import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/goals-and-progress/_components/data-table.tsx";
import {
  columns,
  goalsProgressProps,
} from "@/reports/goals-and-progress/_components/columns";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { cn } from "@/lib/utils.ts";
import { Calendar } from "@/components/ui/calendar.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { useParams } from "react-router-dom";
import { CheckedState } from "@radix-ui/react-checkbox";
import GoalsAndProgressCharts from "./_components/chart";

import { filterData } from "@/lib/filterGoalsAndProgressLogic";

export default function GoalsProgressReport() {
  const { id } = useParams();
  const [startDate, setStartDate] = useState<Date>();
  const [discontinuedDate, setDiscontinuedDate] = useState<Date>();
  const [completionDate, setCompletionDate] = useState<Date>();
  const [originalData, setOriginalData] = useState<
    goalsProgressProps[] | null
  >();
  const [tableData, setTableData] = useState<goalsProgressProps[] | null>();
  const [chartType, setChartType] = useState<boolean>(false);

  const { fetchData, loading } = useHttp<any, goalsProgressProps[]>();
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);

  const filter = () => {
    console.log("Filtering with:");
    console.log("Start Date: ", startDate);
    console.log("Completion Date: ", completionDate);
    console.log("Discontinued Date: ", discontinuedDate);
    console.log("Form Data: ", form.getValues());

    const filteredData = filterData({
      startDate,
      completionDate,
      discontinuedDate,
      form,
      originalData: originalData ?? [],
    });

    console.log("Filtered data: ", filteredData);
    setTableData(filteredData);
  };

  const FormSchema = z.object({
    individual: z.string(),
    programSite: z.string(),
    goalType: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      individual: undefined,
      programSite: undefined,
      goalType: undefined,
    },
  });

  const onSubmitIndividual = (data: z.infer<typeof FormSchema>) => {
    console.log("Searching by individual: ", data);
  };

  const onSubmitProgram = (data: z.infer<typeof FormSchema>) => {
    console.log("Searching by program/site: ", data);
  };

  const onSubmitGoalType = (data: z.infer<typeof FormSchema>) => {
    console.log("Goal Type Submitted:", data);
  };

  const clearFilter = async () => {
    setTableData(originalData);
    setStartDate(undefined);
    setDiscontinuedDate(undefined);
    setCompletionDate(undefined);
    setShowTotalResponse(false);
    form.reset({
      individual: "",
      programSite: "",
      goalType: "",
    });
  };

  const SwitchToChart = () => {
    setChartType(!chartType);
  };

  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET",
    )) as goalsProgressProps[];

    console.log("Fetched Data: ", res);
    console.log("ID:", id);

    setTableData(Array.isArray(res) ? res : []);
    setOriginalData(Array.isArray(res) ? res : []);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Goals And Progress Report</h2>
      <div className="flex justify-between">
        <div className="flex flex-col space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitIndividual)}
              className="flex items-center space-x-0"
            >
              <FormField
                control={form.control}
                name="individual"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="search individual" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitProgram)}
              className="flex items-center space-x-0"
            >
              <FormField
                control={form.control}
                name="programSite"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="search program/site" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitGoalType)}
              className="flex items-center space-x-0"
            >
              <FormField
                control={form.control}
                name="goalType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="search goal type" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="flex items-center space-x-[160px]">
          <div className="flex flex-col space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground",
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
                    !completionDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {completionDate ? (
                    format(completionDate, "PPP")
                  ) : (
                    <span>Pick a completion date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={completionDate}
                  onSelect={setCompletionDate}
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
                    !discontinuedDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {discontinuedDate ? (
                    format(discontinuedDate, "PPP")
                  ) : (
                    <span>Pick a discontinued date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={discontinuedDate}
                  onSelect={setDiscontinuedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

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
          <Button
            variant={"ghost"}
            className="inline-block"
            onClick={SwitchToChart}
          >
            Switch to Chart
          </Button>
        </div>
      </div>

      {chartType ? (
        <GoalsAndProgressCharts data={tableData ?? []} />
      ) : (
        <DataTable columns={columns} data={tableData ?? []} />
      )}

      {showTotalResponse && (
        <div className="mt-4">Total responses: {tableData?.length}</div>
      )}
    </div>
  );
}
