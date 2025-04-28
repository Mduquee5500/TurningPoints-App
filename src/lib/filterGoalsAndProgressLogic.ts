// filterData.ts
import { UseFormReturn } from "react-hook-form";
import { goalsProgressProps } from "@/reports/goals-and-progress/_components/columns.tsx";

interface FilterParams {
  startDate?: Date;
  completionDate?: Date;
  discontinuedDate?: Date;
  form: UseFormReturn<{
    individual: string;
    programSite: string;
    goalType?: string;
  }>;
  originalData: goalsProgressProps[];
}

export function filterData({
  startDate,
  completionDate,
  discontinuedDate,
  form,
  originalData,
}: FilterParams): goalsProgressProps[] {
  let filteredData = originalData ?? [];

  if (startDate) {
    filteredData = filteredData.filter((data) => {
      const itemStartDate = new Date(data.startDate);
      return itemStartDate >= startDate;
    });
  }

  if (completionDate) {
    filteredData = filteredData.filter((data) => {
      const itemCompletionDate = new Date(data.completionDate);
      return itemCompletionDate <= completionDate;
    });
  }

  if (discontinuedDate) {
    filteredData = filteredData.filter((data) => {
      const itemDiscontinuedDate = new Date(data.discontinuedDate);
      return itemDiscontinuedDate <= discontinuedDate;
    });
  }

  if (form.getValues().individual) {
    filteredData = filteredData.filter((data) =>
      data.individual
        .toLowerCase()
        .includes(form.getValues().individual.toLowerCase()),
    );
  }

  if (form.getValues().programSite) {
    filteredData = filteredData.filter((data) =>
      data.programResidence
        .toLowerCase()
        .includes(form.getValues().programSite.toLowerCase()),
    );
  }

  const goalTypeValue = form.getValues().goalType?.trim();

  if (goalTypeValue) {
    filteredData = filteredData.filter((data) => {
      return (
        data.goalType &&
        data.goalType.toLowerCase().includes(goalTypeValue.toLowerCase())
      );
    });
  }

  return filteredData;
}
