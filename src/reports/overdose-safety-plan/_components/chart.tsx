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
import { overdoseSafetyPlanProps } from "@/reports/overdose-safety-plan/_components/columns.tsx";

interface Props {
  data: overdoseSafetyPlanProps[];
}

export default function OverdoseSafetyPlanChart({ data }: Props) {
  const chartData = useMemo(() => {
    const countMap: Record<string, number> = {};

    data.forEach((item) => {
      const program = item.ProgramOrSite || "Unknown";
      countMap[program] = (countMap[program] || 0) + 1;
    });

    return Object.entries(countMap).map(([program, count]) => ({
      program,
      count,
    }));
  }, [data]);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Number of Individuals per Program/Site
      </h2>
      <div className="bg-white rounded-2xl shadow p-4">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 80 }}
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
            <Bar dataKey="count" fill="#60a5fa" name="Individuals" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
