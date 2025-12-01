import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { caseService } from "../../../services/caseService";
import { getIntakeFormById } from "../../../services/intakeFormService";
import { getTreatmentPlanByCaseId, createTreatmentPlan, updateTreatmentPlan } from "../../../services/treatmentPlanService";
import type { CaseResponseDto } from "../../../types/case";
import type { IntakeFormResponseDto } from "../../../types/intakeForm";
import type { TreatmentPlanResponseDto, TreatmentPlanRequestDto } from "../../../types/treatmentPlan";

import CaseInfoCard from "../../../components/Case/CaseInfoCard";
import IntakeFormView from "../../../components/IntakeFormView/IntakeFormView";
import TreatmentPlanCard from "../../../components/TreatmentPlan/TreatmentPlanCard";
import TreatmentPlanForm from "../../../components/TreatmentPlan/TreatmentPlanForm";

export default function CaseDetails() {
  const routeParams = useParams();
  const caseIdString = routeParams.caseId;

  const [caseData, setCaseData] = useState<CaseResponseDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [intakeForm, setIntakeForm] = useState<IntakeFormResponseDto | null>(null);
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlanResponseDto | null>(null);
  const [loadingIntakeForm, setLoadingIntakeForm] = useState(false);
  const [loadingTreatmentPlan, setLoadingTreatmentPlan] = useState(false);

  const [newStatus, setNewStatus] = useState<"OPEN" | "IN_PROGRESS" | "CLOSED" | "">("");
  const [newNotes, setNewNotes] = useState("");

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

  function submitStatus(event: React.FormEvent) {
    event.preventDefault();
    if (newStatus === "") {
      alert("Please choose a status.");
      return;
    }
    if (caseData === null) return;

    setLoading(true);
    caseService.updateCaseStatus(caseData.id, { status: newStatus })
      .then(function(updatedCase) {
        setCaseData(updatedCase);
        setNewStatus("");
      })
      .catch(function() {
        alert("Failed to update status.");
      })
      .finally(function() {
        setLoading(false);
      });
  }

  function submitNotes(event: React.FormEvent) {
    event.preventDefault();
    if (newNotes.trim() === "") {
      alert("Notes cannot be empty.");
      return;
    }
    if (caseData === null) return;

    setLoading(true);
    caseService.updateCaseNotes(caseData.id, { notes: newNotes })
      .then(function(updatedCase) {
        setCaseData(updatedCase);
        setNewNotes("");
      })
      .catch(function() {
        alert("Failed to update notes.");
      })
      .finally(function() {
        setLoading(false);
      });
  }

  function saveTreatmentPlan(payload: TreatmentPlanRequestDto, planId?: number) {
    if (caseData === null) return;

    setLoadingTreatmentPlan(true);
    if (planId !== undefined) {
      updateTreatmentPlan(planId, payload)
        .then(function(updatedPlan) {
          setTreatmentPlan(updatedPlan);
        })
        .catch(function() {
          alert("Could not update treatment plan.");
        })
        .finally(function() {
          setLoadingTreatmentPlan(false);
        });
    } else {
      createTreatmentPlan(payload)
        .then(function(createdPlan) {
          setTreatmentPlan(createdPlan);
        })
        .catch(function() {
          alert("Could not create treatment plan.");
        })
        .finally(function() {
          setLoadingTreatmentPlan(false);
        });
    }
  }

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

      <div className="bg-white shadow rounded-lg p-6 mt-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Status</h2>

        <form onSubmit={submitStatus}>
          <select
            value={newStatus}
            onChange={function (changeEvent) {
              const selected = changeEvent.target.value;
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
            onChange={function (changeEvent) {
              setNewNotes(changeEvent.target.value);
            }}
          ></textarea>

          <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">
            Save Notes
          </button>
        </form>
      </div>

      {intakeForm !== null && (
        <IntakeFormView form={intakeForm} />
      )}

      <div className="mt-8 space-y-8">

        {treatmentPlan !== null ? (
          <TreatmentPlanCard plan={treatmentPlan} />
        ) : (
          <p className="text-center text-gray-600 mb-4">No treatment plan yet.</p>
        )}

        <TreatmentPlanForm
          caseId={caseData.id}
          existingPlan={treatmentPlan}
          onSave={saveTreatmentPlan}
        />

      </div>
    </div>
  );
}