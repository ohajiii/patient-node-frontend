import { useEffect, useState } from "react";
import { caseService } from "../../../services/caseService";
import { getIntakeFormById } from "../../../services/intakeFormService";
import { getTreatmentPlanByCaseId } from "../../../services/treatmentPlanService";
import type { CaseResponseDto } from "../../../types/case";
import type { IntakeFormResponseDto } from "../../../types/intakeForm";
import type { TreatmentPlanResponseDto } from "../../../types/treatmentPlan";

import IntakeFormView from "../../../components/IntakeFormView/IntakeFormView";
import TreatmentPlanCard from "../../../components/TreatmentPlan/TreatmentPlanCard";

export default function PatientCasePage() {
  const patientId = 1;

  const [cases, setCases] = useState<CaseResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [intakeForm, setIntakeForm] = useState<IntakeFormResponseDto | null>(null);
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlanResponseDto | null>(null);

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

  useEffect(function() {
    if (cases.length > 0) {
      const caseItem = cases[0];

      getIntakeFormById(caseItem.intakeFormId)
        .then(function(data) {
          setIntakeForm(data);
        })
        .catch(function() {
          setIntakeForm(null);
        });

      getTreatmentPlanByCaseId(caseItem.id)
        .then(function(data) {
          setTreatmentPlan(data);
        })
        .catch(function() {
          setTreatmentPlan(null);
        });
    }
  }, [cases]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading your case...</p>;
  }

  if (errorMessage !== null) {
    return <p className="text-center mt-10 text-red-600">{errorMessage}</p>;
  }

  if (cases.length === 0) {
    return <p className="text-center mt-10 text-gray-600">You have no cases yet.</p>;
  }

  const caseItem = cases[0];

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

      <div className="mt-8 space-y-8">
        {intakeForm !== null && <IntakeFormView form={intakeForm} />}

        {treatmentPlan !== null ? (
          <TreatmentPlanCard plan={treatmentPlan} />
        ) : (
          <p className="text-center text-gray-600">No treatment plan available yet.</p>
        )}
      </div>

    </div>
  );
}