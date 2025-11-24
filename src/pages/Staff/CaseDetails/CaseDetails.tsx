import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useCaseDetails from "../../../hooks/useCaseDetails";
import useIntakeForm from "../../../hooks/useIntakeForm";

import CaseInfoCard from "../../../components/CaseInfoCard/CaseInfoCard";
import IntakeFormView from "../../../components/IntakeFormView/IntakeFormView";

export default function CaseDetails() {
  const routeParams = useParams();
  const caseIdString = routeParams.caseId;

  const caseDetailsHook = useCaseDetails();
  const intakeFormHook = useIntakeForm();

  const [newStatus, setNewStatus] = useState<
    "OPEN" | "IN_PROGRESS" | "CLOSED" | ""
  >("");

  const [newNotes, setNewNotes] = useState("");

  useEffect(function () {
    if (!caseIdString) {
      return;
    }

    const caseIdNumber = parseInt(caseIdString);
    caseDetailsHook.fetchCase(caseIdNumber);

  }, [caseIdString]);

  useEffect(function () {
    if (caseDetailsHook.caseData !== null) {
      const intakeId = caseDetailsHook.caseData.intakeFormId;
      intakeFormHook.fetchFormById(intakeId);
    }
  }, [caseDetailsHook.caseData]);

  if (caseDetailsHook.loading === true || intakeFormHook.loading === true) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading case details...
      </p>
    );
  }

  if (caseDetailsHook.errorMessage !== null) {
    return (
      <p className="text-center mt-10 text-red-600">
        {caseDetailsHook.errorMessage}
      </p>
    );
  }

  if (caseDetailsHook.caseData === null) {
    return (
      <p className="text-center mt-10 text-red-600">
        Case not found.
      </p>
    );
  }

  const caseData = caseDetailsHook.caseData;

  function submitStatus(event: React.FormEvent) {
    event.preventDefault();

    if (newStatus === "") {
      alert("Please choose a status.");
      return;
    }

    caseDetailsHook.updateStatus(caseData.id, { status: newStatus });
    setNewStatus("");
  }

  function submitNotes(event: React.FormEvent) {
    event.preventDefault();

    if (newNotes.trim() === "") {
      alert("Notes cannot be empty.");
      return;
    }

    caseDetailsHook.updateNotes(caseData.id, { notes: newNotes });
    setNewNotes("");
  }

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold text-primary mb-8">
        Case #{caseData.id}
      </h1>

      <CaseInfoCard caseData={caseData} />

      <div className="bg-white shadow rounded-lg p-6 mt-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Update Status
        </h2>

        <form onSubmit={submitStatus}>
          <select
            value={newStatus}
            onChange={function (e) {
              const selected = e.target.value;
              if (
                selected === "OPEN" ||
                selected === "IN_PROGRESS" ||
                selected === "CLOSED" ||
                selected === ""
              ) {
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

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
          >
            Update Status
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mt-8 border-l-4 border-primary">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add / Update Notes
        </h2>

        <form onSubmit={submitNotes}>
          <textarea
            value={newNotes}
            onChange={function (e) {
              setNewNotes(e.target.value);
            }}
            rows={4}
            className="border border-gray-300 rounded p-2 w-full mb-4"
          ></textarea>

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
          >
            Save Notes
          </button>
        </form>
      </div>

      {intakeFormHook.intakeForm !== null && (
        <IntakeFormView form={intakeFormHook.intakeForm} />
      )}

    </div>
  );
}
