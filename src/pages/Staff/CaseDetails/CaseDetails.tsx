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

  const [newStatus, setNewStatus] = useState("");
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
      <p className="text-center mt-8 text-gray-600">
        Loading case details...
      </p>
    );
  }

  if (caseDetailsHook.errorMessage !== null) {
    return (
      <p className="text-center mt-8 text-red-600">
        {caseDetailsHook.errorMessage}
      </p>
    );
  }

  if (caseDetailsHook.caseData === null) {
    return (
      <p className="text-center mt-8 text-red-600">
        Case not found.
      </p>
    );
  }

  function submitStatus(event: React.FormEvent) {
    event.preventDefault();

    if (newStatus === "") {
      alert("Please choose a status.");
      return;
    }

    const idNumber = caseDetailsHook.caseData.id;
    caseDetailsHook.updateStatus(idNumber, { status: newStatus });

    setNewStatus("");
  }

  function submitNotes(event: React.FormEvent) {
    event.preventDefault();

    if (newNotes.trim() === "") {
      alert("Notes cannot be empty.");
      return;
    }

    const idNumber = caseDetailsHook.caseData.id;
    caseDetailsHook.updateNotes(idNumber, { notes: newNotes });

    setNewNotes("");
  }

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Case #{caseDetailsHook.caseData.id}
      </h1>

      <CaseInfoCard caseData={caseDetailsHook.caseData} />

      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Update Status</h2>

        <form onSubmit={submitStatus}>
          <select
            value={newStatus}
            onChange={function (e) { setNewStatus(e.target.value); }}
            className="border rounded p-2 w-full mb-4"
          >
            <option value="">Select a status</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Status
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Add / Update Notes</h2>

        <form onSubmit={submitNotes}>
          <textarea
            value={newNotes}
            onChange={function (e) { setNewNotes(e.target.value); }}
            rows={4}
            className="border rounded p-2 w-full mb-4"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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