import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/rent-supplement-request/_components/data-table";
import {
  columns,
  rentSupplementsProps,
} from "@/reports/rent-supplement-request/_components/columns";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";
import { useParams } from "react-router-dom";
import { searchByIndividual } from "@/reports/rent-supplement-request/lib/searchIndividual.ts";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export default function RentSupplementReport() {
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [originalData, setOriginalData] = useState<
    rentSupplementsProps[] | null
  >();
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);

  const [tableData, setTableData] = useState<rentSupplementsProps[] | null>();

  const { fetchData, loading } = useHttp<any, rentSupplementsProps[]>();

  const search = () => {
    const result = searchByIndividual(originalData ?? [], searchValue ?? "");
    setTableData(result);
  };

  const clearSearch = async () => {
    setTableData(originalData);
    setSearchValue(undefined);
  };

  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET",
    )) as rentSupplementsProps[];
    console.log(res);
    console.log(id);

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
      <h2 className="text-2xl font-semibold">Rent Supplement Request Report</h2>
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Input
            className={"w-72"}
            placeholder="search individual"
            value={searchValue ?? ""}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <span>Sum of total amount</span>
            <Checkbox
              checked={showTotalResponse}
              onCheckedChange={setShowTotalResponse}
            />
          </div>
          <Button onClick={search}>Search</Button>
          <Button onClick={clearSearch} variant="outline">
            Clear Search
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={tableData ?? []} />
      <div>{showTotalResponse && <p>total is {tableData?.length}</p>}</div>
    </div>
  );
}
