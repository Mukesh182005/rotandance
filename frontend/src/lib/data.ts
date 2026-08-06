/**
 * Seed / demo data for RCAEMS.
 * Mirrors the content shown in the RCAEMS design system (Login, Dashboard,
 * Attendance, Events, Members, Reports, Member portal, Profile).
 */

export type Portal = "admin" | "member";

export interface Session {
  name: string;
  initials: string;
  role: string;
  department: string;
  memberId: string;
  portal: Portal;
  email?: string;
}

export const SUPER_ADMIN: Session = {
  name: "President Nigesh",
  initials: "PN",
  role: "Super Admin",
  department: "Executive",
  memberId: "RCA-000",
  portal: "admin",
  email: "presidentnigesh@racatria.org",
};

export const SUPER_ADMIN_CREDENTIALS = {
  email: "presidentnigesh@racatria.org",
  password: "12345678",
};

export const DEMO_ADMIN: Session = {
  name: "Ananya Rao",
  initials: "AR",
  role: "President",
  department: "CSE",
  memberId: "RCA-001",
  portal: "admin",
};

export const DEMO_MEMBER: Session = {
  name: "Rohan Mehta",
  initials: "RM",
  role: "Secretary",
  department: "ISE",
  memberId: "RCA-022",
  portal: "member",
};

export interface Member {
  id: string;
  memberId: string;
  name: string;
  initials: string;
  department: string;
  year: string;
  role: string;
  attendance: number;
  status: "Active" | "Inactive";
}

export const MEMBERS: Member[] = [
  {
    id: "m0",
    memberId: "RCA-000",
    name: "President Nigesh",
    initials: "PN",
    department: "Executive",
    year: "4th",
    role: "Super Admin",
    attendance: 100,
    status: "Active",
  },
  {
    id: "m1",
    memberId: "RCA-001",
    name: "Ananya Rao",
    initials: "AR",
    department: "CSE",
    year: "3rd",
    role: "President",
    attendance: 96,
    status: "Active",
  },
  {
    id: "m2",
    memberId: "RCA-014",
    name: "Karthik Nair",
    initials: "KN",
    department: "MECH",
    year: "3rd",
    role: "Vice President",
    attendance: 91,
    status: "Active",
  },
  {
    id: "m3",
    memberId: "RCA-022",
    name: "Rohan Mehta",
    initials: "RM",
    department: "ISE",
    year: "2nd",
    role: "Secretary",
    attendance: 88,
    status: "Active",
  },
  {
    id: "m4",
    memberId: "RCA-031",
    name: "Diya Sharma",
    initials: "DS",
    department: "ECE",
    year: "2nd",
    role: "Treasurer",
    attendance: 84,
    status: "Active",
  },
  {
    id: "m5",
    memberId: "RCA-045",
    name: "Sneha Reddy",
    initials: "SR",
    department: "AIML",
    year: "3rd",
    role: "Member",
    attendance: 79,
    status: "Active",
  },
  {
    id: "m6",
    memberId: "RCA-058",
    name: "Aisha Khan",
    initials: "AK",
    department: "CSE",
    year: "1st",
    role: "Member",
    attendance: 90,
    status: "Active",
  },
  {
    id: "m7",
    memberId: "RCA-052",
    name: "Vishal Gowda",
    initials: "VG",
    department: "MBA",
    year: "1st",
    role: "Member",
    attendance: 61,
    status: "Inactive",
  },
];

export type EventStatus = "Live" | "Upcoming" | "Past";

export interface ClubEvent {
  id: string;
  title: string;
  type: string;
  date: string; // display label, e.g. "Aug 08"
  time: string;
  venue: string;
  status: EventStatus;
  attendeeInitials: string[];
  attendeeExtra: number;
  attendedCount?: number;
}

export const EVENTS: ClubEvent[] = [
  {
    id: "e1",
    title: "Blood Donation Camp",
    type: "Community",
    date: "Aug 08",
    time: "9:00 AM",
    venue: "Atria Main Block",
    status: "Live",
    attendeeInitials: ["AR", "KN", "DS"],
    attendeeExtra: 91,
  },
  {
    id: "e2",
    title: "Weekly GBM #14",
    type: "Meeting",
    date: "Aug 05",
    time: "5:30 PM",
    venue: "Room 304",
    status: "Upcoming",
    attendeeInitials: ["RM"],
    attendeeExtra: 64,
  },
  {
    id: "e3",
    title: "Intro to AI Workshop",
    type: "Technical",
    date: "Aug 12",
    time: "2:00 PM",
    venue: "Seminar Hall 2",
    status: "Upcoming",
    attendeeInitials: ["SR"],
    attendeeExtra: 38,
  },
  {
    id: "e4",
    title: "Tree Plantation Drive",
    type: "Environment",
    date: "Aug 20",
    time: "7:00 AM",
    venue: "Hebbal Lake",
    status: "Upcoming",
    attendeeInitials: ["NJ"],
    attendeeExtra: 27,
  },
  {
    id: "e5",
    title: "Community Cleanup",
    type: "Service",
    date: "Jul 28",
    time: "Done",
    venue: "—",
    status: "Past",
    attendeeInitials: [],
    attendeeExtra: 0,
    attendedCount: 92,
  },
  {
    id: "e6",
    title: "Rotaract Orientation",
    type: "Club",
    date: "Jul 20",
    time: "Done",
    venue: "—",
    status: "Past",
    attendeeInitials: [],
    attendeeExtra: 0,
    attendedCount: 118,
  },
];

export interface CheckIn {
  id: string;
  name: string;
  initials: string;
  department: string;
  time: string;
  method: "Manual" | "Admin Log";
  status: "Present" | "Volunteer" | "Late" | "Absent";
}

export const LIVE_EVENT = {
  title: "Blood Donation Camp",
  type: "Community Service",
  venue: "Atria Main Block",
  window: "9:00 AM – 1:00 PM",
  coordinator: "Karthik Nair",
  capacity: 128,
};

export const CHECKIN_LOG: CheckIn[] = [
  {
    id: "c1",
    name: "Ananya Rao",
    initials: "AR",
    department: "CSE",
    time: "5:31",
    method: "Manual",
    status: "Present",
  },
  {
    id: "c2",
    name: "Karthik Nair",
    initials: "KN",
    department: "MECH",
    time: "5:33",
    method: "Manual",
    status: "Volunteer",
  },
  {
    id: "c3",
    name: "Diya Sharma",
    initials: "DS",
    department: "ECE",
    time: "5:36",
    method: "Manual",
    status: "Late",
  },
  {
    id: "c4",
    name: "Sneha Reddy",
    initials: "SR",
    department: "AIML",
    time: "5:39",
    method: "Manual",
    status: "Present",
  },
  {
    id: "c5",
    name: "Vishal Gowda",
    initials: "VG",
    department: "MBA",
    time: "—",
    method: "Manual",
    status: "Absent",
  },
];

/** Pool of demo members who can "arrive" during the live scan simulation. */
export const SCAN_POOL: Omit<CheckIn, "id" | "time" | "method" | "status">[] = [
  { name: "Aisha Khan", initials: "AK", department: "CSE" },
  { name: "Nikhil Joshi", initials: "NJ", department: "AIML" },
  { name: "Meera Iyer", initials: "MI", department: "ECE" },
  { name: "Arjun Verma", initials: "AV", department: "ISE" },
  { name: "Priya Menon", initials: "PM", department: "MECH" },
  { name: "Rahul Kapoor", initials: "RK", department: "CSE" },
];

export const TOP_VOLUNTEERS = [
  { name: "Ananya Rao", initials: "AR", hours: 64 },
  { name: "Karthik Nair", initials: "KN", hours: 58 },
  { name: "Sneha Reddy", initials: "SR", hours: 52 },
  { name: "Rohan Mehta", initials: "RM", hours: 47 },
];

export const ATTENDANCE_TREND = [
  { m: "Sep", v: 76 },
  { m: "Oct", v: 81 },
  { m: "Nov", v: 73 },
  { m: "Dec", v: 88 },
  { m: "Jan", v: 84 },
  { m: "Feb", v: 91 },
];

export const GROWTH_TREND = [
  { m: "Sep", v: 18 },
  { m: "Oct", v: 24 },
  { m: "Nov", v: 12 },
  { m: "Dec", v: 31 },
  { m: "Jan", v: 22 },
  { m: "Feb", v: 28 },
];

export const DEPARTMENT_BREAKDOWN = [
  { dept: "CSE", count: 32 },
  { dept: "ISE", count: 24 },
  { dept: "ECE", count: 20 },
  { dept: "MECH", count: 18 },
  { dept: "AIML", count: 16 },
  { dept: "Others", count: 32 },
];

export const REPORT_STATS = {
  avgAttendance: 82,
  eventsHeld: 23,
  volunteerHours: 1284,
  retention: 94,
};

export const DASHBOARD_STATS = {
  totalMembers: 142,
  attendanceRate: 82,
  upcomingEvents: 5,
  capacity: 128,
};

export interface Achievement {
  id: string;
  title: string;
  earned: boolean;
  icon: "medal" | "drop" | "shield" | "target";
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", title: "Perfect Month", earned: true, icon: "medal" },
  { id: "a2", title: "Blood Donor", earned: true, icon: "drop" },
  { id: "a3", title: "50h Service", earned: false, icon: "shield" },
  { id: "a4", title: "Recruiter", earned: false, icon: "target" },
];

export interface ActivityItem {
  id: string;
  label: string;
  meta: string;
  active: boolean;
}

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "act1",
    label: "Checked in · Blood Donation Camp",
    meta: "Volunteer · Today, 9:14 AM",
    active: true,
  },
  {
    id: "act2",
    label: "Earned badge · Perfect Month",
    meta: "Jul 31, 2026",
    active: true,
  },
  { id: "act3", label: "Attended · Weekly GBM #13", meta: "Jul 29, 2026", active: false },
  {
    id: "act4",
    label: "RSVP'd · Intro to AI Workshop",
    meta: "Jul 27, 2026",
    active: false,
  },
];

export const MEMBER_PROFILE = {
  email: "rohan.mehta@atria.edu",
  phone: "+91 98765 43210",
  location: "Bengaluru, Karnataka",
  joined: "12 Aug 2024",
  eventsAttended: 21,
  eventsTotal: 23,
  volunteerHours: 47,
  streak: 6,
  badges: 6,
};

export const NAV = {
  admin: [
    { key: "dashboard", label: "Dashboard", href: "/admin" },
    { key: "events", label: "Events", href: "/events" },
    { key: "attendance", label: "Attendance", href: "/attendance" },
    { key: "members", label: "Members", href: "/members" },
    { key: "reports", label: "Reports", href: "/reports" },
    { key: "settings", label: "Settings", href: "/settings" },
  ],
  member: [
    { key: "home", label: "Home", href: "/me" },
    { key: "attendance", label: "My Attendance", href: "/my-attendance" },
    { key: "events", label: "Events", href: "/browse-events" },
    { key: "profile", label: "Profile", href: "/profile" },
  ],
};

export const BOTTOM_NAV = {
  admin: [
    { key: "home", label: "Home", href: "/admin", icon: "home" as const },
    { key: "events", label: "Events", href: "/events", icon: "calendar" as const },
    { key: "scan", label: "Scan", href: "/attendance", icon: "scan" as const },
    { key: "members", label: "Members", href: "/members", icon: "users" as const },
    { key: "profile", label: "Profile", href: "/settings", icon: "user" as const },
  ],
  member: [
    { key: "home", label: "Home", href: "/me", icon: "home" as const },
    { key: "events", label: "Events", href: "/browse-events", icon: "calendar" as const },
    { key: "scan", label: "Scan", href: "/my-attendance", icon: "scan" as const },
    { key: "profile", label: "Profile", href: "/profile", icon: "user" as const },
  ],
};
