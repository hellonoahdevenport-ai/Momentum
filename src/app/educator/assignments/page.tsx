import { listCases } from "@/lib/cases/registry";
import AssignmentsClient from "@/components/app/AssignmentsClient";

export default function EducatorAssignmentsPage() {
  const cases = listCases().map((c) => ({ id: c.meta.id, title: c.meta.title }));
  return <AssignmentsClient cases={cases} />;
}
