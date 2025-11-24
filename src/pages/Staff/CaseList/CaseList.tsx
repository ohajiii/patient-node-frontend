import useCaseList from "../../../hooks/useCaseList";
import CaseTable from "../../../components/CaseTable/CaseTable";

export default function CaseList() {
  const caseListHook = useCaseList();

  if (caseListHook.loading === true) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading cases...
      </p>
    );
  }

  if (caseListHook.errorMessage !== null) {
    return (
      <p className="text-center mt-10 text-red-600">
        {caseListHook.errorMessage}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold text-primary mb-8">
        Case Management
      </h1>

      <div className="bg-white shadow p-6 rounded-lg border-l-4 border-primary">
        <p className="text-gray-700">
          Below is a list of all patient cases. Select a case to view full details.
        </p>
      </div>

      <CaseTable cases={caseListHook.cases} />

    </div>
  );
}