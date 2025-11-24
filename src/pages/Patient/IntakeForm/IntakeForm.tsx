import { useState } from "react";
import { createIntakeForm } from "../../../services/intakeFormService";
import type { IntakeFormRequestDto } from "../../../types/intakeForm";

export default function IntakeForm() {

  const [form, setForm] = useState({
    hasChronicIllness: false,
    chronicIllnessDetails: "",
    takesMedication: false,
    medicationDetails: "",
    hasAllergies: false,
    allergyDetails: "",
    hasSurgeries: false,
    surgeryDetails: "",
    smokes: false,
    drinksAlcohol: false,
    alcoholFrequency: "",
    exercisesRegularly: false,
    exerciseFrequency: "",
    primaryComplaint: "",
    symptomStart: "",
    symptomSeverity: 1,
    additionalNotes: ""
  });

  const [successMessage, setSuccessMessage] = useState("");

  function updateField(fieldName: string, value: any) {
    setForm(function (prev) {
      return {
        ...prev,
        [fieldName]: value
      };
    });
  }

  function submitForm(event: React.FormEvent) {
    event.preventDefault();

    const request: IntakeFormRequestDto = {
      ...form
    };

    createIntakeForm(request)
      .then(function () {
        setSuccessMessage("Your intake form has been submitted successfully.");
      })
      .catch(function () {
        alert("There was a problem submitting the form. Please try again.");
      });
  }

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">Patient Intake Form</h1>

      {successMessage !== "" && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}

      <form onSubmit={submitForm} className="space-y-6">

        {/* PRIMARY COMPLAINT */}
        <div>
          <label className="font-medium block mb-1">Primary Complaint</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={form.primaryComplaint}
            onChange={function (e) {
              updateField("primaryComplaint", e.target.value);
            }}
          />
        </div>

        {/* SYMPTOM START */}
        <div>
          <label className="font-medium block mb-1">When did symptoms start?</label>
          <input
            type="date"
            className="border rounded p-2 w-full"
            value={form.symptomStart}
            onChange={function (e) {
              updateField("symptomStart", e.target.value);
            }}
          />
        </div>

        {/* SEVERITY */}
        <div>
          <label className="font-medium block mb-1">Symptom Severity (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            className="border rounded p-2 w-full"
            value={form.symptomSeverity}
            onChange={function (e) {
              updateField("symptomSeverity", Number(e.target.value));
            }}
          />
        </div>

        {/* LIFESTYLE TOGGLES */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.smokes}
              onChange={function (e) {
                updateField("smokes", e.target.checked);
              }}
            />
            <span>Smokes</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.drinksAlcohol}
              onChange={function (e) {
                updateField("drinksAlcohol", e.target.checked);
              }}
            />
            <span>Drinks Alcohol</span>
          </label>
        </div>

        {/* OPTIONAL NOTES */}
        <div>
          <label className="font-medium block mb-1">Additional Notes</label>
          <textarea
            rows={4}
            className="border rounded p-2 w-full"
            value={form.additionalNotes}
            onChange={function (e) {
              updateField("additionalNotes", e.target.value);
            }}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Intake Form
        </button>
      </form>
    </div>
  );
}