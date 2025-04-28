import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { flowThroughDataProps } from "@/reports/flow-through/_components/columns.tsx";

interface Props {
  data: flowThroughDataProps[];
}

export default function FlowThroughCharts({ data }: Props) {
  const { startChartData, exitChartData } = useMemo(() => {
    const startMap: Record<string, number> = {};
    const exitMap: Record<string, number> = {};

    data.forEach((item) => {
      const start = new Date(item.startDate);
      const startKey = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`;
      startMap[startKey] = (startMap[startKey] || 0) + 1;

      if (item.exitDate) {
        const exit = new Date(item.exitDate);
        const exitKey = `${exit.getFullYear()}-${String(exit.getMonth() + 1).padStart(2, "0")}`;
        exitMap[exitKey] = (exitMap[exitKey] || 0) + 1;
      } else {
        exitMap["NaT"] = (exitMap["NaT"] || 0) + 1;
      }
    });

    const toSortedArray = (map: Record<string, number>) =>
      Object.entries(map)
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => (a.month > b.month ? 1 : -1));

    return {
      startChartData: toSortedArray(startMap),
      exitChartData: toSortedArray(exitMap),
    };
  }, [data]);

  const formatMonth = (month: string) => {
    if (month === "NaT") return "No Exit Date";
    const [year, m] = month.split("-");
    return `${m}/${year.slice(-2)}`;
  };

  const recentStartData = startChartData.slice(-12);
  const recentExitData = exitChartData.slice(-12);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-10">
      {/* Start Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Number Of Individuals Started Per Month
        </h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={recentStartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 10 }}
                tickFormatter={formatMonth}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f87171" name="Count" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">
              📊 <strong>Start Date Count per Month</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {recentStartData.map(({ month, count }) => (
                <li key={month}>
                  {formatMonth(month)}: {count} person(s)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Exit Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Number Of Individuals Exited Per Month
        </h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={recentExitData}
              margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 10 }}
                tickFormatter={formatMonth}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#60a5fa" name="Count" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">
              📅 <strong>Exit Date Count per Month</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {recentExitData.map(({ month, count }) => (
                <li key={month}>
                  {month === "NaT" ? (
                    <>
                      <code>NaT</code> means individuals{" "}
                      <strong>without exit date</strong>
                    </>
                  ) : (
                    `${formatMonth(month)}: ${count} person(s)`
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
