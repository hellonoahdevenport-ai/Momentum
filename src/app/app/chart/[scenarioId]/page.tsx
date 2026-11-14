import { notFound } from "next/navigation";
import { getChartScenario } from "@/lib/chart/scenarios";
import { toChartPublicView } from "@/lib/chart/publicView";
import ChartingClient from "@/components/app/ChartingClient";

export default async function ChartScenarioPage({ params }: { params: Promise<{ scenarioId: string }> }) {
  const { scenarioId } = await params;
  const scenario = getChartScenario(scenarioId);
  if (!scenario) notFound();
  return <ChartingClient scenario={toChartPublicView(scenario)} />;
}
