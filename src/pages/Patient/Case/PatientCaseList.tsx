import { useEffect, useState } from "react";
import { caseService } from "../../../services/caseService";
import type { CaseResponseDto } from "../../../types/case";
import PatientCaseTable from "../../../components/Case/PatientCaseTable";

export default function PatientCaseList() {
  const patientId = 1;

  const [cases, setCases] = useState<CaseResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(function() {
    setLoading(true);
    setErrorMessage(null);

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
  }, []);

  if (loading === true) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading cases...
      </p>
    );
  }

  if (errorMessage !== null) {
    return (
      <p className="text-center mt-10 text-red-600">
        {errorMessage}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold text-primary mb-8">
        My Cases
      </h1>

      <div className="bg-white shadow p-6 rounded-lg border-l-4 border-primary">
        <p className="text-gray-700">
          Below is a list of all your cases. Select a case to view full details.
        </p>
      </div>

      <PatientCaseTable cases={cases} />

    </div>
  );
}

