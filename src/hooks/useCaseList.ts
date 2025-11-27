import { useState, useEffect } from "react";
import { caseService } from "../services/caseService";
import type { CaseResponseDto } from "../types/case";

function useCaseList(patientId?: number) {
  const [cases, setCases] = useState<CaseResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function fetchCases() {
    setLoading(true);
    setErrorMessage(null);

    if (patientId) {
      caseService.getCasesByPatientId(patientId)
        .then(function(data) {
          setCases(data);
        })
        .catch(function() {
          setErrorMessage("Could not load cases.");
          setCases([]);
        })
        .finally(function() {
          setLoading(false);
        });
    } else {
      caseService.getAllCases()
        .then(function(data) {
          setCases(data);
        })
        .catch(function() {
          setErrorMessage("Could not load cases.");
          setCases([]);
        })
        .finally(function() {
          setLoading(false);
        });
    }
  }

  useEffect(function() {
    fetchCases();
  }, [patientId]);

  return {
    cases: cases,
    loading: loading,
    errorMessage: errorMessage,
    reloadCases: fetchCases
  };
}

export default useCaseList;