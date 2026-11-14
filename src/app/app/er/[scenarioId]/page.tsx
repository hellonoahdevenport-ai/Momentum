import { notFound } from "next/navigation";
import { getErScenario } from "@/lib/er/scenarios";
import { toErPublicView } from "@/lib/er/publicView";
import ErScenarioClient from "@/components/app/ErScenarioClient";

export default async function ErScenarioPage({ params }: { params: Promise<{ scenarioId: string }> }) {
  const { scenarioId } = await params;
  const scenario = getErScenario(scenarioId);
  if (!scenario) notFound();
  return <ErScenarioClient scenario={toErPublicView(scenario)} />;
}
