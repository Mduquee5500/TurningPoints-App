import { flowThroughDataProps } from "@/reports/flow-through/_components/columns.tsx";

interface DateRange {
  from?: Date;
  to?: Date;
}

interface FilterParams extends DateRange {
  programOrSite?: string;
  exitReason?: string;
}

export function filterData(
  data: flowThroughDataProps[],
  { from, to, programOrSite, exitReason }: FilterParams,
): flowThroughDataProps[] | undefined {
  let filteredData = data;

  // Filtrar por programOrSite si está presente
  if (programOrSite && programOrSite.trim() !== "") {
    filteredData = filteredData.filter((item) =>
      item.programOrSite?.toLowerCase().includes(programOrSite.toLowerCase())
    );
  }

  // Filtrar por exitReason si está presente
  if (exitReason && exitReason.trim() !== "") {
    filteredData = filteredData.filter((item) =>
      item.exitReason?.toLowerCase().includes(exitReason.toLowerCase())
    );
  }

  // Si no hay fechas, retornar lo que quedó filtrado
  if (!from && !to) {
    return filteredData;
  }

  // Si hay solo 'from'
  if (from && !to) {
    return filteredData.filter((item) => {
      const startDate = new Date(item.startDate);
      return startDate >= from;
    });
  }

  // Si hay solo 'to'
  if (!from && to) {
    return filteredData.filter((item) => {
      const exitDate = item.exitDate ? new Date(item.exitDate) : null;
      return exitDate ? exitDate <= to : false;
    });
  }

  // Si hay both 'from' and 'to'
  if (from && to) {
    return filteredData.filter((item) => {
      const startDate = new Date(item.startDate);
      const exitDate = item.exitDate ? new Date(item.exitDate) : null;
      return startDate >= from && (exitDate !== null && exitDate <= to);
    });
  }
}
