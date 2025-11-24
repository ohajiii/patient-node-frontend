import type { IntakeFormResponseDto } from "../../types/intakeForm";

export default function IntakeFormView(props: { form: IntakeFormResponseDto }) {
  const form = props.form;

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Intake Form Details</h2>

      <div className="space-y-4">

        <div>
          <h3 className="text-lg font-medium mb-2">Medical History</h3>
          <p><span className="font-medium">Chronic Illness:</span> {form.hasChronicIllness ? "Yes" : "No"}</p>
          {form.chronicIllnessDetails && (
            <p><span className="font-medium">Details:</span> {form.chronicIllnessDetails}</p>
          )}

          <p className="mt-2"><span className="font-medium">Takes Medication:</span> {form.takesMedication ? "Yes" : "No"}</p>
          {form.medicationDetails && (
            <p><span className="font-medium">Details:</span> {form.medicationDetails}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Other Conditions</h3>
          <p><span className="font-medium">Allergies:</span> {form.hasAllergies ? "Yes" : "No"}</p>
          {form.allergyDetails && (
            <p><span className="font-medium">Details:</span> {form.allergyDetails}</p>
          )}

          <p className="mt-2"><span className="font-medium">Surgeries:</span> {form.hasSurgeries ? "Yes" : "No"}</p>
          {form.surgeryDetails && (
            <p><span className="font-medium">Details:</span> {form.surgeryDetails}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Lifestyle</h3>
          <p><span className="font-medium">Smokes:</span> {form.smokes ? "Yes" : "No"}</p>

          <p className="mt-2"><span className="font-medium">Drinks Alcohol:</span> {form.drinksAlcohol ? "Yes" : "No"}</p>
          {form.alcoholFrequency && (
            <p><span className="font-medium">Frequency:</span> {form.alcoholFrequency}</p>
          )}

          <p className="mt-2"><span className="font-medium">Exercises Regularly:</span> {form.exercisesRegularly ? "Yes" : "No"}</p>
          {form.exerciseFrequency && (
            <p><span className="font-medium">Frequency:</span> {form.exerciseFrequency}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Primary Complaint</h3>
          <p><span className="font-medium">Complaint:</span> {form.primaryComplaint}</p>
          <p><span className="font-medium">Started:</span> {form.symptomStart}</p>
          <p><span className="font-medium">Severity:</span> {form.symptomSeverity}/10</p>
        </div>

        {form.additionalNotes && (
          <div>
            <h3 className="text-lg font-medium mb-2">Additional Notes</h3>
            <p>{form.additionalNotes}</p>
          </div>
        )}

      </div>
    </div>
  );
}