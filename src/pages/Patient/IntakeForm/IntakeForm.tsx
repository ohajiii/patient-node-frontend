import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createIntakeForm } from "../../../services/intakeFormService";
import type { IntakeFormRequestDto } from "../../../types/intakeForm";

export default function IntakeForm() {
  const navigate = useNavigate();
  
  const [hasChronicIllness, setHasChronicIllness] = useState(false);
  const [chronicIllnessDetails, setChronicIllnessDetails] = useState("");
  const [takesMedication, setTakesMedication] = useState(false);
  const [medicationDetails, setMedicationDetails] = useState("");
  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergyDetails, setAllergyDetails] = useState("");
  const [hasSurgeries, setHasSurgeries] = useState(false);
  const [surgeryDetails, setSurgeryDetails] = useState("");
  const [smokes, setSmokes] = useState(false);
  const [drinksAlcohol, setDrinksAlcohol] = useState(false);
  const [alcoholFrequency, setAlcoholFrequency] = useState("");
  const [exercisesRegularly, setExercisesRegularly] = useState(false);
  const [exerciseFrequency, setExerciseFrequency] = useState("");
  const [primaryComplaint, setPrimaryComplaint] = useState("");
  const [symptomStart, setSymptomStart] = useState("");
  const [symptomSeverity, setSymptomSeverity] = useState(1);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  function submitForm(event: React.FormEvent) {
    event.preventDefault();

    const patientId = 1;

    const request: IntakeFormRequestDto = {
      patientId: patientId,
      hasChronicIllness: hasChronicIllness,
      chronicIllnessDetails: chronicIllnessDetails,
      takesMedication: takesMedication,
      medicationDetails: medicationDetails,
      hasAllergies: hasAllergies,
      allergyDetails: allergyDetails,
      hasSurgeries: hasSurgeries,
      surgeryDetails: surgeryDetails,
      smokes: smokes,
      drinksAlcohol: drinksAlcohol,
      alcoholFrequency: alcoholFrequency,
      exercisesRegularly: exercisesRegularly,
      exerciseFrequency: exerciseFrequency,
      primaryComplaint: primaryComplaint,
      symptomStart: symptomStart,
      symptomSeverity: symptomSeverity,
      additionalNotes: additionalNotes
    };

    createIntakeForm(request)
      .then(function () {
        setSuccessMessage("Your intake form has been submitted successfully. Redirecting to your cases...");
        
        setTimeout(function() {
          navigate("/patient/cases");
        }, 1500);
      })
      .catch(function () {
        alert("There was a problem submitting the form. Please try again.");
      });
  }

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold text-primary mb-8">
        Patient Intake Form
      </h1>

      {successMessage !== "" && (
        <p className="text-green-600 font-medium mb-4">{successMessage}</p>
      )}

      <form
        onSubmit={submitForm}
        className="bg-white shadow rounded-lg p-6 border-l-4 border-primary space-y-6"
      >
        <div>
          <label className="font-medium text-gray-800 block mb-1">Primary Complaint</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={primaryComplaint}
            onChange={function (changeEvent) {
              setPrimaryComplaint(changeEvent.target.value);
            }}
          />
        </div>

        <div>
          <label className="font-medium text-gray-800 block mb-1">When did symptoms start?</label>
          <input
            type="date"
            className="border rounded p-2 w-full"
            value={symptomStart}
            onChange={function (changeEvent) {
              setSymptomStart(changeEvent.target.value);
            }}
          />
        </div>

        <div>
          <label className="font-medium text-gray-800 block mb-1">
            Symptom Severity (1-10)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            className="border rounded p-2 w-full"
            value={symptomSeverity}
            onChange={function (changeEvent) {
              setSymptomSeverity(Number(changeEvent.target.value));
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              checked={smokes}
              onChange={function (changeEvent) {
                setSmokes(changeEvent.target.checked);
              }}
            />
            <span>Smokes</span>
          </label>

          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              checked={drinksAlcohol}
              onChange={function (changeEvent) {
                setDrinksAlcohol(changeEvent.target.checked);
              }}
            />
            <span>Drinks Alcohol</span>
          </label>
        </div>

        <div>
          <label className="font-medium text-gray-800 block mb-1">Additional Notes</label>
          <textarea
            rows={4}
            className="border rounded p-2 w-full"
            value={additionalNotes}
            onChange={function (changeEvent) {
              setAdditionalNotes(changeEvent.target.value);
            }}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80"
        >
          Submit Intake Form
        </button>

      </form>
    </div>
  );
}