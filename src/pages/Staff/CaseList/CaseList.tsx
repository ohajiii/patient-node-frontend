import useCaseList from "../../../hooks/useCaseList";
import CaseTable from "../../../components/CaseTable/CaseTable";

export default function CaseList() {
  const caseListHook = useCaseList();

  if (caseListHook.loading === true) {
    return (
      <p className="text-center mt-8 text-gray-600">
        Loading cases...
      </p>
    );
  }

  if (caseListHook.errorMessage !== null) {
    return (
      <p className="text-center mt-8 text-red-600">
        {caseListHook.errorMessage}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">All Cases</h1>

      <CaseTable cases={caseListHook.cases} />
    </div>
  );
}