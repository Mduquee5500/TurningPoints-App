import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/loss-of-service/_components/data-table.tsx";
import {
  columns,
  losOfServiceProps,
} from "@/reports/loss-of-service/_components/columns.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";
import { useParams } from "react-router-dom";
import { searchByIndividual } from "@/reports/loss-of-service/lib/searchIndividual.ts";
import { getFilteredLOSDataByType } from "@/reports/loss-of-service/lib/filter.ts";
import LosOfServiceCharts from "@/reports/loss-of-service/_components/chart.tsx";

const filters = [
  {
    label: "Total Responses by Program/Site",
    value: "Total Responses by Program/Site",
  },
  {
    label: "Avg Length of LOS by Program/Site",
    value: "Avg Length of LOS by Program/Site",
  },
  {
    label: "Critical Incidents % by Program/Site",
    value: "Critical Incidents % by Program/Site",
  },
  {
    label: "Total & Avg LOS by Program/Site",
    value: "Total & Avg LOS by Program/Site",
  },
  {
    label: "Total & Avg Review for TPCS LOS",
    value: "Total & Avg Review for TPCS LOS",
  },
];

export default function LossOfServiceReport() {
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [originalData, setOriginalData] = useState<
    losOfServiceProps[] | null
  >();
  const [tableData, setTableData] = useState<losOfServiceProps[] | null>();
  const [filterValue, setFilterValue] = useState("");
  const [chartType, setChartType] = useState<boolean>(false);

  const { fetchData, loading } = useHttp<any, losOfServiceProps[]>();

  const search = () => {
    const result = searchByIndividual(originalData ?? [], searchValue ?? "");
    setTableData(result);
  };

  const filterTable = (value: string) => {
    const filtered = getFilteredLOSDataByType(value, originalData ?? []);
    setTableData(filtered);
    setFilterValue(value);
  };

  const clearSearch = async () => {
    setTableData(originalData);
    setSearchValue(undefined);
  };

  const SwitchToChart = () => {
    setChartType(!chartType);
  };

  const getData = async () => {
    const res = (await fetchData(`report/${id}`, "GET")) as losOfServiceProps[];

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
      <h2 className="text-2xl font-semibold">Flow-Through Report</h2>
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Input
            className={"w-72"}
            placeholder="search individual"
            value={searchValue ?? ""}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button onClick={search}>Search</Button>
          <Button onClick={clearSearch} variant="outline">
            Clear Search
          </Button>
          <Button variant={"ghost"} onClick={SwitchToChart}>
            Switch to Chart
          </Button>
        </div>
        <div>
          <Select onValueChange={filterTable}>
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent>
              {filters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {chartType ? (
        <LosOfServiceCharts data={tableData ?? []} filterKey={filterValue} />
      ) : (
        <DataTable columns={columns} data={tableData ?? []} />
      )}
    </div>
  );
}
