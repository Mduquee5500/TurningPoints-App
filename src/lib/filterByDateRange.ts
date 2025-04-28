import { flowThroughDataProps } from "@/reports/flow-through/_components/columns.tsx";

interface DateRange {
  from: Date;
  to: Date;
}

interface FilterControl {
  dateRange: DateRange;
  totalResponse: boolean;
}

interface FilterResult {
  filteredData: flowThroughDataProps[];
  count: number | null;
}

/**
 * 根据 dateRange 过滤数据，同时根据 totalResponse 是否计算 count
 * @param data - 原始数据
 * @param control - 控制项，包括 dateRange 和 totalResponse
 * @param includeExitDate - 是否也过滤 exitDate（默认 false）
 * @returns { filteredData, count }
 */
export function filterDataAndCount(
  data: flowThroughDataProps[],
  control: FilterControl,
  includeExitDate: boolean = false,
): FilterResult {
  const { dateRange, totalResponse } = control;

  const filteredData = data.filter((item) => {
    const start = new Date(item.startDate);
    const isStartValid = start >= dateRange.from && start <= dateRange.to;

    if (!includeExitDate) return isStartValid;

    const exit = item.exitDate ? new Date(item.exitDate) : null;
    const isExitValid = exit
      ? exit >= dateRange.from && exit <= dateRange.to
      : true;

    return isStartValid && isExitValid;
  });

  const count = totalResponse ? filteredData.length : null;

  return {
    filteredData,
    count,
  };
}
