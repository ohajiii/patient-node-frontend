export interface IntakeFormRequestDto {
  patientId: number;
  hasChronicIllness: boolean;
  chronicIllnessDetails?: string;
  takesMedication: boolean;
  medicationDetails?: string;
  hasAllergies: boolean;
  allergyDetails?: string;
  hasSurgeries: boolean;
  surgeryDetails?: string;
  smokes: boolean;
  drinksAlcohol: boolean;
  alcoholFrequency?: string;
  exercisesRegularly: boolean;
  exerciseFrequency?: string;
  primaryComplaint: string;
  symptomStart: string;
  symptomSeverity: number;
  additionalNotes?: string;
}

export interface IntakeFormResponseDto {
    id: number;
    patientId: number;
    caseId: number;
    hasChronicIllness: boolean;
    chronicIllnessDetails?: string;
    takesMedication: boolean;
    medicationDetails?: string;
    hasAllergies: boolean;
    allergyDetails?: string;
    hasSurgeries: boolean;
    surgeryDetails?: string;
    smokes: boolean;
    drinksAlcohol: boolean;
    alcoholFrequency?: string;
    exercisesRegularly: boolean;
    exerciseFrequency?: string;
    primaryComplaint: string;
    symptomStart: string;
    symptomSeverity: number;
    additionalNotes?: string;
}