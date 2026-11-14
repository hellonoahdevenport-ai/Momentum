import { listCases } from "@/lib/cases/registry";
import AssignmentsClient from "@/components/app/AssignmentsClient";
import CohortClient from "@/components/app/CohortClient";

export default function EducatorAssignmentsPage() {
  const cases = listCases().map((c) => ({ id: c.meta.id, title: c.meta.title }));
  return (
    <div>
      <AssignmentsClient cases={cases} />
      <CohortClient cases={cases} />
    </div>
  );
}
