import { losOfServiceProps } from "@/reports/loss-of-service/_components/columns.tsx";

export const searchByIndividual = (
  data: losOfServiceProps[],
  keyword: string,
) => {
  const lowerKeyword = keyword.trim().toLowerCase();
  return data.filter((item) =>
    item.Individual.toLowerCase().includes(lowerKeyword),
  );
};
