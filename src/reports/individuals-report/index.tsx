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
import { DataTable } from "@/reports/individuals-report/_components/data-table";
import {
  columns,
  individualsReportProp,
} from "@/reports/individuals-report/_components/columns";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useParams } from "react-router-dom";
import { filterData } from "@/lib/filterIndividuals.ts";

const FormSchema = z.object({
  individual: z.string().optional(),
  program: z.string().optional(),
});

export default function IndividualsReport() {
  const { id } = useParams();
  const [originalData, setOriginalData] = useState<individualsReportProp[]>([]);
  const [filteredData, setFilteredData] = useState<individualsReportProp[]>([]);
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);
  const { fetchData, loading } = useHttp<any, individualsReportProp[]>();

  // Función de filtrado
  const filter = () => {
    const filteredData = filterData({
      form,
      originalData: originalData ?? [],
    });

    console.log("Filtered data: ", filteredData);
    setFilteredData(filteredData);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      individual: "",
      program: "",
    },
  });

  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET",
    )) as individualsReportProp[];
    setOriginalData(res);
    setFilteredData(res);
  };

  const clearFilters = () => {
    form.reset();
    setFilteredData(originalData);
    setShowTotalResponse(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Individuals Report</h2>

      <Form {...form}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-wrap items-center gap-4"
        >
          <FormField
            control={form.control}
            name="individual"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search by Individual"
                    {...field}
                    className="w-[220px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search by Program/Site"
                    {...field}
                    className="w-[260px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <span>Total Responses</span>
            <Checkbox
              checked={showTotalResponse}
              onCheckedChange={(checked) => setShowTotalResponse(checked)}
            />
          </div>
          <Button type="button" onClick={filter}>
            Apply Filter
          </Button>
          <Button type="button" onClick={clearFilters} variant="outline">
            Clear Filter
          </Button>
        </form>
      </Form>
      <DataTable columns={columns} data={filteredData} />

      {showTotalResponse && (
        <div className="text-sm text-muted-foreground">
          Total: {filteredData.length}
        </div>
      )}
    </div>
  );
}
