import Badge from "@/components/ui/Badge";
import type { ReviewStatus } from "@/lib/cases/types";

export default function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  if (status === "reviewed") {
    return <Badge tone="good">Clinically reviewed</Badge>;
  }
  return <Badge tone="warn">Needs clinical review</Badge>;
}
