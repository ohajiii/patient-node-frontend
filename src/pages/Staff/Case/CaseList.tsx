import "./CaseList.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useCase } from "../../../hooks/useCase";
import type { CaseStatusUpdateRequestDto, CaseNotesUpdateRequestDto } from "../../../types/case";

export default function CaseList() {
  const {
    cases,
    loading,
    error,
    updateCaseStatus,
    updateCaseNotes,
    fetchCases,
  } = useCase();

  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [newNotes, setNewNotes] = useState<string>("");

  useEffect(function () {
    fetchCases();
  }, []);

  function handleSelectCase(id: number) {
    if (selectedCaseId === id) {
      setSelectedCaseId(null);
    } else {
      setSelectedCaseId(id);
    }
  }

  async function handleStatusSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedCaseId) return;
    const payload: CaseStatusUpdateRequestDto = { status: newStatus as "OPEN" | "IN_PROGRESS" | "CLOSED" };
    await updateCaseStatus(selectedCaseId, payload);
    alert("Case status updated successfully!");
    setNewStatus("");
  }

  async function handleNotesSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedCaseId) return;
    const payload: CaseNotesUpdateRequestDto = { notes: newNotes };
    await updateCaseNotes(selectedCaseId, payload);
    alert("Case notes updated successfully!");
    setNewNotes("");
  }

  return (
    <>
      <Helmet>
        <title>Case Management | PatientNode</title>
      </Helmet>

      <section className="case">
        <div className="case-container">
          <h1 className="case-title">Case Management</h1>
          <p className="case-description">View and update patient cases below.</p>

          {loading && <p className="case-loading">Loading cases...</p>}
          {error && <p className="case-error">{error}</p>}

          {!loading && cases.length === 0 && (
            <p className="case-empty">No cases found.</p>
          )}

          {!loading && cases.length > 0 && (
            <table className="case-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Patient ID</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cases.map(function (item) {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.patientId}</td>
                      <td>{item.status}</td>
                      <td>{item.notes || "—"}</td>
                      <td>
                        <button
                          className="case-action"
                          onClick={function () {
                            handleSelectCase(item.id);
                          }}
                        >
                          {selectedCaseId === item.id ? "Close" : "Manage"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {selectedCaseId && (
            <div className="case-manage">
              <h2 className="case-subtitle">Manage Case #{selectedCaseId}</h2>

              <form className="case-form" onSubmit={handleStatusSubmit}>
                <label className="case-label">Update Status</label>
                <select
                  className="case-input"
                  value={newStatus}
                  onChange={function (e) {
                    setNewStatus(e.target.value);
                  }}
                >
                  <option value="">Select Status</option>
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
                <button type="submit" className="case-submit">
                  Update Status
                </button>
              </form>

              <form className="case-form" onSubmit={handleNotesSubmit}>
                <label className="case-label">Update Notes</label>
                <textarea
                  className="case-input"
                  value={newNotes}
                  onChange={function (e) {
                    setNewNotes(e.target.value);
                  }}
                  placeholder="Add or edit notes"
                  rows={3}
                ></textarea>
                <button type="submit" className="case-submit">
                  Save Notes
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}