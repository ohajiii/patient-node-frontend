import type { TreatmentPlanResponseDto } from "../../types/treatmentPlan";

export default function TreatmentPlanCard(props: { plan: TreatmentPlanResponseDto }) {
  const plan = props.plan;

  return (
    <div className="bg-white shadow rounded-lg p-6 border-l-4 border-primary">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Treatment Plan
      </h2>

      <div className="space-y-3 text-gray-700">
        <p><span className="font-medium">Diagnosis:</span> {plan.diagnosis}</p>
        <p><span className="font-medium">Plan Details:</span> {plan.planDetails}</p>

        {plan.prescribedMedications && (
          <p><span className="font-medium">Medications:</span> {plan.prescribedMedications}</p>
        )}

        {plan.followUpInstructions && (
          <p><span className="font-medium">Follow-Up:</span> {plan.followUpInstructions}</p>
        )}

        <div className="text-sm text-gray-500 mt-4">
          <p>Created: {new Date(plan.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(plan.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}