import { useEffect, useState } from "react";
import { caseService } from "../../../services/caseService";
import type { CaseResponseDto } from "../../../types/case";
import CaseTable from "../../../components/Case/CaseTable";

export default function CaseList() {
  const [cases, setCases] = useState<CaseResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(function() {
    setLoading(true);
    setErrorMessage(null);

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
        Case Management
      </h1>

      <div className="bg-white shadow p-6 rounded-lg border-l-4 border-primary">
        <p className="text-gray-700">
          Below is a list of all patient cases. Select a case to view full details.
        </p>
      </div>

      <CaseTable cases={cases} />

    </div>
  );
}