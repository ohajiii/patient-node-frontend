import { useState, useEffect } from "react";
import { caseService } from "../services/caseService";
import type {
  CaseResponseDto,
  CaseStatusUpdateRequestDto,
  CaseNotesUpdateRequestDto,
} from "../types/case";

export function useCase(patientId?: number) {
  const [cases, setCases] = useState<CaseResponseDto[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseResponseDto | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCases() {
    try {
      setLoading(true);
      setError(null);
      if (patientId) {
        const data = await caseService.getCasesByPatientId(patientId);
        console.log("Fetched patient cases:", data);
        setCases(data);
      } else {
        const data = await caseService.getAllCases();
        console.log("Fetched all cases:", data);
        setCases(data);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
      setCases([]);
      setError("Failed to load cases.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchCaseById(id: number) {
    try {
      setLoading(true);
      const data = await caseService.getCaseById(id);
      setSelectedCase(data);
    } catch (error) {
      setError("Failed to load case details.");
    } finally {
      setLoading(false);
    }
  }

  async function updateCaseStatus(
    id: number,
    payload: CaseStatusUpdateRequestDto
  ) {
    try {
      const updated = await caseService.updateCaseStatus(id, payload);
      setSelectedCase(updated);
      await fetchCases();
    } catch (error) {
      setError("Failed to update case status.");
    }
  }

  async function updateCaseNotes(
    id: number,
    payload: CaseNotesUpdateRequestDto
  ) {
    try {
      const updated = await caseService.updateCaseNotes(id, payload);
      setSelectedCase(updated);
      await fetchCases();
    } catch (error) {
      setError("Failed to update case notes.");
    }
  }

  useEffect(() => {
    fetchCases();
  }, [patientId]);

  return {
    cases,
    selectedCase,
    loading,
    error,
    fetchCases,
    fetchCaseById,
    updateCaseStatus,
    updateCaseNotes,
  };
}
