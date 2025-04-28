// filterData.ts
import { UseFormReturn } from "react-hook-form";
import { individualsReportProp } from "@/reports/individuals-report/_components/columns.tsx";

interface FilterParams {
  form: UseFormReturn<{
    individual?: string;
    program?: string;
  }>;
  originalData: individualsReportProp[];
}

export function filterData({
  form,
  originalData,
}: FilterParams): individualsReportProp[] {
  let filteredData = originalData ?? [];

  const { individual, program } = form.getValues();

  if (individual) {
    filteredData = filteredData.filter((data) =>
      data.person.toLowerCase().includes(individual.toLowerCase()),
    );
  }

  if (program) {
    filteredData = filteredData.filter((data) => {
      const siteValue = data.site ? data.site.toLowerCase() : "";
      return siteValue.includes(program.toLowerCase());
    });
  }

  return filteredData;
}
