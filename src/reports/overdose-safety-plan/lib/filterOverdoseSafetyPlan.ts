import { overdoseSafetyPlanProps } from "@/reports/overdose-safety-plan/_components/columns";

interface FilterOptions {
  data: overdoseSafetyPlanProps[];
  individual?: string;
  programOrSite?: string;
}

export function filterData({
  data,
  individual,
  programOrSite,
}: FilterOptions): overdoseSafetyPlanProps[] {
  return data.filter((item) => {
    const matchesIndividual = individual
      ? item.Individual?.toLowerCase().includes(individual.toLowerCase())
      : true;

    const matchesProgram = programOrSite
      ? item.ProgramOrSite?.toLowerCase().includes(programOrSite.toLowerCase())
      : true;

    return matchesIndividual && matchesProgram;
  });
}
