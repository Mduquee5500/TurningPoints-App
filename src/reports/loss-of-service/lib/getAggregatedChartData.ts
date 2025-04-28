import { losOfServiceProps } from "@/reports/loss-of-service/_components/columns.tsx";

export function calculateLOSDays(start: string, end: string | null): number {
  if (!end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.max(
    0,
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
}

function groupByProgram(data: losOfServiceProps[]) {
  return data.reduce<Record<string, losOfServiceProps[]>>((acc, item) => {
    const key = item.ProgramOrSite || "Unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

export function getAggregatedChartData(
  value: string,
  data: losOfServiceProps[],
): { program: string; [key: string]: any }[] {
  const grouped = groupByProgram(data);

  switch (value) {
    case "Total Responses by Program/Site":
      return Object.entries(grouped).map(([program, items]) => ({
        program,
        count: items.length,
      }));

    case "Avg Length of LOS by Program/Site":
      return Object.entries(grouped).map(([program, items]) => {
        const totalDays = items.reduce(
          (sum, item) =>
            sum +
            calculateLOSDays(item.StartDateTimeOfLOS, item.EndDateTimeOfLOS),
          0,
        );
        return {
          program,
          avgLOS: items.length ? totalDays / items.length : 0,
        };
      });

    case "Critical Incidents % by Program/Site":
      return Object.entries(grouped).map(([program, items]) => {
        const criticalCount = items.filter(
          (item) => item.WasThisRelatedToACriticalIncident === "Yes",
        ).length;
        return {
          program,
          criticalPercent: items.length
            ? (criticalCount / items.length) * 100
            : 0,
        };
      });

    case "Total & Avg LOS by Program/Site":
      return Object.entries(grouped).map(([program, items]) => {
        const totalDays = items.reduce(
          (sum, item) =>
            sum +
            calculateLOSDays(item.StartDateTimeOfLOS, item.EndDateTimeOfLOS),
          0,
        );
        return {
          program,
          totalLOS: totalDays,
          avgLOS: items.length ? totalDays / items.length : 0,
        };
      });

    case "Total & Avg Review for TPCS LOS":
      return Object.entries(grouped).map(([program, items]) => {
        const reviewItems = items.filter(
          (item) => item.ReviewForTPCSLOS === "Yes",
        );
        const totalReviewDays = reviewItems.reduce(
          (sum, item) =>
            sum +
            calculateLOSDays(item.StartDateTimeOfLOS, item.EndDateTimeOfLOS),
          0,
        );
        return {
          program,
          reviewCount: reviewItems.length,
          avgReviewLOS: reviewItems.length
            ? totalReviewDays / reviewItems.length
            : 0,
        };
      });

    default:
      return [];
  }
}

export function getYAxisKeyByFilter(value: string) {
  switch (value) {
    case "Total Responses by Program/Site":
      return { key: "count", label: "Count" };
    case "Avg Length of LOS by Program/Site":
      return { key: "avgLOS", label: "Avg LOS (days)" };
    case "Critical Incidents % by Program/Site":
      return { key: "criticalPercent", label: "Critical %" };
    case "Total & Avg LOS by Program/Site":
      return { key: "totalLOS", label: "Total LOS (days)" };
    case "Total & Avg Review for TPCS LOS":
      return { key: "reviewCount", label: "Review Count" };
    default:
      return { key: "count", label: "Count" };
  }
}
