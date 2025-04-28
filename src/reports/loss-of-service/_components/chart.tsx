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
import { losOfServiceProps } from "@/reports/loss-of-service/_components/columns.tsx";
import {
  getAggregatedChartData,
  getYAxisKeyByFilter,
} from "@/reports/loss-of-service/lib/getAggregatedChartData.ts";

interface Props {
  data: losOfServiceProps[];
  filterKey: string; // 来自外部 filters.value
}

export default function LosOfServiceCharts({ data, filterKey }: Props) {
  const chartData = getAggregatedChartData(filterKey, data);
  const { key: yKey, label: yLabel } = getYAxisKeyByFilter(filterKey);

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-10">
      {/* Chart */}
      <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
        <ResponsiveContainer width={"100%"} height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="program"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yKey} fill="#60a5fa" name={yLabel} />
          </BarChart>
        </ResponsiveContainer>

        {/* Summary List */}
        <div className="mt-6">
          <p className="text-lg font-medium mb-2">
            📊 <strong>{yLabel} by Program/Site</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {chartData.map((item) => (
              <li key={item.program}>
                {item.program}: <strong>{item[yKey]?.toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
