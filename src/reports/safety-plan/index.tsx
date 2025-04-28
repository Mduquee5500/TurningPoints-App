import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/safety-plan/_components/data-table";
import {
  columns,
  safetyPlanProps,
} from "@/reports/safety-plan/_components/columns";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";
import { useParams } from "react-router-dom";
import { searchSafetyPlans } from "@/reports/safety-plan/lib/searchSafetyPlans.ts";

export default function SafetyPlan() {
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [searchProgramOrSite, setSearchProgramOrSite] = useState<
    string | undefined
  >();
  const [originalData, setOriginalData] = useState<safetyPlanProps[] | null>();
  const [tableData, setTableData] = useState<safetyPlanProps[] | null>();

  const { fetchData, loading } = useHttp<any, safetyPlanProps[]>();

  const search = () => {
    const result = searchSafetyPlans(originalData ?? [], {
      individual: searchValue,
      programOrSite: searchProgramOrSite,
    });
    setTableData(result);
  };

  const clearSearch = async () => {
    setTableData(originalData);
    setSearchValue(undefined);
    setSearchProgramOrSite(undefined);
  };

  const getData = async () => {
    const res = (await fetchData(`report/${id}`, "GET")) as safetyPlanProps[];

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
      <h2 className="text-2xl font-semibold">Safety Plan Report</h2>
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Input
            className={"w-72"}
            placeholder="search individual"
            value={searchValue ?? ""}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Input
            className={"w-72"}
            placeholder="search program / site"
            value={searchProgramOrSite ?? ""}
            onChange={(e) => setSearchProgramOrSite(e.target.value)}
          />
          <Button onClick={search}>Search</Button>
          <Button onClick={clearSearch} variant="outline">
            Clear Search
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={tableData || []} />
    </div>
  );
}
