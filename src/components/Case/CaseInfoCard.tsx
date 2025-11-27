import type { CaseResponseDto } from "../../types/case";

export default function CaseInfoCard(props: { caseData: CaseResponseDto }) {
  const caseItem = props.caseData;

  return (
    <div className="bg-white shadow border-l-4 border-primary rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Case Information</h2>

      <div className="space-y-2 text-gray-700">
        <p><span className="font-medium">Case ID:</span> {caseItem.id}</p>
        <p><span className="font-medium">Patient ID:</span> {caseItem.patientId}</p>
        <p><span className="font-medium">Status:</span> {caseItem.status}</p>
        <p>
          <span className="font-medium">Created:</span>{" "}
          {new Date(caseItem.createdAt).toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Last Updated:</span>{" "}
          {new Date(caseItem.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}