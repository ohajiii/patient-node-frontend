import axios from "axios";
import type { IntakeFormRequestDto, IntakeFormResponseDto } from "../types/intakeForm";

const BASE_URL = import.meta.env.VITE_API_URL + "/api/patient/intake-form";

export async function createIntakeForm(data: IntakeFormRequestDto): Promise<IntakeFormResponseDto> {
  const response = await axios.post<IntakeFormResponseDto>(BASE_URL, data);
  return response.data;
}

export async function getIntakeFormById(id: number): Promise<IntakeFormResponseDto> {
  const response = await axios.get<IntakeFormResponseDto>(BASE_URL + "/" + id);
  return response.data;
}

export async function getIntakeFormsByPatientId(patientId: number): Promise<IntakeFormResponseDto[]> {
  const response = await axios.get<IntakeFormResponseDto[]>(BASE_URL + "/patient/" + patientId);
  return response.data;
}