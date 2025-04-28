import { UseFormReturn } from "react-hook-form";
import { shelderDiversionFollowupProps } from "../reports/shelter-diversion-log/_components/columns";

interface FilterParams {
  form: UseFormReturn<{
    community?: string;
    evictionPrevention?: string;
    successfullDiversion?: string;
    initialFollowUpDate?: Date;
  }>;
  originalData: shelderDiversionFollowupProps[];
  divertedTo?: string;
  diversionMethod?: string;
}

export function filterData({
  form,
  originalData = [],
  divertedTo,
  diversionMethod,
}: FilterParams): shelderDiversionFollowupProps[] {
  const formValues = form.getValues();
  const {
    community,
    evictionPrevention,
    successfullDiversion,
    initialFollowUpDate,
  } = formValues || {};

  return originalData.filter((item) => {
    const matchesCommunity =
      !community ||
      (item.community || "").toLowerCase().includes(community.toLowerCase());

    const matchesEviction =
      !evictionPrevention ||
      (item.evictionPrevention || "")
        .toLowerCase()
        .includes(evictionPrevention.toLowerCase());

    const matchesDiversion =
      !successfullDiversion ||
      (item.successfulDiversion || "")
        .toLowerCase()
        .includes(successfullDiversion.toLowerCase());

    const matchesFollowUpDate =
      !initialFollowUpDate ||
      (item.initialFollowUpDate &&
        new Date(item.initialFollowUpDate) >= new Date(initialFollowUpDate));

    const matchesDivertedTo =
      !divertedTo ||
      (item.divertedTo || "").toLowerCase().includes(divertedTo.toLowerCase());

    const matchesDiversionMethod =
      !diversionMethod ||
      (item.diversionMethod || "")
        .toLowerCase()
        .includes(diversionMethod.toLowerCase());

    return (
      matchesCommunity &&
      matchesEviction &&
      matchesDiversion &&
      matchesFollowUpDate &&
      matchesDivertedTo &&
      matchesDiversionMethod
    );
  });
}
