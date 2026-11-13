import { listCases } from "@/lib/cases/registry";
import LibraryClient from "@/components/app/LibraryClient";

export default function LibraryPage() {
  const cards = listCases().map((c) => ({
    id: c.meta.id,
    title: c.meta.title,
    trackKey: c.meta.trackKey,
    unitKey: c.meta.unitKey,
    estimatedMinutes: c.meta.estimatedMinutes,
    reviewStatus: c.meta.reviewStatus,
    presentingIssue: c.presentingIssue,
  }));
  return <LibraryClient cards={cards} />;
}
