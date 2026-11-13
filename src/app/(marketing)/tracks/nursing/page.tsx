import type { Metadata } from "next";
import TrackOverview from "@/components/marketing/TrackOverview";

export const metadata: Metadata = {
  title: "Nursing",
  description: "Foundational nursing clinical judgment practice: assessment, prioritization, safe intervention.",
};

export default function NursingTrackPage() {
  return <TrackOverview trackKey="nursing" />;
}
