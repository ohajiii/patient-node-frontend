import { useEffect, useState } from "react";
import useCaseList from "../../../hooks/useCaseList";
import useIntakeForm from "../../../hooks/useIntakeForm";

import IntakeFormView from "../../../components/IntakeFormView/IntakeFormView";

export default function PatientCasePage() {
  // dummy patient id for now
  const patientId = 1;

  const caseListHook = useCaseList(patientId);
  const intakeFormHook = useIntakeForm();

  const [caseLoaded, setCaseLoaded] = useState(false);

  useEffect(function () {
    if (caseListHook.cases.length > 0) {
      const firstCase = caseListHook.cases[0];
      intakeFormHook.fetchFormById(firstCase.intakeFormId);
      setCaseLoaded(true);
    }
  }, [caseListHook.cases]);

  if (caseListHook.loading === true) {
    return (
      <p className="text-center mt-8 text-gray-600">
        Loading your case...
      </p>
    );
  }

  if (caseListHook.errorMessage !== null) {
    return (
      <p className="text-center mt-8 text-red-600">
        {caseListHook.errorMessage}
      </p>
    );
  }

  if (caseListHook.cases.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-600">
        You have not submitted an intake form yet.
      </p>
    );
  }

  const caseItem = caseListHook.cases[0];

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">My Case</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <p className="mb-2">
          <span className="font-medium">Case ID:</span> {caseItem.id}
        </p>
        <p className="mb-2">
          <span className="font-medium">Status:</span> {caseItem.status}
        </p>
        <p className="mb-2">
          <span className="font-medium">Latest Notes:</span>{" "}
          {caseItem.notes ? caseItem.notes : "No notes added yet."}
        </p>
      </div>

      {caseLoaded === true && intakeFormHook.intakeForm !== null && (
        <IntakeFormView form={intakeFormHook.intakeForm} />
      )}

    </div>
  );
}