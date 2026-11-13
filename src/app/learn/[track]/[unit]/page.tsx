import { notFound } from "next/navigation";
import { isTrackKey } from "@/lib/tracks";
import { unitByKey } from "@/lib/units";
import CaseFlowClient from "@/components/CaseFlowClient";

export default async function UnitCasePage({
  params,
}: {
  params: Promise<{ track: string; unit: string }>;
}) {
  const { track, unit } = await params;
  if (!isTrackKey(track) || !unitByKey(unit)) notFound();
  return <CaseFlowClient trackKey={track} unitKey={unit} />;
}
