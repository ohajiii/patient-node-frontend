import { useEffect, useState } from "react";

import useCaseList from "../../../hooks/useCaseList";
import useIntakeForm from "../../../hooks/useIntakeForm";
import useTreatmentPlan from "../../../hooks/useTreatmentPlan";

import IntakeFormView from "../../../components/IntakeFormView/IntakeFormView";
import TreatmentPlanCard from "../../../components/TreatmentPlan/TreatmentPlanCard";

export default function PatientCasePage() {
  const patientId = 1;

  const caseListHook = useCaseList(patientId);
  const intakeFormHook = useIntakeForm();
  const treatmentPlanHook = useTreatmentPlan();

  const [caseLoaded, setCaseLoaded] = useState(false);

  useEffect(() => {
    if (caseListHook.cases.length > 0) {
      const caseItem = caseListHook.cases[0];

      intakeFormHook.fetchFormById(caseItem.intakeFormId);
      treatmentPlanHook.fetchTreatmentPlan(caseItem.id);

      setCaseLoaded(true);
    }
  }, [caseListHook.cases]);

  if (caseListHook.loading) {
    return <p className="text-center mt-10 text-gray-600">Loading your case...</p>;
  }

  if (caseListHook.errorMessage !== null) {
    return <p className="text-center mt-10 text-red-600">{caseListHook.errorMessage}</p>;
  }

  if (caseListHook.cases.length === 0) {
    return <p className="text-center mt-10 text-gray-600">You have no cases yet.</p>;
  }

  const caseItem = caseListHook.cases[0];

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold text-primary mb-8">My Case</h1>

      <div className="bg-white shadow rounded-lg p-6 border-l-4 border-primary">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Case Overview</h2>

        <div className="space-y-2 text-gray-700">
          <p><span className="font-medium">Case ID:</span> {caseItem.id}</p>
          <p><span className="font-medium">Status:</span> {caseItem.status}</p>
          <p><span className="font-medium">Latest Notes:</span> {caseItem.notes || "No notes yet."}</p>
        </div>
      </div>

      {caseLoaded === true && (
        <div className="mt-8 space-y-8">
          {intakeFormHook.intakeForm && <IntakeFormView form={intakeFormHook.intakeForm} />}

          {treatmentPlanHook.treatmentPlan ? (
            <TreatmentPlanCard plan={treatmentPlanHook.treatmentPlan} />
          ) : (
            <p className="text-center text-gray-600">No treatment plan available yet.</p>
          )}
        </div>
      )}

    </div>
  );
}