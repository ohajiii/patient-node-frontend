import axios from "axios";
import type { CaseResponseDto, CaseStatusUpdateRequestDto, CaseNotesUpdateRequestDto } from "../types/case";

const BASE_URL = import.meta.env.VITE_API_URL + "/api/cases";

async function getAllCases(): Promise<CaseResponseDto[]> {
  const response = await axios.get<CaseResponseDto[]>(BASE_URL);
  return response.data;
}

async function getCaseById(id: number): Promise<CaseResponseDto> {
  const response = await axios.get<CaseResponseDto>(`${BASE_URL}/${id}`);
  return response.data;
}

async function getCasesByPatientId(patientId: number): Promise<CaseResponseDto[]> {
  const response = await axios.get<CaseResponseDto[]>(`${BASE_URL}/patient/${patientId}`);
  return response.data;
}

async function updateCaseStatus(
  id: number,
  data: CaseStatusUpdateRequestDto
): Promise<CaseResponseDto> {
  const response = await axios.put<CaseResponseDto>(`${BASE_URL}/${id}/status`, data);
  return response.data;
}

async function updateCaseNotes(
  id: number,
  data: CaseNotesUpdateRequestDto
): Promise<CaseResponseDto> {
  const response = await axios.put<CaseResponseDto>(`${BASE_URL}/${id}/notes`, data);
  return response.data;
}

export const caseService = {
  getAllCases,
  getCaseById,
  getCasesByPatientId,
  updateCaseStatus,
  updateCaseNotes,
};