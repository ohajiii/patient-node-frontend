import "./IntakeForm.css";
import { Helmet } from "react-helmet-async";
import { useIntakeForm } from "../../../hooks/useIntakeForm";

export default function IntakeForm() {
  const {
    register,
    handleSubmit,
    handleFormSubmission,
    formState: { errors, isSubmitting },
  } = useIntakeForm();

  return (
    <>
      <Helmet>
        <title> Intake Form | PatientNode </title>
      </Helmet>

      <section className="intake">
        <div className="intake-container">
          <h1 className="intake-title"> Patient Intake Form </h1>
          <p className="intake-description">
            Please complete this form to provide your medical background and
            current symptoms.
          </p>

          {/* Chromic illness */}
          <form
            className="intake-form"
            onSubmit={handleSubmit(handleFormSubmission)}
          >
            <div className="intake-form-section">
              <label className="intake-label">
                Do you have a chronic illness?
              </label>

              <input type="checkbox" {...register("hasChronicIllness")} />
              {errors.hasChronicIllness && (
                <p className="intake-error">
                  {errors.hasChronicIllness.message}
                </p>
              )}

              <label className="intake-label">Chronic Illness Details</label>
              <input
                type="text"
                className="intake-input"
                placeholder="Describe your chronic illness"
                {...register("chronicIllnessDetails")}
              />

              {errors.chronicIllnessDetails && (
                <p className="intake-error">
                  {errors.chronicIllnessDetails.message}
                </p>
              )}
            </div>

            {/* Medication */}
            <div className="intake-form-section">
              <label className="intake-label">
                Do you take any medications?
              </label>
              <input type="checkbox" {...register("takesMedication")} />
              {errors.takesMedication && (
                <p className="intake-error">{errors.takesMedication.message}</p>
              )}

              <label className="intake-label">Medication Details</label>
              <input
                type="text"
                className="intake-input"
                placeholder="Describe your medication"
                {...register("medicationDetails")}
              />
              {errors.medicationDetails && (
                <p className="intake-error">
                  {errors.medicationDetails.message}
                </p>
              )}
            </div>

            {/* Allergies */}
            <div className="intake-form-section">
              <label className="intake-label">Do you have allergies?</label>
              <input type="checkbox" {...register("hasAllergies")} />
              {errors.hasAllergies && (
                <p className="intake-error">{errors.hasAllergies.message}</p>
              )}

              <label className="intake-label">Allergy Details</label>
              <input
                type="text"
                className="intake-input"
                placeholder="Describe your allergies"
                {...register("allergyDetails")}
              />
              {errors.allergyDetails && (
                <p className="intake-error">{errors.allergyDetails.message}</p>
              )}
            </div>

            {/* Surgeries */}
            <div className="intake-form-section">
              <label className="intake-label">
                Have you had any surgeries?
              </label>
              <input type="checkbox" {...register("hasSurgeries")} />
              {errors.hasSurgeries && (
                <p className="intake-error">{errors.hasSurgeries.message}</p>
              )}

              <label className="intake-label">Surgery Details</label>
              <input
                type="text"
                className="intake-input"
                placeholder="Describe your surgeries"
                {...register("surgeryDetails")}
              />
              {errors.surgeryDetails && (
                <p className="intake-error">{errors.surgeryDetails.message}</p>
              )}
            </div>

            {/* Lifestyle */}
            <div className="intake-form-section">
              <label className="intake-label">Do you smoke?</label>
              <input type="checkbox" {...register("smokes")} />
              {errors.smokes && (
                <p className="intake-error">{errors.smokes.message}</p>
              )}

              <label className="intake-label">Do you drink alcohol?</label>
              <input type="checkbox" {...register("drinksAlcohol")} />
              {errors.drinksAlcohol && (
                <p className="intake-error">{errors.drinksAlcohol.message}</p>
              )}

              <label className="intake-label">Alcohol Frequency</label>
              <input
                type="text"
                className="intake-input"
                placeholder="How often do you drink alcohol?"
                {...register("alcoholFrequency")}
              />
              {errors.alcoholFrequency && (
                <p className="intake-error">
                  {errors.alcoholFrequency.message}
                </p>
              )}

              <label className="intake-label">Do you exercise regularly?</label>
              <input type="checkbox" {...register("exercisesRegularly")} />
              {errors.exercisesRegularly && (
                <p className="intake-error">
                  {errors.exercisesRegularly.message}
                </p>
              )}

              <label className="intake-label">Exercise Frequency</label>
              <input
                type="text"
                className="intake-input"
                placeholder="How often do you exercise?"
                {...register("exerciseFrequency")}
              />
              {errors.exerciseFrequency && (
                <p className="intake-error">
                  {errors.exerciseFrequency.message}
                </p>
              )}
            </div>

            {/* Symptoms */}
            <div className="intake-form-section">
              <label className="intake-label">Primary Complaint</label>
              <input
                type="text"
                className="intake-input"
                placeholder="Describe your main concern"
                {...register("primaryComplaint")}
              />
              {errors.primaryComplaint && (
                <p className="intake-error">
                  {errors.primaryComplaint.message}
                </p>
              )}

              <label className="intake-label">
                When did your symptoms start?
              </label>
              <input
                type="date"
                className="intake-input"
                {...register("symptomStart")}
              />
              {errors.symptomStart && (
                <p className="intake-error">{errors.symptomStart.message}</p>
              )}

              <label className="intake-label">Symptom Severity (1–10)</label>
              <input
                type="number"
                min="1"
                max="10"
                className="intake-input"
                {...register("symptomSeverity")}
              />
              {errors.symptomSeverity && (
                <p className="intake-error">{errors.symptomSeverity.message}</p>
              )}
            </div>

            <div className="intake-form-section">
              <label htmlFor="additionalNotes" className="intake-label">
                Additional Notes
              </label>

              <textarea
                id="additionalNotes"
                rows={4}
                className="intake-input"
                placeholder="Any other details you'd like to provide"
                {...register("additionalNotes")}
              ></textarea>
            </div>

            <button
              type="submit"
              className="intake-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}