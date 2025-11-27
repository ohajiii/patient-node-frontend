import axios from "axios";
import type {
  TreatmentPlanRequestDto,
  TreatmentPlanResponseDto
} from "../types/treatmentPlan";

const BASE_URL = import.meta.env.VITE_API_URL + "/api/treatment-plans";

export async function getTreatmentPlanByCaseId(caseId: number): Promise<TreatmentPlanResponseDto> {
  const response = await axios.get<TreatmentPlanResponseDto>(BASE_URL + "/case/" + caseId);
  return response.data;
}

export async function createTreatmentPlan(payload: TreatmentPlanRequestDto): Promise<TreatmentPlanResponseDto> {
  const response = await axios.post<TreatmentPlanResponseDto>(BASE_URL, payload);
  return response.data;
}

export async function updateTreatmentPlan(id: number, payload: TreatmentPlanRequestDto): Promise<TreatmentPlanResponseDto> {
  const response = await axios.put<TreatmentPlanResponseDto>(BASE_URL + "/" + id, payload);
  return response.data;
}