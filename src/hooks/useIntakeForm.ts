import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createIntakeForm } from "../services/intakeFormService";
import type { IntakeFormRequestDto } from "../types/intakeForm";

const intakeFormValidationSchema = yup.object({
    hasChronicIllness: yup.boolean().required(),
    chronicIllnessDetails: yup.string().when("hasChronicIllness", {
        is: true,
        then: function (fieldSchema) {
            return fieldSchema.required("Please describe the chronic illness");
        },
        otherwise: function (fieldSchema) {
            return fieldSchema.optional();
        },
    }),

    takesMedication: yup.boolean().required(),
    medicationDetails: yup.string().when("takesMedication", {
        is: true,
        then: function (fieldSchema) {
            return fieldSchema.required("Please describe yout medication");
        },
        otherwise: function (fieldSchema) {
            return fieldSchema.optional();
        },
    }),

    hasAllergies: yup.boolean().required(),
    allergyDetails: yup.string().when("hasAllergies", {
        is: true,
        then: function (fieldSchema) {
            return fieldSchema.required("Please describe your allergies");
        },
        otherwise: function (fieldSchema) {
            return fieldSchema.optional();
        },
    }),

    hasSurgeries: yup.boolean().required(),
    surgeryDetails: yup.string().when("hasSurgeries", {
        is: true,
        then: function (fieldSchema) {
            return fieldSchema.required("Please describe your surgeries");
        },
        otherwise: function (fieldSchema) {
            return fieldSchema.optional();
        },
    }),

    smokes: yup.boolean().required(),

    drinksAlcohol: yup.boolean().required(),
    alcoholFrequency: yup.string().optional(),

    exercisesRegularly: yup.boolean().required(),
    exerciseFrequency: yup.string().optional(),

    primaryComplaint: yup.string().required("Primary complaint is required"),

    symptomStart: yup.string().required("Symptoms start date is required"),

    symptomSeverity: yup.number().typeError("Symptom severity must be a number").required("Symptom severity is required").min(1).max(10),

    additionalNotes: yup.string().optional(),

}).required();

type IntakeFormSchema = yup.InferType<typeof intakeFormValidationSchema>;

export function useIntakeForm() {
  // 👇 Use the inferred type from Yup
  const intakeForm = useForm<IntakeFormSchema>({
    resolver: yupResolver(intakeFormValidationSchema) as any,
  });

  async function handleFormSubmission(formData: IntakeFormSchema) {
    try {
      await createIntakeForm(formData as IntakeFormRequestDto);
      alert("Form submitted successfully!");
      intakeForm.reset();
    } 
    catch (error) {
      console.error(error);
      alert("Something went wrong while submitting the form.");
    }
  }

  return {
    register: intakeForm.register,
    handleSubmit: intakeForm.handleSubmit,
    formState: intakeForm.formState,
    reset: intakeForm.reset,
    handleFormSubmission,
  };
}