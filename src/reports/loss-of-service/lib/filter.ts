import { losOfServiceProps } from "@/reports/loss-of-service/_components/columns.tsx";

export function getFilteredLOSDataByType(
  value: string,
  data: losOfServiceProps[],
): losOfServiceProps[] {
  switch (value) {
    case "Total Responses by Program/Site":
      // 假设筛选出 ProgramOrSite 不为 null 的记录
      return data.filter((item) => item.ProgramOrSite !== null);

    case "Avg Length of LOS by Program/Site":
      // 筛选出 Start 和 End 都存在的记录
      return data.filter(
        (item) => item.StartDateTimeOfLOS && item.EndDateTimeOfLOS,
      );

    case "Critical Incidents % by Program/Site":
      // 筛选出与关键事件相关的记录
      return data.filter(
        (item) =>
          item.ProgramOrSite &&
          item.WasThisRelatedToACriticalIncident === "Yes",
      );

    case "Total & Avg LOS by Program/Site":
      // 同样需要有 Start 和 End 的记录
      return data.filter(
        (item) =>
          item.ProgramOrSite &&
          item.StartDateTimeOfLOS &&
          item.EndDateTimeOfLOS,
      );

    case "Total & Avg Review for TPCS LOS":
      // 筛选出 TPCS Review 为 Yes 的记录
      return data.filter(
        (item) => item.ProgramOrSite && item.ReviewForTPCSLOS === "Yes",
      );

    default:
      return [];
  }
}
