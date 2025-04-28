import { incidentReportProps } from "@/reports/incident-report/_components/columns.tsx";
import { UseFormReturn } from "react-hook-form";

interface FilterParams {
  dateAndTimeOfIncident?: Date;
  form: UseFormReturn<{
    individual: string;
    programOrSite: string;
    degreeOfInjury: string;
    typeOfInjury: string;
    typeOfSeriousIncident: string;
    dateAndTimeOfIncident?: Date; 
  }>;
  originalData: incidentReportProps[];
}

export function filterData({
  dateAndTimeOfIncident,
  form,
  originalData,
}: FilterParams): incidentReportProps[] {
  const { 
    individual,
    programOrSite,
    degreeOfInjury,
    typeOfInjury,
    typeOfSeriousIncident 
  } = form.getValues();

  let filteredData = [...(originalData || [])];

  if (individual) {
    filteredData = filteredData.filter(item =>
      item.individual?.toLowerCase().includes(individual.toLowerCase())
    );
  }

  if (programOrSite) {
    filteredData = filteredData.filter(item =>
      item.programOrSite?.toLowerCase().includes(programOrSite.toLowerCase())
    );
  }

  if (degreeOfInjury) {
    filteredData = filteredData.filter(item =>
      item.degreeOfInjury?.toLowerCase().includes(degreeOfInjury.toLowerCase())
    );
  }

  if (typeOfInjury) {
    filteredData = filteredData.filter(item =>
      item.typeOfInjury?.toLowerCase().includes(typeOfInjury.toLowerCase())
    );
  }

  if (typeOfSeriousIncident) {
    filteredData = filteredData.filter(item =>
      item.typeOfSeriousIncident?.toLowerCase().includes(typeOfSeriousIncident.toLowerCase())
    );
  }

  if (dateAndTimeOfIncident) {
    const filterDate = new Date(dateAndTimeOfIncident);
    filteredData = filteredData.filter(item => {
      const incidentDate = new Date(item.dateAndTimeOfIncident);
      return incidentDate >= filterDate;
    });
  }

  return filteredData;
}