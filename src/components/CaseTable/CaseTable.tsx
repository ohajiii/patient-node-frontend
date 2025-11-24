import { Link } from "react-router-dom";
import type { CaseResponseDto } from "../../types/case";

export default function CaseTable(props: { cases: CaseResponseDto[] }) {
  const caseList = props.cases;

  if (caseList.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-6">
        There are no cases to show.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full bg-white shadow rounded-lg border">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 border-b">Case ID</th>
            <th className="text-left p-3 border-b">Patient ID</th>
            <th className="text-left p-3 border-b">Status</th>
            <th className="text-left p-3 border-b">Last Updated</th>
            <th className="text-left p-3 border-b">Actions</th>
          </tr>
        </thead>

        <tbody>
          {caseList.map(function (caseItem) {
            return (
              <tr key={caseItem.id} className="hover:bg-gray-50">

                <td className="p-3 border-b">{caseItem.id}</td>

                <td className="p-3 border-b">{caseItem.patientId}</td>

                <td className="p-3 border-b">{caseItem.status}</td>

                <td className="p-3 border-b">
                  {new Date(caseItem.updatedAt).toLocaleDateString()}
                </td>

                <td className="p-3 border-b">
                  <Link
                    to={"/staff/cases/" + caseItem.id}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View Details
                  </Link>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}