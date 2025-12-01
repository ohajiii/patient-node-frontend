import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { caseService } from "../../../services/caseService";
import { getIntakeFormById } from "../../../services/intakeFormService";
import { getTreatmentPlanByCaseId } from "../../../services/treatmentPlanService";
import type { CaseResponseDto } from "../../../types/case";
import type { IntakeFormResponseDto } from "../../../types/intakeForm";
import type { TreatmentPlanResponseDto } from "../../../types/treatmentPlan";

import CaseInfoCard from "../../../components/Case/CaseInfoCard";
import IntakeFormView from "../../../components/IntakeFormView/IntakeFormView";
import TreatmentPlanCard from "../../../components/TreatmentPlan/TreatmentPlanCard";

export default function PatientCaseDetails() {
  const routeParams = useParams();
  const caseIdString = routeParams.caseId;

  const [caseData, setCaseData] = useState<CaseResponseDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [intakeForm, setIntakeForm] = useState<IntakeFormResponseDto | null>(null);
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlanResponseDto | null>(null);
  const [loadingIntakeForm, setLoadingIntakeForm] = useState(false);
  const [loadingTreatmentPlan, setLoadingTreatmentPlan] = useState(false);

  useEffect(function() {
    if (!caseIdString) return;
    const caseIdNumber = parseInt(caseIdString);

    setLoading(true);
    setErrorMessage(null);

    caseService.getCaseById(caseIdNumber)
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
  }, [caseIdString]);

  useEffect(function() {
    if (caseData !== null) {
      setLoadingIntakeForm(true);
      getIntakeFormById(caseData.intakeFormId)
        .then(function(data) {
          setIntakeForm(data);
        })
        .catch(function() {
          setIntakeForm(null);
        })
        .finally(function() {
          setLoadingIntakeForm(false);
        });

      setLoadingTreatmentPlan(true);
      getTreatmentPlanByCaseId(caseData.id)
        .then(function(data) {
          setTreatmentPlan(data);
        })
        .catch(function() {
          setTreatmentPlan(null);
        })
        .finally(function() {
          setLoadingTreatmentPlan(false);
        });
    }
  }, [caseData]);

  if (loading || loadingIntakeForm || loadingTreatmentPlan) {
    return <p className="text-center mt-10 text-gray-600">Loading case details...</p>;
  }

  if (errorMessage !== null) {
    return <p className="text-center mt-10 text-red-600">{errorMessage}</p>;
  }

  if (caseData === null) {
    return <p className="text-center mt-10 text-red-600">Case not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold text-primary mb-8">
        Case #{caseData.id}
      </h1>

      <CaseInfoCard caseData={caseData} />

      {intakeForm !== null && (
        <IntakeFormView form={intakeForm} />
      )}

      <div className="mt-8">
        {treatmentPlan !== null ? (
          <TreatmentPlanCard plan={treatmentPlan} />
        ) : (
          <p className="text-center text-gray-600">No treatment plan available yet.</p>
        )}
      </div>

    </div>
  );
}

