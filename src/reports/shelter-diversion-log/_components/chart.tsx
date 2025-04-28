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
import { shelderDiversionFollowupProps } from "@/reports/shelter-diversion-log/_components/columns.tsx";

interface Props {
  data: shelderDiversionFollowupProps[];
}

export default function ShelterDiversionChart({ data }: Props) {
  const { evictionData, diversionData, communityData } = useMemo(() => {
    const evictionMap: Record<string, number> = {};
    const diversionMap: Record<string, number> = {};
    const communityMap: Record<string, number> = {};

    data.forEach((item) => {
      const program = item.community || "Unknown";

      if (item.evictionPrevention) {
        evictionMap[program] = (evictionMap[program] || 0) + 1;
      }
      if (item.successfulDiversion) {
        diversionMap[program] = (diversionMap[program] || 0) + 1;
      }

      if (item.community) {
        communityMap[program] = (communityMap[program] || 0) + 1;
      }
    });

    return {
      evictionData: Object.entries(evictionMap).map(([program, count]) => ({
        program,
        count,
      })),
      diversionData: Object.entries(diversionMap).map(([program, count]) => ({
        program,
        count,
      })),
      communityData: Object.entries(communityMap).map(([program, count]) => ({
        program,
        count,
      })),
    };
  }, [data]);

  const renderChart = (
    chartData: { program: string; count: number }[],
    title: string,
    color: string
  ) => (
    <div className="space-y-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
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
            <Bar dataKey="count" fill={color} name="Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {renderChart(
        evictionData,
        "Eviction Prevention by Program/Site",
        "#f87171"
      )}
      {renderChart(
        diversionData,
        "Successful Diversion by Program/Site",
        "#60a5fa"
      )}
      {renderChart(
        communityData,
        "Community Engagement by Program/Site",
        "#34d399"
      )}
    </div>
  );
}
