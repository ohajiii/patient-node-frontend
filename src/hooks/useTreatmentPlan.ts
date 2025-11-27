import { useState } from "react";
import {
  getTreatmentPlanByCaseId,
  createTreatmentPlan,
  updateTreatmentPlan
} from "../services/treatmentPlanService";

import type {
  TreatmentPlanRequestDto,
  TreatmentPlanResponseDto
} from "../types/treatmentPlan";

export default function useTreatmentPlan() {
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlanResponseDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function fetchTreatmentPlan(caseId: number) {
    try {
      setLoading(true);
      setErrorMessage(null);

      const data = await getTreatmentPlanByCaseId(caseId);
      setTreatmentPlan(data);

    } catch (error) {
      setErrorMessage("No treatment plan found for this case.");
      setTreatmentPlan(null);

    } finally {
      setLoading(false);
    }
  }

  async function saveNewTreatmentPlan(payload: TreatmentPlanRequestDto) {
    try {
      setLoading(true);
      setErrorMessage(null);

      const createdPlan = await createTreatmentPlan(payload);
      setTreatmentPlan(createdPlan);

    } catch (error) {
      setErrorMessage("Could not create treatment plan.");

    } finally {
      setLoading(false);
    }
  }

  async function saveUpdatedTreatmentPlan(id: number, payload: TreatmentPlanRequestDto) {
    try {
      setLoading(true);
      setErrorMessage(null);

      const updatedPlan = await updateTreatmentPlan(id, payload);
      setTreatmentPlan(updatedPlan);

    } catch (error) {
      setErrorMessage("Could not update treatment plan.");

    } finally {
      setLoading(false);
    }
  }

  return {
    treatmentPlan,
    loading,
    errorMessage,
    fetchTreatmentPlan,
    saveNewTreatmentPlan,
    saveUpdatedTreatmentPlan
  };
}