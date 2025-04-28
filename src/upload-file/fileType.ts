export interface Type1Report {
  IntakeAssessmentByPreviousLivingSituation: IntakeAssessmentByPreviousLivingSituation[],
  IntakeAssessmentByImmediateNeedsUponIntake: IntakeAssessmentByImmediateNeedsUponIntake[],
  SelfIdentifiersByCitizenImmigrationSatus: SelfIdentifiersByCitizenImmigrationSatus[],
  SelfIdentifiersByVeteranStatus: SelfIdentifiersByVeteranStatus[],
  IncomeEmploymentByIncomeType: IncomeEmploymentByIncomeTypes[],
}

export interface IntakeAssessmentByPreviousLivingSituation {
  'Previous Living Situation': string;
  'Count': number;
  'Percentage(%)': string;
}
export interface IntakeAssessmentByImmediateNeedsUponIntake {
  'Immediate Need': string;
  'Count': number;
  'Percentage(%)': string;
}
export interface SelfIdentifiersByCitizenImmigrationSatus {
  'Status': string;
  'Count': number;
  'Percentage(%)': string;
}
export interface SelfIdentifiersByVeteranStatus {
  'Status': string;
  'Count': number;
  'Percentage(%)': string;
}
export interface IncomeEmploymentByIncomeTypes {
  'Type': string;
  'Count': number;
  'Percentage(%)': string;
}



export interface Type2Individual {
  Individual: string
  'Program or Site': string
  'Start Date': string
  'Exit Date': string
  'Exit Reason': string
}

export interface Type3Individual {
  Individual: string
  'Program or Site': string
  'Start Date/Time of LOS': string
  'End Date/Time of LOS': string
  'Review for TPCS LOS': string
  'Reason and Rationale for Restriction': string
  'Was this related to a critical incident': string
  'Staff Reporting': string
  'Rationale for LOS > 48 hours': string
  'Manager Approved': string
}

export interface Type4Individual {
  Individual: string
  'Program or Site': string
  Notes: string
}

export interface Type5Individual {
  Individual: string
  'Program/Residence': string
  'Goal Title'?: string
  'Goal Type'?: string
  'Personal Outcome'?: string
  'Goal Description'?: string
  'Start Date'?: string
  'Completion Date'?: string
  'Discontinued Date'?: string
  'Goal Progress'?: string
}

export interface Type6Individual {
  Individual: string
  'Program or Site': string
  'Self-soothing strategies': string
  'Reasons for living': string
  'Support connections': string
  'Safe spaces': string
}

export interface Type7Individual {
  Individual: string
  'Program or Site': string
  'Staff Member': string
  "Today's Date": string
  'Risk Factors': string
  'Risk Reduction Actions': string
  'Wellness Habits': string
  'Support People': string
  'Crisis Contacts': string
}

export interface Type8Incident {
  'Client(s) involved': string
  'Program or Site': string
  'Date and Time of Incident': string
  'Degree of injury': string
  'Type of injury': string
  'Type of serious incident': string
}

export interface Type9Individual {
  'Client Photo': string | null
  Person: string
  'Date of Birth': string
  Site: string
  Programs: string
  'Date entered into the system': string
}

export interface Type10Individual {
  Community: string
  'Initial follow-up Date': string
  'Current Goals': string
  'Current Goals Description': string
  'Follow-up log': string
  'Referral log': string
  'Successful Diversion': string
  'Diverted To': string
  'Diversion Method': string
  'Diversion Cost': string
  'Eviction Prevention': string
}

export interface Type11Site {
  Site: string
  'Housing Type': string
  'Site Phone Number': string
  Address: string
  City: string
  'Manager or Site': string
  "Manager's Phone Number": string
}

export interface ParsedData {
  filename: string
  filetype: string
  records?:
    | Type1Report[]
    | Type2Individual[]
    | Type3Individual[]
    | Type4Individual[]
    | Type5Individual[]
    | Type6Individual[]
    | Type7Individual[]
    | Type8Incident[]
    | Type9Individual[]
    | Type10Individual[]
    | Type11Site[]
}
