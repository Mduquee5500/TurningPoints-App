import { safetyPlanProps } from "@/reports/safety-plan/_components/columns.tsx";

export const searchSafetyPlans = (
  data: safetyPlanProps[],
  options: {
    individual?: string;
    programOrSite?: string;
  },
): safetyPlanProps[] => {
  const { individual, programOrSite } = options;

  const individualKeyword = individual?.trim().toLowerCase() ?? "";
  const programKeyword = programOrSite?.trim().toLowerCase() ?? "";

  return data.filter((item) => {
    const matchesIndividual = individualKeyword
      ? item.individual?.toLowerCase().includes(individualKeyword)
      : true;

    const matchesProgram = programKeyword
      ? item.programOrSite?.toLowerCase().includes(programKeyword)
      : true;

    return matchesIndividual && matchesProgram;
  });
};
