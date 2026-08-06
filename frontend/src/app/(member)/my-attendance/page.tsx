import { QrCode } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function MyAttendancePage() {
  return (
    <ComingSoon
      icon={QrCode}
      title="My Attendance"
      description="A full history of every event you've checked into, with streaks and monthly breakdowns, is coming soon. Your live stats are on the Home tab."
      backHref="/me"
    />
  );
}
