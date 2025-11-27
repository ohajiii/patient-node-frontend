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
      <table className="w-full bg-white shadow rounded-lg border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 border-b font-medium text-gray-700">Case ID</th>
            <th className="text-left p-3 border-b font-medium text-gray-700">Patient ID</th>
            <th className="text-left p-3 border-b font-medium text-gray-700">Status</th>
            <th className="text-left p-3 border-b font-medium text-gray-700">Last Updated</th>
            <th className="text-left p-3 border-b font-medium text-gray-700">Actions</th>
          </tr>
        </thead>

        <tbody>
          {caseList.map(function (caseItem) {
            return (
              <tr key={caseItem.id} className="hover:bg-gray-50 transition-colors">
                
                <td className="p-3 border-b text-gray-800">{caseItem.id}</td>

                <td className="p-3 border-b text-gray-800">{caseItem.patientId}</td>

                <td className="p-3 border-b text-gray-800">{caseItem.status}</td>

                <td className="p-3 border-b text-gray-800">
                  {new Date(caseItem.updatedAt).toLocaleDateString()}
                </td>

                <td className="p-3 border-b">
                  <Link
                    to={"/staff/cases/" + caseItem.id}
                    className="text-primary font-semibold hover:underline"
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