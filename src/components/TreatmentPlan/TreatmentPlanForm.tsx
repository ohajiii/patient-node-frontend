import { useState, useEffect } from "react";
import type {
  TreatmentPlanRequestDto,
  TreatmentPlanResponseDto
} from "../../types/treatmentPlan";

export default function TreatmentPlanForm(props: {
  caseId: number;
  existingPlan: TreatmentPlanResponseDto | null;
  onSave: (payload: TreatmentPlanRequestDto, existingPlanId?: number) => void;
}) {
  const [diagnosis, setDiagnosis] = useState("");
  const [planDetails, setPlanDetails] = useState("");
  const [medications, setMedications] = useState("");
  const [followUp, setFollowUp] = useState("");

  useEffect(function () {
    if (props.existingPlan !== null) {
      setDiagnosis(props.existingPlan.diagnosis);
      setPlanDetails(props.existingPlan.planDetails);

      if (props.existingPlan.prescribedMedications) {
        setMedications(props.existingPlan.prescribedMedications);
      }

      if (props.existingPlan.followUpInstructions) {
        setFollowUp(props.existingPlan.followUpInstructions);
      }
    }
  }, [props.existingPlan]);

  function submitForm(event: React.FormEvent) {
    event.preventDefault();

    const payload: TreatmentPlanRequestDto = {
      caseId: props.caseId,
      staffId: 1,
      diagnosis: diagnosis,
      planDetails: planDetails,
      prescribedMedications: medications,
      followUpInstructions: followUp
    };

    if (props.existingPlan !== null) {
      props.onSave(payload, props.existingPlan.id);
    } else {
      props.onSave(payload);
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 border-l-4 border-primary">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {props.existingPlan === null ? "Create Treatment Plan" : "Update Treatment Plan"}
      </h2>

      <form onSubmit={submitForm} className="space-y-4">

        <div>
          <label className="font-medium block mb-1">Diagnosis</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={diagnosis}
            onChange={function (changeEvent) {
              setDiagnosis(changeEvent.target.value);
            }}
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Plan Details</label>
          <textarea
            rows={3}
            className="border rounded p-2 w-full"
            value={planDetails}
            onChange={function (changeEvent) {
              setPlanDetails(changeEvent.target.value);
            }}
          ></textarea>
        </div>

        <div>
          <label className="font-medium block mb-1">Medications (optional)</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={medications}
            onChange={function (changeEvent) {
              setMedications(changeEvent.target.value);
            }}
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Follow-Up Instructions (optional)</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={followUp}
            onChange={function (changeEvent) {
              setFollowUp(changeEvent.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80"
        >
          {props.existingPlan === null ? "Create Plan" : "Update Plan"}
        </button>
      </form>
    </div>
  );
}