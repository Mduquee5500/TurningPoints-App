// excelProcessor.ts
import {
  ParsedData,
  Type1Report,
  Type10Individual,
  Type2Individual,
  Type3Individual,
  Type4Individual,
  Type5Individual,
  Type6Individual,
  Type7Individual,
  Type8Incident,
  Type9Individual,
  Type11Site,
} from "@/upload-file/fileType";
import * as XLSX from "xlsx";

// ========== 类型定义 ==========

// ========== 公共函数 ==========
const formatDate = (dateValue: any): string => {
  if (dateValue instanceof Date) {
    return dateValue.toLocaleDateString("es-ES");
  } else if (typeof dateValue === "number") {
    const date = XLSX.SSF.parse_date_code(dateValue);
    return new Date(date.y, date.m - 1, date.d).toLocaleDateString("es-ES");
  }
  return "";
};

const parseType1 = (jsonData: any): Type1Report[] => {
  const type1Report: Type1Report[] = [];
  let currentReport: Type1Report = {
    IntakeAssessmentByPreviousLivingSituation: [],
    IntakeAssessmentByImmediateNeedsUponIntake: [],
    SelfIdentifiersByCitizenImmigrationSatus: [],
    SelfIdentifiersByVeteranStatus: [],
    IncomeEmploymentByIncomeType: [],
  };

  let section = "";
  jsonData.forEach((row: string[]) => {
    if (row[0] === "By Immediate Needs Upon Intake") {
      section = "ImmediateNeeds";
    } else if (row[0] === "By Previous Living Situation") {
      section = "PreviousLivingSituation";
    } else if (row[0] === "By Citizen/Immigration Status") {
      section = "CitizenImmigrationStatus";
    } else if (row[0] === "By Veteran Status") {
      section = "VeteranStatus";
    } else if (row[0] === "By Income Types") {
      section = "IncomeType";
    } else if (section === "ImmediateNeeds" && row[0] && row[1] && row[2]) {
      currentReport.IntakeAssessmentByImmediateNeedsUponIntake.push({
        "Immediate Need": row[0],
        Count: Number(row[1]),
        "Percentage(%)": row[2],
      });
    } else if (
      section === "PreviousLivingSituation" &&
      row[0] &&
      row[1] &&
      row[2]
    ) {
      currentReport.IntakeAssessmentByPreviousLivingSituation.push({
        "Previous Living Situation": row[0],
        Count: Number(row[1]),
        "Percentage(%)": row[2],
      });
    } else if (
      section === "CitizenImmigrationStatus" &&
      row[0] &&
      row[1] &&
      row[2]
    ) {
      currentReport.SelfIdentifiersByCitizenImmigrationSatus.push({
        Status: row[0],
        Count: Number(row[1]),
        "Percentage(%)": row[2],
      });
    } else if (section === "VeteranStatus" && row[0] && row[1] && row[2]) {
      currentReport.SelfIdentifiersByVeteranStatus.push({
        Status: row[0],
        Count: Number(row[1]),
        "Percentage(%)": row[2],
      });
    } else if (section === "IncomeType" && row[0] && row[1] && row[2]) {
      currentReport.IncomeEmploymentByIncomeType.push({
        Type: row[0],
        Count: Number(row[1]),
        "Percentage(%)": row[2],
      });
    }

    if (row[0] === "Total") {
      if (
        currentReport.IntakeAssessmentByPreviousLivingSituation.length > 0 ||
        currentReport.IntakeAssessmentByImmediateNeedsUponIntake.length > 0 ||
        currentReport.SelfIdentifiersByCitizenImmigrationSatus.length > 0 ||
        currentReport.SelfIdentifiersByVeteranStatus.length > 0 ||
        currentReport.IncomeEmploymentByIncomeType.length > 0
      ) {
        type1Report.push(currentReport);
      }

      currentReport = {
        IntakeAssessmentByPreviousLivingSituation: [],
        IntakeAssessmentByImmediateNeedsUponIntake: [],
        SelfIdentifiersByCitizenImmigrationSatus: [],
        SelfIdentifiersByVeteranStatus: [],
        IncomeEmploymentByIncomeType: [],
      };
      section = "";
    }
  });

  return type1Report;
};

// ========== 各类型处理函数 ==========
export const parseType2 = (rows: any[][]): Type2Individual[] => {
  return rows
    .slice(1)
    .filter((r) => r.length && r.some((v) => v))
    .map((row) => ({
      Individual: (row[0] ?? "").toString().trim(),
      "Program or Site": (row[1] ?? "").toString().trim(),
      "Start Date": formatDate(row[2]),
      "Exit Date": formatDate(row[3]),
      "Exit Reason": (row[4] ?? "").toString().trim(),
    }));
};

export const parseType3 = (rows: any[][]): Type3Individual[] => {
  return rows
    .slice(1)
    .filter((r) => r.length && r.some((v) => v))
    .map((row) => ({
      Individual: (row[0] ?? "").toString().trim(),
      "Program or Site": (row[1] ?? "").toString().trim(),
      "Start Date/Time of LOS": formatDate(row[2]),
      "End Date/Time of LOS": formatDate(row[3]),
      "Review for TPCS LOS":
        typeof row[4] === "number"
          ? row[4] === 1
            ? "Yes"
            : "No"
          : (row[4] ?? "").toString().trim(),
      "Reason and Rationale for Restriction": (row[5] ?? "").toString().trim(),
      "Was this related to a critical incident": (row[6] ?? "")
        .toString()
        .trim(),
      "Staff Reporting": (row[7] ?? "").toString().trim(),
      "Rationale for LOS > 48 hours": (row[8] ?? "").toString().trim(),
      "Manager Approved":
        typeof row[9] === "number"
          ? row[9] === 1
            ? "Yes"
            : "No"
          : (row[9] ?? "").toString().trim(),
    }));
};

export const parseType4 = (rows: any[][]): Type4Individual[] => {
  return rows
    .slice(1)
    .filter((r) => r.length && r.some((v) => v))
    .map((row) => ({
      Individual: (row[0] ?? "").toString().trim(),
      "Program or Site": (row[1] ?? "").toString().trim(),
      Notes: (row[2] ?? "").toString().trim(),
    }));
};

export const parseType5 = (rows: any[][]): Type5Individual[] => {
  const individuals: Type5Individual[] = [];
  let current: Type5Individual | null = null;
  rows.forEach((row, index) => {
    if (
      !Array.isArray(row) ||
      row.every((cell) =>
        typeof cell === "string" ? cell.trim() === "" : !cell,
      )
    )
      return;
    const first = row[0]?.toString();
    if (first?.includes("Individual:")) {
      if (current) individuals.push(current);
      current = {
        Individual: rows[index][2]?.toString().trim() || "",
        "Program/Residence": rows[index][8]?.toString().trim() || "",
      };
    } else if (current) {
      if (first?.includes("Goal Title:"))
        current["Goal Title"] = rows[index + 1]?.[0]?.toString().trim() || "";
      if (row[2]?.toString().includes("Goal Type:"))
        current["Goal Type"] = rows[index + 1]?.[2]?.toString().trim() || "";
      if (row[3]?.toString().includes("Personal Outcome:"))
        current["Personal Outcome"] =
          rows[index + 1]?.[3]?.toString().trim() || "";
      if (row[6]?.toString().includes("Start Date:"))
        current["Start Date"] = rows[index + 1]?.[6]?.toString().trim() || "";
      if (row[8]?.toString().includes("Completion Date:"))
        current["Completion Date"] =
          rows[index + 1]?.[8]?.toString().trim() || "";
      if (row[9]?.toString().includes("Discontinued Date:"))
        current["Discontinued Date"] =
          rows[index + 1]?.[9]?.toString().trim() || "";
      if (first?.includes("Goal Description:"))
        current["Goal Description"] = row[3]?.toString().trim() || "";
      if (row[3]?.toString().includes("Goal Progress:"))
        current["Goal Progress"] = row[3]?.toString().trim() || "";
    }
  });
  if (current) individuals.push(current);
  return individuals;
};

export const parseType6 = (rows: any[][]): Type6Individual[] => {
  return rows
    .slice(1)
    .filter((r) => r.length && r.some((v) => v))
    .map((row) => ({
      Individual: (row[0] ?? "").toString().trim(),
      "Program or Site": (row[1] ?? "").toString().trim(),
      "Self-soothing strategies": (row[2] ?? "").toString().trim(),
      "Reasons for living": (row[3] ?? "").toString().trim(),
      "Support connections": (row[4] ?? "").toString().trim(),
      "Safe spaces": (row[5] ?? "").toString().trim(),
    }));
};

export const parseType7 = (rows: any[][]): Type7Individual[] => {
  return rows
    .slice(1)
    .filter((r) => r.length && r.some((v) => v))
    .map((row) => ({
      Individual: (row[0] ?? "").toString().trim(),
      "Program or Site": (row[1] ?? "").toString().trim(),
      "Staff Member": (row[2] ?? "").toString().trim(),
      "Today's Date": formatDate(row[3]),
      "Risk Factors": (row[4] ?? "").toString().trim(),
      "Risk Reduction Actions": (row[5] ?? "").toString().trim(),
      "Wellness Habits": (row[6] ?? "").toString().trim(),
      "Support People": (row[7] ?? "").toString().trim(),
      "Crisis Contacts": (row[8] ?? "").toString().trim(),
    }));
};

export const parseType8 = (rows: any[][]): Type8Incident[] => {
  return rows
    .slice(1)
    .filter((r) => r.length && r.some((v) => v))
    .map((row) => ({
      "Client(s) involved": (row[0] ?? "").toString().trim(),
      "Program or Site": (row[1] ?? "").toString().trim(),
      "Date and Time of Incident": formatDate(row[2]),
      "Degree of injury": (row[3] ?? "").toString().trim(),
      "Type of injury": (row[4] ?? "").toString().trim(),
      "Type of serious incident": (row[5] ?? "").toString().trim(),
    }));
};

export const parseType9 = (rows: any[][]): Type9Individual[] => {
  return rows
    .slice(1)
    .filter((r) => r.length && r.some((v) => v))
    .map((row) => ({
      "Client Photo": row[0]?.toString().trim() || null,
      Person: (row[1] ?? "").toString().trim(),
      "Date of Birth": formatDate(row[2]),
      Site: (row[3] ?? "").toString().trim(),
      Programs: (row[4] ?? "").toString().trim(),
      "Date entered into the system": formatDate(row[5]),
    }));
};

export const parseType10 = (rows: any[][]): Type10Individual[] => {
  return rows
    .slice(1)
    .filter((r) => r.length && r.some((v) => v))
    .map((row) => ({
      Community: (row[0] ?? "").toString().trim(),
      "Initial follow-up Date": formatDate(row[1]),
      "Current Goals": (row[2] ?? "").toString().trim(),
      "Current Goals Description": (row[3] ?? "").toString().trim(),
      "Follow-up log": (row[4] ?? "").toString().trim(),
      "Referral log": (row[5] ?? "").toString().trim(),
      "Successful Diversion": (row[6] ?? "").toString().trim(),
      "Diverted To": (row[7] ?? "").toString().trim(),
      "Diversion Method": (row[8] ?? "").toString().trim(),
      "Diversion Cost": (row[9] ?? "").toString().trim(),
      "Eviction Prevention": (row[10] ?? "").toString().trim(),
    }));
};

export const parseType11 = (rows: any[][]): Type11Site[] => {
  return rows
    .slice(1)
    .filter((r) => r.length && r.some((v) => v))
    .map((row) => ({
      Site: (row[0] ?? "").toString().trim(),
      "Housing Type": (row[1] ?? "").toString().trim(),
      "Site Phone Number": (row[2] ?? "").toString().trim(),
      Address: (row[3] ?? "").toString().trim(),
      City: (row[4] ?? "").toString().trim(),
      "Manager or Site": (row[5] ?? "").toString().trim(),
      "Manager's Phone Number": (row[6] ?? "").toString().trim(),
    }));
};

const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

// ========== 主入口函数 ==========
export const processExcelFile = async (
  file: File,
  fileType: string,
): Promise<ParsedData> => {
  const buffer = await readFileAsArrayBuffer(file);
  const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
    defval: "",
    header: 1,
  });

  const metadata: ParsedData = {
    filename: file.name,
    filetype: fileType,
  };

  if (fileType === "Flow Through") metadata.records = parseType2(jsonData);
  if (fileType === "Loss of Service") metadata.records = parseType3(jsonData);
  if (fileType === "Rent Supplement Request")
    metadata.records = parseType4(jsonData);
  if (fileType === "Goals and Progress")
    metadata.records = parseType5(jsonData);
  if (fileType === "Safety Plan") metadata.records = parseType6(jsonData);
  if (fileType === "Overdose Safety Plan")
    metadata.records = parseType7(jsonData);
  if (fileType === "Incident Report") metadata.records = parseType8(jsonData);
  if (fileType === "Individuals") metadata.records = parseType9(jsonData);
  if (fileType === "Shelter Diversion Follow-Up Log")
    metadata.records = parseType10(jsonData);
  if (fileType === "Site List") metadata.records = parseType11(jsonData);

  if (fileType === "Intake Reporting") {
    console.log("jsonData:", jsonData);
    metadata.records = parseType1(jsonData);
  }

  console.log(metadata);
  return metadata;
};
