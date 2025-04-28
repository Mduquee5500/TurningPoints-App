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
import { incidentReportProps } from "@/reports/incident-report/_components/columns.tsx";

interface Props {
  data: incidentReportProps[];
}

export default function FlowThroughCharts({ data }: Props) {
  const { programSiteChartData, injuryTypeChartData, incidentChartData } = useMemo(() => {
    const programSiteMap: Record<string, number> = {};
    const injuryTypeMap: Record<string, number> = {};
    const incidentTypeMap: Record<string, number> = {};
    const dateIncidentMap: Record<string, number> = {};

    data.forEach((item) => {
      // Program/Site data
      const programSite = item.programOrSite || "Unknown";
      programSiteMap[programSite] = (programSiteMap[programSite] || 0) + 1;

      // Degree of Injury data
      const injuryType = item.degreeOfInjury || "Unknown";
      injuryTypeMap[injuryType] = (injuryTypeMap[injuryType] || 0) + 1;

      // Type of Injury data
      const incidentType = item.typeOfInjury || "Unknown";
      incidentTypeMap[incidentType] = (incidentTypeMap[incidentType] || 0) + 1;

      // Type of Serious Incident data
      const seriousIncidentType = item.typeOfSeriousIncident || "Unknown";
      incidentTypeMap[seriousIncidentType] = (incidentTypeMap[seriousIncidentType] || 0) + 1;

      // Date and Time of Incident data
      const incidentDate = item.dateAndTimeOfIncident ? new Date(item.dateAndTimeOfIncident).toLocaleDateString() : "Unknown";
      dateIncidentMap[incidentDate] = (dateIncidentMap[incidentDate] || 0) + 1;
    });

    // Convert the maps into arrays to be used by the charts
    const toSortedArray = (map: Record<string, number>) =>
      Object.entries(map)
        .map(([key, count]) => ({ key, count }))
        .sort((a, b) => a.key.localeCompare(b.key));

    return {
      programSiteChartData: toSortedArray(programSiteMap),
      injuryTypeChartData: toSortedArray(injuryTypeMap),
      incidentChartData: toSortedArray(incidentTypeMap),
      dateIncidentChartData: toSortedArray(dateIncidentMap),
    };
  }, [data]);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-10">
      {/* Program/Site Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Number of Individuals by Program/Site
        </h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={programSiteChartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="key"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f87171" name="Count" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">
              📊 <strong>Program/Site Count</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {programSiteChartData.map(({ key, count }) => (
                <li key={key}>
                  {key}: {count} person(s)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Degree of Injury Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Number of Individuals by Degree of Injury
        </h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={injuryTypeChartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="key"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#60a5fa" name="Count" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">
              🩹 <strong>Degree of Injury Count</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {injuryTypeChartData.map(({ key, count }) => (
                <li key={key}>
                  {key}: {count} person(s)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Type of Injury Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Number of Individuals by Type of Injury
        </h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={incidentChartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="key"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#34d399" name="Count" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">
              🦵 <strong>Type of Injury Count</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {incidentChartData.map(({ key, count }) => (
                <li key={key}>
                  {key}: {count} person(s)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Date and Time of Incident Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Number of Individuals by Date and Time of Incident
        </h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={incidentChartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="key"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#fbbf24" name="Count" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">
              🕒 <strong>Date and Time of Incident Count</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {incidentChartData.map(({ key, count }) => (
                <li key={key}>
                  {key}: {count} person(s)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
