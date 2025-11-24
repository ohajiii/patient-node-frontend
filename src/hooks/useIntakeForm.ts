import { useState } from "react";
import { getIntakeFormById, getIntakeFormsByPatientId } from "../services/intakeFormService";
import type { IntakeFormResponseDto } from "../types/intakeForm";

function useIntakeForm() {
  const [intakeForm, setIntakeForm] = useState<IntakeFormResponseDto | null>(null);
  const [intakeForms, setIntakeForms] = useState<IntakeFormResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function fetchFormById(id: number) {
    setLoading(true);
    setErrorMessage(null);

    getIntakeFormById(id)
      .then(function(data) {
        setIntakeForm(data);
      })
      .catch(function() {
        setErrorMessage("Could not load intake form.");
        setIntakeForm(null);
      })
      .finally(function() {
        setLoading(false);
      });
  }

  function fetchFormsByPatient(patientId: number) {
    setLoading(true);
    setErrorMessage(null);

    getIntakeFormsByPatientId(patientId)
      .then(function(data) {
        setIntakeForms(data);
      })
      .catch(function() {
        setErrorMessage("Could not load intake forms.");
        setIntakeForms([]);
      })
      .finally(function() {
        setLoading(false);
      });
  }

  return {
    intakeForm: intakeForm,
    intakeForms: intakeForms,
    loading: loading,
    errorMessage: errorMessage,
    fetchFormById: fetchFormById,
    fetchFormsByPatient: fetchFormsByPatient
  };
}

export default useIntakeForm;