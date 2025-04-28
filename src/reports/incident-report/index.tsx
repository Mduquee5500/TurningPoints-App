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
import { DataTable } from "@/reports/incident-report/_components/data-table";
import {
  columns,
  incidentReportProps,
} from "@/reports/incident-report/_components/columns";
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
import IncidentReportCharts from "@/reports/incident-report/_components/chart";

import { filterData } from "@/lib/filterIncidentReport";

export default function IncidentReport() {
  const { id } = useParams();
  const [dateAndTimeOfIncident, setDateAndTimeOfIncident] = useState<Date>();
  const [tableData, setTableData] = useState<incidentReportProps[] | null>();
  const [chartType, setChartType] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<
    incidentReportProps[] | null
  >();
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);

  const { fetchData, loading } = useHttp<any, incidentReportProps[]>();

  const filter = () => {
    const filteredData = filterData({
      dateAndTimeOfIncident,
      form,
      originalData: originalData ?? [],
    });

    console.log("Filtered data: ", filteredData);
    setTableData(filteredData);
  };

  const FormSchema = z.object({
    individual: z.string(),
    programOrSite: z.string(),
    degreeOfInjury: z.string(),
    typeOfInjury: z.string(),
    typeOfSeriousIncident: z.string(),
    dateAndTimeOfIncident: z.date().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      individual: "",
      programOrSite: "",
      degreeOfInjury: "",
      typeOfInjury: "",
      typeOfSeriousIncident: "",
      dateAndTimeOfIncident: undefined,
    },
  });

  const clearFilter = async () => {
    setDateAndTimeOfIncident(undefined);
    setTableData(originalData ?? []);
    setShowTotalResponse(false);
    form.reset({
      individual: "",
      programOrSite: "",
      degreeOfInjury: "",
      typeOfInjury: "",
      typeOfSeriousIncident: "",
      dateAndTimeOfIncident: undefined,
    });
  };

  const SwitchToChart = () => {
    setChartType(!chartType);
  };

  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET"
    )) as incidentReportProps[];

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
        <h2 className="text-2xl font-semibold">Incident Report</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(filter)}
            className="flex flex-wrap gap-4 items-end"
          >
            {/* Individual Search */}
            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="individual"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Search by Individual" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Program or Site Search */}
              <FormField
                control={form.control}
                name="programOrSite"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Search by Program or Site"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Degree of Injury */}
              <FormField
                control={form.control}
                name="degreeOfInjury"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Search by Degree of Injury"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Type of Injury */}
            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="typeOfInjury"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Search by Type of Injury"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Type of Serious Incident */}
              <FormField
                control={form.control}
                name="typeOfSeriousIncident"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Search by Type Incident"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Date and Time of Incident */}
              <FormField
                control={form.control}
                name="dateAndTimeOfIncident"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date and time</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Total Responses Checkbox */}
            <div className="flex items-center space-x-2">
              <span>Total Responses</span>
              <Checkbox
                checked={showTotalResponse}
                onCheckedChange={(checked) =>
                  setShowTotalResponse(checked === true)
                }
              />
            </div>

            {/* Buttons for Filter and Clear Filter */}
            <Button onClick={filter}>Apply Filter</Button>
            <Button onClick={clearFilter} variant="outline">
              Clear Filter
            </Button>
            <Button type="button" variant={"ghost"} onClick={SwitchToChart}>
              Switch to Chart
            </Button>
          </form>
        </Form>
      </div>

      {chartType ? (
        <IncidentReportCharts data={tableData ?? []} />
      ) : (
        <DataTable columns={columns} data={tableData ?? []} />
      )}

      {showTotalResponse && (
        <div>
          <p>Total responses: {tableData?.length}</p>
        </div>
      )}
    </div>
  );
}
