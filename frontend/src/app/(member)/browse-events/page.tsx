import { Calendar } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function BrowseEventsPage() {
  return (
    <ComingSoon
      icon={Calendar}
      title="Browse Events"
      description="A member-friendly events feed with one-tap RSVP is on its way. In the meantime, upcoming events you're linked to appear on Home."
      backHref="/me"
    />
  );
}
