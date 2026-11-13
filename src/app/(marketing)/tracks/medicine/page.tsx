import type { Metadata } from "next";
import TrackOverview from "@/components/marketing/TrackOverview";

export const metadata: Metadata = {
  title: "Medicine",
  description: "Foundational, Step 1-aligned clinical reasoning practice for medical students.",
};

export default function MedicineTrackPage() {
  return <TrackOverview trackKey="medicine" />;
}
