import { UseFormReturn } from "react-hook-form";
import { overdoseSafetyPlanProps } from "../reports/overdose-safety-plan/_components/columns";

interface FilterParams {
  form: UseFormReturn<{
    individual?: string;
    programOrSite?: string;
  }>;
  originalData: overdoseSafetyPlanProps[];
}

export function filterData({
  form,
  originalData = [],
}: FilterParams): overdoseSafetyPlanProps[] {
  const { individual, programOrSite } = form.getValues();

  return (originalData || []).filter((item) => {
    const matchesIndividual =
      !individual ||
      item.Individual?.toLowerCase().includes(individual.toLowerCase());

    const matchesProgram =
      !programOrSite ||
      item.ProgramOrSite?.toLowerCase().includes(programOrSite.toLowerCase());

    return matchesIndividual && matchesProgram;
  });
}
