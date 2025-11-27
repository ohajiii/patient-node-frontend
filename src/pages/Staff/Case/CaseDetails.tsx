import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useCaseDetails from "../../../hooks/useCaseDetails";
import useIntakeForm from "../../../hooks/useIntakeForm";
import useTreatmentPlan from "../../../hooks/useTreatmentPlan";

import CaseInfoCard from "../../../components/Case/CaseInfoCard";
import IntakeFormView from "../../../components/IntakeFormView/IntakeFormView";
import TreatmentPlanCard from "../../../components/TreatmentPlan/TreatmentPlanCard";
import TreatmentPlanForm from "../../../components/TreatmentPlan/TreatmentPlanForm";

export default function CaseDetails() {
  const routeParams = useParams();
  const caseIdString = routeParams.caseId;

  const caseDetailsHook = useCaseDetails();
  const intakeFormHook = useIntakeForm();
  const treatmentPlanHook = useTreatmentPlan();

  const [newStatus, setNewStatus] = useState<"OPEN" | "IN_PROGRESS" | "CLOSED" | "">("");
  const [newNotes, setNewNotes] = useState("");

  useEffect(() => {
    if (!caseIdString) return;
    const caseIdNumber = parseInt(caseIdString);
    caseDetailsHook.fetchCase(caseIdNumber);
  }, [caseIdString]);

  useEffect(() => {
    if (caseDetailsHook.caseData !== null) {
      intakeFormHook.fetchFormById(caseDetailsHook.caseData.intakeFormId);
      treatmentPlanHook.fetchTreatmentPlan(caseDetailsHook.caseData.id);
    }
  }, [caseDetailsHook.caseData]);

  function submitStatus(event: React.FormEvent) {
    event.preventDefault();
    if (newStatus === "") {
      alert("Please choose a status.");
      return;
    }
    caseDetailsHook.updateStatus(caseDetailsHook.caseData!.id, { status: newStatus });
    setNewStatus("");
  }

  function submitNotes(event: React.FormEvent) {
    event.preventDefault();
    if (newNotes.trim() === "") {
      alert("Notes cannot be empty.");
      return;
    }
    caseDetailsHook.updateNotes(caseDetailsHook.caseData!.id, { notes: newNotes });
    setNewNotes("");
  }

  function saveTreatmentPlan(payload: any, planId?: number) {
    if (planId !== undefined) {
      treatmentPlanHook.saveUpdatedTreatmentPlan(planId, payload);
    } else {
      treatmentPlanHook.saveNewTreatmentPlan(payload);
    }
  }

  if (
    caseDetailsHook.loading ||
    intakeFormHook.loading ||
    treatmentPlanHook.loading
  ) {
    return <p className="text-center mt-10 text-gray-600">Loading case details...</p>;
  }

  if (caseDetailsHook.errorMessage !== null) {
    return <p className="text-center mt-10 text-red-600">{caseDetailsHook.errorMessage}</p>;
  }

  if (!caseDetailsHook.caseData) {
    return <p className="text-center mt-10 text-red-600">Case not found.</p>;
  }

  const caseData = caseDetailsHook.caseData;

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold text-primary mb-8">
        Case #{caseData.id}
      </h1>

      <CaseInfoCard caseData={caseData} />

      <div className="bg-white shadow rounded-lg p-6 mt-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Status</h2>

        <form onSubmit={submitStatus}>
          <select
            value={newStatus}
            onChange={(e) => {
              const selected = e.target.value;
              if (selected === "OPEN" || selected === "IN_PROGRESS" || selected === "CLOSED" || selected === "") {
                setNewStatus(selected);
              }
            }}
            className="border border-gray-300 rounded p-2 w-full mb-4"
          >
            <option value="">Select a status</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">
            Update Status
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mt-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add / Update Notes</h2>

        <form onSubmit={submitNotes}>
          <textarea
            rows={4}
            className="border border-gray-300 rounded p-2 w-full mb-4"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
          ></textarea>

          <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">
            Save Notes
          </button>
        </form>
      </div>

      {intakeFormHook.intakeForm !== null && (
        <IntakeFormView form={intakeFormHook.intakeForm} />
      )}

      <div className="mt-8 space-y-8">

        {treatmentPlanHook.treatmentPlan !== null ? (
          <TreatmentPlanCard plan={treatmentPlanHook.treatmentPlan} />
        ) : (
          <p className="text-center text-gray-600 mb-4">No treatment plan yet.</p>
        )}

        <TreatmentPlanForm
          caseId={caseData.id}
          existingPlan={treatmentPlanHook.treatmentPlan}
          onSave={saveTreatmentPlan}
        />

      </div>
    </div>
  );
}