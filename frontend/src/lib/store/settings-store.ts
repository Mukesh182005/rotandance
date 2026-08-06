"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LeadershipMember {
  id: string;
  role: string;
  name: string;
  photo?: string;
  email: string;
  phone: string;
  tenure: string;
}

export interface BasicAppConfig {
  clubName: string;
  clubLogo: string;
  clubCoverImage: string;
  clubMotto: string;
  academicYear: string;
  districtNumber: string;
  riYear: string;
  clubEmail: string;
  clubPhone: string;
  clubAddress: string;
  websiteUrl: string;
  timeZone: string;
  defaultLanguage: string;
  dateFormat: string;
  timeFormat: string;
  currency: string;
  appVersion: string;
}

export interface UserManagementConfig {
  allowMemberRegistration: boolean;
  registrationApprovalRequired: boolean;
  maxLoginAttempts: number;
  defaultUserRole: string;
  disableInactiveAccounts: boolean;
  accountAutoLock: boolean;
  memberIdFormat: string;
  qrCodeGeneration: boolean;
}

export interface RolesPermissionsConfig {
  roles: string[];
  permissionsList: string[];
  matrix: Record<string, Record<string, boolean>>;
}

export interface AuthSettingsConfig {
  methods: {
    googleLogin: boolean;
    emailLogin: boolean;
    otpLogin: boolean;
    passwordLogin: boolean;
    twoFactorAuth: boolean;
  };
  session: {
    sessionTimeoutMins: number;
    refreshTokenExpiryDays: number;
    rememberMeDays: number;
    autoLogout: boolean;
  };
  passwordPolicy: {
    minLength: number;
    uppercaseRequired: boolean;
    lowercaseRequired: boolean;
    numberRequired: boolean;
    specialCharRequired: boolean;
  };
}

export interface AttendanceSettingsConfig {
  window: {
    opensMinsBefore: number;
    closesMinsAfter: number;
  };
  options: {
    enableQrAttendance: boolean;
    enableManualAttendance: boolean;
    enableGeoAttendance: boolean;
    allowLateCheckin: boolean;
    allowAttendanceEditing: boolean;
    attendanceLockAfterEvent: boolean;
    autoCloseAttendance: boolean;
  };
}

export interface EventSettingsConfig {
  defaultDurationHours: number;
  maxParticipants: number;
  defaultVenue: string;
  approvalRequired: boolean;
  maxEventsPerDay: number;
  categories: string[];
}

export interface NotificationSettingsConfig {
  emailNotifications: boolean;
  pushNotifications: boolean;
  attendanceReminder: boolean;
  eventReminder: boolean;
  certificateNotification: boolean;
  lowAttendanceAlert: boolean;
}

export interface LoginPageDesignConfig {
  loginTitle: string;
  loginSubheading: string;
  loginBackgroundStyle: "Rotaract Glow" | "Deep Midnight" | "Royal Gold Accent" | "Glassmorphism Dark";
  loginButtonLabel: string;
  showPortalTabs: boolean;
  defaultPortalTab: "admin" | "member";
  loginNoticeText: string;
}

interface SettingsState {
  basicApp: BasicAppConfig;
  leadership: LeadershipMember[];
  userManagement: UserManagementConfig;
  rolesPermissions: RolesPermissionsConfig;
  authSettings: AuthSettingsConfig;
  attendanceSettings: AttendanceSettingsConfig;
  eventSettings: EventSettingsConfig;
  notificationSettings: NotificationSettingsConfig;
  loginPageDesign: LoginPageDesignConfig;

  updateBasicApp: (partial: Partial<BasicAppConfig>) => void;
  addLeadershipMember: (member: Omit<LeadershipMember, "id">) => void;
  updateLeadershipMember: (id: string, partial: Partial<LeadershipMember>) => void;
  deleteLeadershipMember: (id: string) => void;
  updateUserManagement: (partial: Partial<UserManagementConfig>) => void;
  togglePermission: (role: string, permission: string) => void;
  updateAuthMethods: (partial: Partial<AuthSettingsConfig["methods"]>) => void;
  updateAuthSession: (partial: Partial<AuthSettingsConfig["session"]>) => void;
  updatePasswordPolicy: (partial: Partial<AuthSettingsConfig["passwordPolicy"]>) => void;
  updateAttendanceWindow: (partial: Partial<AttendanceSettingsConfig["window"]>) => void;
  updateAttendanceOptions: (partial: Partial<AttendanceSettingsConfig["options"]>) => void;
  updateEventSettings: (partial: Partial<EventSettingsConfig>) => void;
  updateNotificationSettings: (partial: Partial<NotificationSettingsConfig>) => void;
  updateLoginPageDesign: (partial: Partial<LoginPageDesignConfig>) => void;
  resetAllSettings: () => void;
}

const DEFAULT_SETTINGS = {
  basicApp: {
    clubName: "Rotaract Club of Atria IT",
    clubLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&auto=format&fit=crop&q=80",
    clubCoverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    clubMotto: "Create Lasting Impact",
    academicYear: "2025–2026",
    districtNumber: "RID 3192",
    riYear: "2025-26",
    clubEmail: "rotaract@atria.edu",
    clubPhone: "+91 98765 43210",
    clubAddress: "Atria Institute of Technology, ASB Block, Hebbal, Bengaluru - 560024",
    websiteUrl: "https://racatria.org",
    timeZone: "Asia/Kolkata (GMT+5:30)",
    defaultLanguage: "English (US)",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12-Hour (AM/PM)",
    currency: "INR (₹)",
    appVersion: "v2.4.0",
  },

  leadership: [
    {
      id: "l1",
      role: "President",
      name: "President Nigesh",
      email: "presidentnigesh@racatria.org",
      phone: "+91 98765 43210",
      tenure: "2025-2026",
    },
    {
      id: "l2",
      role: "Vice President",
      name: "Karthik Nair",
      email: "vicepresident@racatria.org",
      phone: "+91 98765 43211",
      tenure: "2025-2026",
    },
    {
      id: "l3",
      role: "Secretary",
      name: "Rohan Mehta",
      email: "secretary@racatria.org",
      phone: "+91 98765 43212",
      tenure: "2025-2026",
    },
    {
      id: "l4",
      role: "Treasurer",
      name: "Diya Sharma",
      email: "treasurer@racatria.org",
      phone: "+91 98765 43213",
      tenure: "2025-2026",
    },
    {
      id: "l5",
      role: "Club Service Director",
      name: "Sneha Reddy",
      email: "clubservice@racatria.org",
      phone: "+91 98765 43214",
      tenure: "2025-2026",
    },
    {
      id: "l6",
      role: "Community Service Director",
      name: "Aisha Khan",
      email: "communityservice@racatria.org",
      phone: "+91 98765 43215",
      tenure: "2025-2026",
    },
    {
      id: "l7",
      role: "Professional Development Director",
      name: "Nikhil Joshi",
      email: "profdev@racatria.org",
      phone: "+91 98765 43216",
      tenure: "2025-2026",
    },
    {
      id: "l8",
      role: "International Service Director",
      name: "Meera Iyer",
      email: "internationalservice@racatria.org",
      phone: "+91 98765 43217",
      tenure: "2025-2026",
    },
    {
      id: "l9",
      role: "Public Image Director",
      name: "Arjun Verma",
      email: "publicimage@racatria.org",
      phone: "+91 98765 43218",
      tenure: "2025-2026",
    },
    {
      id: "l10",
      role: "Faculty Coordinator",
      name: "Dr. Suresh Kumar",
      email: "faculty.coordinator@atria.edu",
      phone: "+91 98765 43219",
      tenure: "Permanent",
    },
  ],

  userManagement: {
    allowMemberRegistration: true,
    registrationApprovalRequired: true,
    maxLoginAttempts: 5,
    defaultUserRole: "Member",
    disableInactiveAccounts: false,
    accountAutoLock: true,
    memberIdFormat: "RCA-{YY}-{000}",
    qrCodeGeneration: false,
  },

  rolesPermissions: {
    roles: [
      "Super Admin",
      "President",
      "Vice President",
      "Secretary",
      "Board Member",
      "Event Coordinator",
      "Member",
    ],
    permissionsList: [
      "Create Event",
      "Delete Event",
      "Edit Event",
      "Upload Images",
      "Delete Images",
      "View Reports",
      "Download Reports",
      "Manage Members",
      "Manage Roles",
      "Generate Certificates",
      "Export Attendance",
      "Restore Backup",
      "View Audit Logs",
      "Change Settings",
    ],
    matrix: {
      "Super Admin": {
        "Create Event": true,
        "Delete Event": true,
        "Edit Event": true,
        "Upload Images": true,
        "Delete Images": true,
        "View Reports": true,
        "Download Reports": true,
        "Manage Members": true,
        "Manage Roles": true,
        "Generate Certificates": true,
        "Export Attendance": true,
        "Restore Backup": true,
        "View Audit Logs": true,
        "Change Settings": true,
      },
      President: {
        "Create Event": true,
        "Delete Event": true,
        "Edit Event": true,
        "Upload Images": true,
        "Delete Images": true,
        "View Reports": true,
        "Download Reports": true,
        "Manage Members": true,
        "Manage Roles": true,
        "Generate Certificates": true,
        "Export Attendance": true,
        "Restore Backup": false,
        "View Audit Logs": true,
        "Change Settings": true,
      },
      "Vice President": {
        "Create Event": true,
        "Delete Event": false,
        "Edit Event": true,
        "Upload Images": true,
        "Delete Images": false,
        "View Reports": true,
        "Download Reports": true,
        "Manage Members": true,
        "Manage Roles": false,
        "Generate Certificates": true,
        "Export Attendance": true,
        "Restore Backup": false,
        "View Audit Logs": true,
        "Change Settings": false,
      },
      Secretary: {
        "Create Event": true,
        "Delete Event": false,
        "Edit Event": true,
        "Upload Images": true,
        "Delete Images": false,
        "View Reports": true,
        "Download Reports": true,
        "Manage Members": true,
        "Manage Roles": false,
        "Generate Certificates": true,
        "Export Attendance": true,
        "Restore Backup": false,
        "View Audit Logs": true,
        "Change Settings": false,
      },
      "Board Member": {
        "Create Event": true,
        "Delete Event": false,
        "Edit Event": true,
        "Upload Images": true,
        "Delete Images": false,
        "View Reports": true,
        "Download Reports": true,
        "Manage Members": false,
        "Manage Roles": false,
        "Generate Certificates": false,
        "Export Attendance": true,
        "Restore Backup": false,
        "View Audit Logs": false,
        "Change Settings": false,
      },
      "Event Coordinator": {
        "Create Event": true,
        "Delete Event": false,
        "Edit Event": true,
        "Upload Images": true,
        "Delete Images": false,
        "View Reports": false,
        "Download Reports": false,
        "Manage Members": false,
        "Manage Roles": false,
        "Generate Certificates": false,
        "Export Attendance": true,
        "Restore Backup": false,
        "View Audit Logs": false,
        "Change Settings": false,
      },
      Member: {
        "Create Event": false,
        "Delete Event": false,
        "Edit Event": false,
        "Upload Images": false,
        "Delete Images": false,
        "View Reports": false,
        "Download Reports": false,
        "Manage Members": false,
        "Manage Roles": false,
        "Generate Certificates": false,
        "Export Attendance": false,
        "Restore Backup": false,
        "View Audit Logs": false,
        "Change Settings": false,
      },
    },
  },

  authSettings: {
    methods: {
      googleLogin: true,
      emailLogin: true,
      otpLogin: false,
      passwordLogin: true,
      twoFactorAuth: false,
    },
    session: {
      sessionTimeoutMins: 60,
      refreshTokenExpiryDays: 30,
      rememberMeDays: 14,
      autoLogout: true,
    },
    passwordPolicy: {
      minLength: 8,
      uppercaseRequired: true,
      lowercaseRequired: true,
      numberRequired: true,
      specialCharRequired: false,
    },
  },

  attendanceSettings: {
    window: {
      opensMinsBefore: 10,
      closesMinsAfter: 30,
    },
    options: {
      enableQrAttendance: false,
      enableManualAttendance: true,
      enableGeoAttendance: false,
      allowLateCheckin: true,
      allowAttendanceEditing: true,
      attendanceLockAfterEvent: true,
      autoCloseAttendance: true,
    },
  },

  eventSettings: {
    defaultDurationHours: 2,
    maxParticipants: 200,
    defaultVenue: "Atria Main Seminar Hall",
    approvalRequired: true,
    maxEventsPerDay: 3,
    categories: [
      "Meeting",
      "Service",
      "Workshop",
      "Orientation",
      "Discussion",
      "Fundraiser",
      "Custom",
    ],
  },

  notificationSettings: {
    emailNotifications: true,
    pushNotifications: true,
    attendanceReminder: true,
    eventReminder: true,
    certificateNotification: false,
    lowAttendanceAlert: true,
  },

  loginPageDesign: {
    loginTitle: "SIGN IN",
    loginSubheading: "CREATE\nLASTING\nIMPACT",
    loginBackgroundStyle: "Rotaract Glow" as const,
    loginButtonLabel: "Sign In",
    showPortalTabs: true,
    defaultPortalTab: "admin" as const,
    loginNoticeText: "Super Admin: presidentnigesh@racatria.org / 12345678",
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      updateBasicApp: (partial) =>
        set((state) => ({ basicApp: { ...state.basicApp, ...partial } })),

      addLeadershipMember: (member) =>
        set((state) => ({
          leadership: [
            ...state.leadership,
            { ...member, id: `l-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}` },
          ],
        })),

      updateLeadershipMember: (id, partial) =>
        set((state) => ({
          leadership: state.leadership.map((l) =>
            l.id === id ? { ...l, ...partial } : l,
          ),
        })),

      deleteLeadershipMember: (id) =>
        set((state) => ({
          leadership: state.leadership.filter((l) => l.id !== id),
        })),

      updateUserManagement: (partial) =>
        set((state) => ({
          userManagement: { ...state.userManagement, ...partial },
        })),

      togglePermission: (role, permission) =>
        set((state) => {
          const currentRoleMatrix = state.rolesPermissions.matrix[role] || {};
          const currentVal = !!currentRoleMatrix[permission];
          return {
            rolesPermissions: {
              ...state.rolesPermissions,
              matrix: {
                ...state.rolesPermissions.matrix,
                [role]: {
                  ...currentRoleMatrix,
                  [permission]: !currentVal,
                },
              },
            },
          };
        }),

      updateAuthMethods: (partial) =>
        set((state) => ({
          authSettings: {
            ...state.authSettings,
            methods: { ...state.authSettings.methods, ...partial },
          },
        })),

      updateAuthSession: (partial) =>
        set((state) => ({
          authSettings: {
            ...state.authSettings,
            session: { ...state.authSettings.session, ...partial },
          },
        })),

      updatePasswordPolicy: (partial) =>
        set((state) => ({
          authSettings: {
            ...state.authSettings,
            passwordPolicy: { ...state.authSettings.passwordPolicy, ...partial },
          },
        })),

      updateAttendanceWindow: (partial) =>
        set((state) => ({
          attendanceSettings: {
            ...state.attendanceSettings,
            window: { ...state.attendanceSettings.window, ...partial },
          },
        })),

      updateAttendanceOptions: (partial) =>
        set((state) => ({
          attendanceSettings: {
            ...state.attendanceSettings,
            options: { ...state.attendanceSettings.options, ...partial },
          },
        })),

      updateEventSettings: (partial) =>
        set((state) => ({
          eventSettings: { ...state.eventSettings, ...partial },
        })),

      updateNotificationSettings: (partial) =>
        set((state) => ({
          notificationSettings: { ...state.notificationSettings, ...partial },
        })),

      updateLoginPageDesign: (partial) =>
        set((state) => ({
          loginPageDesign: { ...state.loginPageDesign, ...partial },
        })),

      resetAllSettings: () => set(DEFAULT_SETTINGS),
    }),
    { name: "rcaems-system-settings" },
  ),
);
