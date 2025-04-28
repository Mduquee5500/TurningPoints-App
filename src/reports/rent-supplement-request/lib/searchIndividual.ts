import { rentSupplementsProps } from "@/reports/rent-supplement-request/_components/columns.tsx";

export const searchByIndividual = (
  data: rentSupplementsProps[],
  keyword: string,
) => {
  const lowerKeyword = keyword.trim().toLowerCase();
  return data.filter((item) =>
    item.Individual.toLowerCase().includes(lowerKeyword),
  );
};
