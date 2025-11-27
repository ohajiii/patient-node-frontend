export interface TreatmentPlanRequestDto {
  caseId: number;
  staffId: number;
  diagnosis: string;
  planDetails: string;
  prescribedMedications?: string;
  followUpInstructions?: string;
}

export interface TreatmentPlanResponseDto extends TreatmentPlanRequestDto {
  id: number;
  createdAt: string;
  updatedAt: string;
}