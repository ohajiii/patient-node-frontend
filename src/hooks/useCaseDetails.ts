import { useState } from "react";
import { caseService } from "../services/caseService";
import type {
  CaseResponseDto,
  CaseStatusUpdateRequestDto,
  CaseNotesUpdateRequestDto
} from "../types/case";

function useCaseDetails() {
  const [caseData, setCaseData] = useState<CaseResponseDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function fetchCase(id: number) {
    setLoading(true);
    setErrorMessage(null);

    caseService.getCaseById(id)
      .then(function(data) {
        setCaseData(data);
      })
      .catch(function() {
        setErrorMessage("Could not load case details.");
        setCaseData(null);
      })
      .finally(function() {
        setLoading(false);
      });
  }

  function updateStatus(id: number, payload: CaseStatusUpdateRequestDto) {
    setLoading(true);
    setErrorMessage(null);

    caseService.updateCaseStatus(id, payload)
      .then(function(updatedCase) {
        setCaseData(updatedCase);
      })
      .catch(function() {
        setErrorMessage("Failed to update status.");
      })
      .finally(function() {
        setLoading(false);
      });
  }

  function updateNotes(id: number, payload: CaseNotesUpdateRequestDto) {
    setLoading(true);
    setErrorMessage(null);

    caseService.updateCaseNotes(id, payload)
      .then(function(updatedCase) {
        setCaseData(updatedCase);
      })
      .catch(function() {
        setErrorMessage("Failed to update notes.");
      })
      .finally(function() {
        setLoading(false);
      });
  }

  return {
    caseData: caseData,
    loading: loading,
    errorMessage: errorMessage,
    fetchCase: fetchCase,
    updateStatus: updateStatus,
    updateNotes: updateNotes
  };
}

export default useCaseDetails;