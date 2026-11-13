import { notFound } from "next/navigation";
import { getCaseFile } from "@/lib/cases/registry";
import { toPublicView } from "@/lib/cases/publicView";
import CaseFlowClient from "@/components/app/CaseFlowClient";

export default async function CasePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const caseFile = getCaseFile(caseId);
  if (!caseFile) notFound();
  return <CaseFlowClient caseId={caseId} initial={toPublicView(caseFile)} />;
}
