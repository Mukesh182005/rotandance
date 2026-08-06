import {
  Award,
  Bell,
  Calendar,
  LayoutGrid,
  Home,
  QrCode,
  Settings,
  Users,
  BarChart3,
  User,
  type LucideIcon,
} from "lucide-react";

export const NAV_ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutGrid,
  home: Home,
  events: Calendar,
  attendance: QrCode,
  scan: QrCode,
  members: Users,
  reports: BarChart3,
  certificates: Award,
  certs: Award,
  notifications: Bell,
  settings: Settings,
  profile: User,
  user: User,
  calendar: Calendar,
  award: Award,
  users: Users,
};

export function NavIcon({ name, className }: { name: string; className?: string }) {
  const Icon = NAV_ICONS[name] ?? Home;
  return <Icon className={className} />;
}
