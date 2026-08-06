"use client";

import * as React from "react";
import {
  User,
  ShieldCheck,
  Palette,
  Sliders,
  Lock,
  Save,
  Building2,
  Users,
  Key,
  Clock,
  Calendar,
  Bell,
  Globe,
  Layout,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Download,
  RotateCcw,
  Plus,
  Trash2,
  Eye,
  ShieldAlert,
  Smartphone,
  Mail,
  Phone,
  Edit3,
} from "lucide-react";
import { toast } from "sonner";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuthStore } from "@/lib/store/auth-store";
import { useSettingsStore, type LeadershipMember } from "@/lib/store/settings-store";

export default function ComprehensiveSettingsPage() {
  const session = useAuthStore((s) => s.session);
  const updateSession = useAuthStore((s) => s.updateSession);
  const settingsStore = useSettingsStore();

  const isAdminOrPresident =
    session?.role === "Super Admin" || session?.role === "President";

  // State for Core Team editor dialogs
  const [editingLeader, setEditingLeader] = React.useState<LeadershipMember | null>(null);
  const [isAddingLeader, setIsAddingLeader] = React.useState(false);
  const [newLeaderRole, setNewLeaderRole] = React.useState("");
  const [newLeaderName, setNewLeaderName] = React.useState("");
  const [newLeaderEmail, setNewLeaderEmail] = React.useState("");
  const [newLeaderPhone, setNewLeaderPhone] = React.useState("");
  const [newLeaderTenure, setNewLeaderTenure] = React.useState("2025-2026");

  if (!session) return null;

  const handleSaveBasicApp = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Basic application configuration saved", {
      description: "Updated club identity, contact details, and app defaults.",
    });
  };

  const handleAddCoreTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeaderRole || !newLeaderName || !newLeaderEmail) {
      toast.error("Please fill in role, name, and email.");
      return;
    }
    settingsStore.addLeadershipMember({
      role: newLeaderRole,
      name: newLeaderName,
      email: newLeaderEmail,
      phone: newLeaderPhone || "+91 98765 00000",
      tenure: newLeaderTenure || "2025-2026",
    });
    setIsAddingLeader(false);
    setNewLeaderRole("");
    setNewLeaderName("");
    setNewLeaderEmail("");
    setNewLeaderPhone("");
    toast.success("Core Team Member Added", {
      description: `${newLeaderName} (${newLeaderRole}) added to Core Team.`,
    });
  };

  const handleSaveLeadershipMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLeader) return;
    settingsStore.updateLeadershipMember(editingLeader.id, editingLeader);
    setEditingLeader(null);
    toast.success(`${editingLeader.role} profile updated`, {
      description: `Core Team details for ${editingLeader.name} saved.`,
    });
  };

  const handleDeleteCoreTeamMember = (id: string, name: string) => {
    settingsStore.deleteLeadershipMember(id);
    toast.success("Core Team Member Removed", {
      description: `${name} has been removed from Core Team.`,
    });
  };

  const handleExportBackup = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      session,
      settings: {
        basicApp: settingsStore.basicApp,
        userManagement: settingsStore.userManagement,
        rolesPermissions: settingsStore.rolesPermissions,
        authSettings: settingsStore.authSettings,
        attendanceSettings: settingsStore.attendanceSettings,
        eventSettings: settingsStore.eventSettings,
        notificationSettings: settingsStore.notificationSettings,
        loginPageDesign: settingsStore.loginPageDesign,
      },
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rcaems-full-settings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Settings Backup Exported", {
      description: "Downloaded system JSON backup file.",
    });
  };

  return (
    <div className="flex min-h-svh flex-col">
      <Topbar title="Settings" searchPlaceholder="Search system configuration..." session={session} />

      <main className="flex-1 space-y-6 p-5 sm:p-7 lg:p-8">
        {/* Header Title Banner */}
        <div className="glass-panel flex flex-col items-start justify-between gap-4 rounded-2xl p-6 md:flex-row md:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md">
                <Sliders className="h-5 w-5" />
              </div>
              <h1 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
                System Administration & Settings
              </h1>
            </div>
            <p className="text-text-dim text-sm">
              Comprehensive 9-section control panel for club rules, leadership directory, RBAC, authentication, and login page design.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Button variant="outline" size="sm" onClick={handleExportBackup} className="gap-1.5 border-white/15 text-xs font-semibold">
              <Download className="h-3.5 w-3.5 text-brand-pink" /> Backup
            </Button>

            <Badge variant="outline" className="border-brand-pink/40 text-brand-pink gap-1.5 px-3 py-1.5 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" /> {session.role}
            </Badge>
          </div>
        </div>

        {/* 9-Section Navigation Tabs */}
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="glass-panel grid w-full grid-cols-3 gap-1 p-1.5 md:grid-cols-9">
            <TabsTrigger value="basic" className="gap-1.5 text-[11px] font-semibold sm:text-xs">
              <Building2 className="h-3.5 w-3.5" /> Basic
            </TabsTrigger>
            <TabsTrigger value="leadership" className="gap-1.5 text-[11px] font-semibold sm:text-xs">
              <Users className="h-3.5 w-3.5" /> Core Team
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-1.5 text-[11px] font-semibold sm:text-xs">
              <User className="h-3.5 w-3.5" /> Users
            </TabsTrigger>
            <TabsTrigger value="roles" className="gap-1.5 text-[11px] font-semibold sm:text-xs">
              <ShieldCheck className="h-3.5 w-3.5" /> Roles
            </TabsTrigger>
            <TabsTrigger value="auth" className="gap-1.5 text-[11px] font-semibold sm:text-xs">
              <Lock className="h-3.5 w-3.5" /> Auth
            </TabsTrigger>
            <TabsTrigger value="attendance" className="gap-1.5 text-[11px] font-semibold sm:text-xs">
              <Clock className="h-3.5 w-3.5" /> Attendance
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-1.5 text-[11px] font-semibold sm:text-xs">
              <Calendar className="h-3.5 w-3.5" /> Events
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5 text-[11px] font-semibold sm:text-xs">
              <Bell className="h-3.5 w-3.5" /> Alerts
            </TabsTrigger>
            <TabsTrigger value="signin" className="gap-1.5 text-[11px] font-semibold text-brand-pink sm:text-xs">
              <Layout className="h-3.5 w-3.5" /> Sign In
            </TabsTrigger>
          </TabsList>

          {/* SECTION 1: BASIC APPLICATION CONFIGURATION */}
          <TabsContent value="basic" className="space-y-6">
            <form onSubmit={handleSaveBasicApp}>
              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <Building2 className="text-brand-pink h-5 w-5" /> Basic Application Configuration
                  </CardTitle>
                  <CardDescription>
                    Define core club identity, contact information, regional settings, and regional formats.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="clubName">Club Name</Label>
                      <Input
                        id="clubName"
                        value={settingsStore.basicApp.clubName}
                        onChange={(e) => settingsStore.updateBasicApp({ clubName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clubMotto">Club Motto</Label>
                      <Input
                        id="clubMotto"
                        value={settingsStore.basicApp.clubMotto}
                        onChange={(e) => settingsStore.updateBasicApp({ clubMotto: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="districtNumber">District Number</Label>
                      <Input
                        id="districtNumber"
                        value={settingsStore.basicApp.districtNumber}
                        onChange={(e) => settingsStore.updateBasicApp({ districtNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="academicYear">Academic Year</Label>
                      <Input
                        id="academicYear"
                        value={settingsStore.basicApp.academicYear}
                        onChange={(e) => settingsStore.updateBasicApp({ academicYear: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="riYear">Rotary International (RI) Year</Label>
                      <Input
                        id="riYear"
                        value={settingsStore.basicApp.riYear}
                        onChange={(e) => settingsStore.updateBasicApp({ riYear: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appVersion">App Version</Label>
                      <Input id="appVersion" value={settingsStore.basicApp.appVersion} disabled className="opacity-70" />
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="clubEmail">Club Official Email</Label>
                      <Input
                        id="clubEmail"
                        type="email"
                        value={settingsStore.basicApp.clubEmail}
                        onChange={(e) => settingsStore.updateBasicApp({ clubEmail: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clubPhone">Club Official Phone</Label>
                      <Input
                        id="clubPhone"
                        value={settingsStore.basicApp.clubPhone}
                        onChange={(e) => settingsStore.updateBasicApp({ clubPhone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="websiteUrl">Website URL</Label>
                      <Input
                        id="websiteUrl"
                        value={settingsStore.basicApp.websiteUrl}
                        onChange={(e) => settingsStore.updateBasicApp({ websiteUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clubAddress">Club Physical Address / Venue</Label>
                    <Input
                      id="clubAddress"
                      value={settingsStore.basicApp.clubAddress}
                      onChange={(e) => settingsStore.updateBasicApp({ clubAddress: e.target.value })}
                    />
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="grid gap-4 sm:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeZone">Time Zone</Label>
                      <Input
                        id="timeZone"
                        value={settingsStore.basicApp.timeZone}
                        onChange={(e) => settingsStore.updateBasicApp({ timeZone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="defaultLanguage">Default Language</Label>
                      <Input
                        id="defaultLanguage"
                        value={settingsStore.basicApp.defaultLanguage}
                        onChange={(e) => settingsStore.updateBasicApp({ defaultLanguage: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Input
                        id="dateFormat"
                        value={settingsStore.basicApp.dateFormat}
                        onChange={(e) => settingsStore.updateBasicApp({ dateFormat: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Input
                        id="currency"
                        value={settingsStore.basicApp.currency}
                        onChange={(e) => settingsStore.updateBasicApp({ currency: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button type="submit" className="brand-gradient gap-2 px-6 font-bold text-white shadow-lg">
                      <Save className="h-4 w-4" /> Save Basic Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </TabsContent>

          {/* SECTION 2: CLUB INFORMATION & CORE TEAM DIRECTORY */}
          <TabsContent value="leadership" className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <Users className="text-brand-pink h-5 w-5" /> Current Rotaract Core Team
                  </CardTitle>
                  <CardDescription>
                    Directory of current executive board officers, avenue directors, and faculty coordinator.
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setIsAddingLeader(true)}
                  className="brand-gradient gap-1.5 font-bold text-white shadow-md text-xs shrink-0"
                >
                  <Plus className="h-4 w-4" /> Add Core Team Member
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {settingsStore.leadership.map((leader) => (
                    <div
                      key={leader.id}
                      className="glass-card flex flex-col justify-between border-white/10 p-4 transition-all hover:border-brand-pink/40"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12 border border-brand-pink/40 shrink-0">
                          <AvatarFallback className="brand-gradient font-heading text-xs font-bold text-white">
                            {leader.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <Badge className="bg-brand-pink/20 text-brand-pink border-brand-pink/30 mb-1 text-[10px]">
                            {leader.role}
                          </Badge>
                          <div className="truncate text-sm font-bold text-foreground">{leader.name}</div>
                          <div className="text-text-dim truncate text-xs">{leader.email}</div>
                          <div className="text-text-faint truncate text-[11px]">{leader.phone} · Tenure: {leader.tenure}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-end gap-1.5 pt-2 border-t border-white/5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1 text-xs text-brand-pink hover:bg-brand-pink/10"
                          onClick={() => setEditingLeader(leader)}
                        >
                          <Edit3 className="h-3.5 w-3.5" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteCoreTeamMember(leader.id, leader.name)}
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Core Team Member Dialog */}
            {isAddingLeader && (
              <Dialog open={isAddingLeader} onOpenChange={setIsAddingLeader}>
                <DialogContent className="glass-panel border-white/10 sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-lg font-bold">Add Core Team Member</DialogTitle>
                    <DialogDescription>Add a new officer or director to the Rotaract Core Team directory.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddCoreTeamMember} className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="newRole">Role / Position</Label>
                      <Input
                        id="newRole"
                        value={newLeaderRole}
                        onChange={(e) => setNewLeaderRole(e.target.value)}
                        placeholder="e.g. Editorial Director"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newName">Full Name</Label>
                      <Input
                        id="newName"
                        value={newLeaderName}
                        onChange={(e) => setNewLeaderName(e.target.value)}
                        placeholder="e.g. Varun Sharma"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newEmail">Email Address</Label>
                      <Input
                        id="newEmail"
                        type="email"
                        value={newLeaderEmail}
                        onChange={(e) => setNewLeaderEmail(e.target.value)}
                        placeholder="e.g. varun@racatria.org"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPhone">Phone Number</Label>
                      <Input
                        id="newPhone"
                        value={newLeaderPhone}
                        onChange={(e) => setNewLeaderPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newTenure">Tenure</Label>
                      <Input
                        id="newTenure"
                        value={newLeaderTenure}
                        onChange={(e) => setNewLeaderTenure(e.target.value)}
                        placeholder="2025-2026"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button type="button" variant="ghost" onClick={() => setIsAddingLeader(false)}>Cancel</Button>
                      <Button type="submit" className="brand-gradient font-bold text-white">Add Member</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}

            {/* Core Team Edit Dialog */}
            {editingLeader && (
              <Dialog open={!!editingLeader} onOpenChange={() => setEditingLeader(null)}>
                <DialogContent className="glass-panel border-white/10 sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-lg font-bold">Edit {editingLeader.role}</DialogTitle>
                    <DialogDescription>Update contact information and tenure for this core team position.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSaveLeadershipMember} className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="leaderName">Name</Label>
                      <Input
                        id="leaderName"
                        value={editingLeader.name}
                        onChange={(e) => setEditingLeader({ ...editingLeader, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leaderEmail">Email Address</Label>
                      <Input
                        id="leaderEmail"
                        type="email"
                        value={editingLeader.email}
                        onChange={(e) => setEditingLeader({ ...editingLeader, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leaderPhone">Phone Number</Label>
                      <Input
                        id="leaderPhone"
                        value={editingLeader.phone}
                        onChange={(e) => setEditingLeader({ ...editingLeader, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leaderTenure">Tenure</Label>
                      <Input
                        id="leaderTenure"
                        value={editingLeader.tenure}
                        onChange={(e) => setEditingLeader({ ...editingLeader, tenure: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button type="button" variant="ghost" onClick={() => setEditingLeader(null)}>Cancel</Button>
                      <Button type="submit" className="brand-gradient font-bold text-white">Save Changes</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          {/* SECTION 3: USER MANAGEMENT CONFIGURATION */}
          <TabsContent value="users" className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  <User className="text-brand-pink h-5 w-5" /> User Management & Account Policies
                </CardTitle>
                <CardDescription>
                  Control registration workflows, member ID formats, and account locking rules.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="defaultRole">Default User Role on Join</Label>
                    <Select
                      value={settingsStore.userManagement.defaultUserRole}
                      onValueChange={(v) => settingsStore.updateUserManagement({ defaultUserRole: v })}
                    >
                      <SelectTrigger id="defaultRole"><SelectValue placeholder="Select default role" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Member">Member</SelectItem>
                        <SelectItem value="Event Coordinator">Event Coordinator</SelectItem>
                        <SelectItem value="Board Member">Board Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="memberIdFormat">Member ID Sequence Pattern</Label>
                    <Input
                      id="memberIdFormat"
                      value={settingsStore.userManagement.memberIdFormat}
                      onChange={(e) => settingsStore.updateUserManagement({ memberIdFormat: e.target.value })}
                    />
                    <p className="text-text-dim text-[11px]">Example output: RCA-26-042</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Maximum Failed Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      min="3"
                      max="10"
                      value={settingsStore.userManagement.maxLoginAttempts}
                      onChange={(e) => settingsStore.updateUserManagement({ maxLoginAttempts: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold">Allow Public Member Registration</div>
                      <div className="text-text-dim text-xs">Permit new students to submit membership requests online.</div>
                    </div>
                    <Switch
                      checked={settingsStore.userManagement.allowMemberRegistration}
                      onCheckedChange={(v) => settingsStore.updateUserManagement({ allowMemberRegistration: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold">Registration Approval Required</div>
                      <div className="text-text-dim text-xs">New accounts remain pending until approved by Secretary or President.</div>
                    </div>
                    <Switch
                      checked={settingsStore.userManagement.registrationApprovalRequired}
                      onCheckedChange={(v) => settingsStore.updateUserManagement({ registrationApprovalRequired: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold">Automatic Account Lockout</div>
                      <div className="text-text-dim text-xs">Lock accounts after exceeding maximum login attempts.</div>
                    </div>
                    <Switch
                      checked={settingsStore.userManagement.accountAutoLock}
                      onCheckedChange={(v) => settingsStore.updateUserManagement({ accountAutoLock: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold">Disable Inactive Accounts</div>
                      <div className="text-text-dim text-xs">Deactivate accounts with 0% attendance after 60 days.</div>
                    </div>
                    <Switch
                      checked={settingsStore.userManagement.disableInactiveAccounts}
                      onCheckedChange={(v) => settingsStore.updateUserManagement({ disableInactiveAccounts: v })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECTION 4: ROLES & PERMISSIONS MATRIX */}
          <TabsContent value="roles" className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  <ShieldCheck className="text-brand-pink h-5 w-5" /> Comprehensive RBAC Permissions Matrix
                </CardTitle>
                <CardDescription>
                  Configure granular permissions for all 7 administrative and member roles across 14 capability rules.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.01]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.04]">
                        <th className="p-3 font-bold text-foreground">Capability</th>
                        {settingsStore.rolesPermissions.roles.map((r) => (
                          <th key={r} className="p-3 text-center font-bold text-foreground">{r}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {settingsStore.rolesPermissions.permissionsList.map((perm) => (
                        <tr key={perm} className="hover:bg-white/[0.02]">
                          <td className="p-3 font-semibold text-foreground">{perm}</td>
                          {settingsStore.rolesPermissions.roles.map((role) => {
                            const isAllowed = !!settingsStore.rolesPermissions.matrix[role]?.[perm];
                            const isSuperAdmin = role === "Super Admin";
                            return (
                              <td key={role} className="p-3 text-center">
                                {isSuperAdmin ? (
                                  <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-[10px]">Active</Badge>
                                ) : (
                                  <Switch
                                    checked={isAllowed}
                                    onCheckedChange={() => {
                                      settingsStore.togglePermission(role, perm);
                                      toast.info(`Updated ${perm} for ${role}`);
                                    }}
                                  />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECTION 5: AUTHENTICATION SETTINGS */}
          <TabsContent value="auth" className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  <Lock className="text-brand-pink h-5 w-5" /> Authentication Methods & Password Policy
                </CardTitle>
                <CardDescription>
                  Configure active sign-in methods, session duration, and password strength requirements.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-heading text-sm font-bold">Supported Authentication Methods</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                      <div>
                        <div className="text-sm font-semibold">Email & Password Login</div>
                        <div className="text-text-dim text-xs">Standard credential sign in</div>
                      </div>
                      <Switch
                        checked={settingsStore.authSettings.methods.emailLogin}
                        onCheckedChange={(v) => settingsStore.updateAuthMethods({ emailLogin: v })}
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                      <div>
                        <div className="text-sm font-semibold">Google OAuth SSO</div>
                        <div className="text-text-dim text-xs">Sign in with Atria Google accounts</div>
                      </div>
                      <Switch
                        checked={settingsStore.authSettings.methods.googleLogin}
                        onCheckedChange={(v) => settingsStore.updateAuthMethods({ googleLogin: v })}
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                      <div>
                        <div className="text-sm font-semibold">OTP Mobile Login</div>
                        <div className="text-text-dim text-xs">One-Time Password via SMS</div>
                      </div>
                      <Switch
                        checked={settingsStore.authSettings.methods.otpLogin}
                        onCheckedChange={(v) => settingsStore.updateAuthMethods({ otpLogin: v })}
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                      <div>
                        <div className="text-sm font-semibold">Two-Factor Auth (2FA)</div>
                        <div className="text-text-dim text-xs">Require authenticator app for Admins</div>
                      </div>
                      <Switch
                        checked={settingsStore.authSettings.methods.twoFactorAuth}
                        onCheckedChange={(v) => settingsStore.updateAuthMethods({ twoFactorAuth: v })}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-4">
                  <h3 className="font-heading text-sm font-bold">Session & Password Policy Configuration</h3>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settingsStore.authSettings.session.sessionTimeoutMins}
                        onChange={(e) => settingsStore.updateAuthSession({ sessionTimeoutMins: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="refreshDays">Refresh Token Expiry (days)</Label>
                      <Input
                        id="refreshDays"
                        type="number"
                        value={settingsStore.authSettings.session.refreshTokenExpiryDays}
                        onChange={(e) => settingsStore.updateAuthSession({ refreshTokenExpiryDays: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minPwLen">Minimum Password Length</Label>
                      <Input
                        id="minPwLen"
                        type="number"
                        min="6"
                        max="32"
                        value={settingsStore.authSettings.passwordPolicy.minLength}
                        onChange={(e) => settingsStore.updatePasswordPolicy({ minLength: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-xs font-semibold">Uppercase Required</span>
                      <Switch
                        checked={settingsStore.authSettings.passwordPolicy.uppercaseRequired}
                        onCheckedChange={(v) => settingsStore.updatePasswordPolicy({ uppercaseRequired: v })}
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-xs font-semibold">Numbers Required</span>
                      <Switch
                        checked={settingsStore.authSettings.passwordPolicy.numberRequired}
                        onCheckedChange={(v) => settingsStore.updatePasswordPolicy({ numberRequired: v })}
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-xs font-semibold">Special Symbol Required</span>
                      <Switch
                        checked={settingsStore.authSettings.passwordPolicy.specialCharRequired}
                        onCheckedChange={(v) => settingsStore.updatePasswordPolicy({ specialCharRequired: v })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECTION 6: ATTENDANCE SETTINGS */}
          <TabsContent value="attendance" className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  <Clock className="text-brand-pink h-5 w-5" /> Attendance Controls & Window Timing
                </CardTitle>
                <CardDescription>
                  Configure check-in windows, lock times, and manual verification rules.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="opensMins">Attendance Window Opens (mins before event)</Label>
                    <Input
                      id="opensMins"
                      type="number"
                      value={settingsStore.attendanceSettings.window.opensMinsBefore}
                      onChange={(e) => settingsStore.updateAttendanceWindow({ opensMinsBefore: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closesMins">Attendance Window Closes (mins after start)</Label>
                    <Input
                      id="closesMins"
                      type="number"
                      value={settingsStore.attendanceSettings.window.closesMinsAfter}
                      onChange={(e) => settingsStore.updateAttendanceWindow({ closesMinsAfter: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div>
                      <div className="text-sm font-semibold">Enable Manual Admin Attendance</div>
                      <div className="text-text-dim text-xs">Allow admins to verify members by name in the attendance panel.</div>
                    </div>
                    <Switch
                      checked={settingsStore.attendanceSettings.options.enableManualAttendance}
                      onCheckedChange={(v) => settingsStore.updateAttendanceOptions({ enableManualAttendance: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div>
                      <div className="text-sm font-semibold">Allow Late Check-in</div>
                      <div className="text-text-dim text-xs">Mark attendance as &lsquo;Late&rsquo; if checked in after start time.</div>
                    </div>
                    <Switch
                      checked={settingsStore.attendanceSettings.options.allowLateCheckin}
                      onCheckedChange={(v) => settingsStore.updateAttendanceOptions({ allowLateCheckin: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div>
                      <div className="text-sm font-semibold">Lock Attendance Log After Event</div>
                      <div className="text-text-dim text-xs">Prevent modifications once an event has officially concluded.</div>
                    </div>
                    <Switch
                      checked={settingsStore.attendanceSettings.options.attendanceLockAfterEvent}
                      onCheckedChange={(v) => settingsStore.updateAttendanceOptions({ attendanceLockAfterEvent: v })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECTION 7: EVENT SETTINGS */}
          <TabsContent value="events" className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  <Calendar className="text-brand-pink h-5 w-5" /> Event Defaults & Categories
                </CardTitle>
                <CardDescription>
                  Configure venue defaults, capacity limits, approval requirements, and category tags.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="defaultDuration">Default Event Duration (Hours)</Label>
                    <Input
                      id="defaultDuration"
                      type="number"
                      value={settingsStore.eventSettings.defaultDurationHours}
                      onChange={(e) => settingsStore.updateEventSettings({ defaultDurationHours: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Maximum Participants Limit</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={settingsStore.eventSettings.maxParticipants}
                      onChange={(e) => settingsStore.updateEventSettings({ maxParticipants: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPerDay">Maximum Events Per Day</Label>
                    <Input
                      id="maxPerDay"
                      type="number"
                      value={settingsStore.eventSettings.maxEventsPerDay}
                      onChange={(e) => settingsStore.updateEventSettings({ maxEventsPerDay: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultVenue">Default Event Venue</Label>
                  <Input
                    id="defaultVenue"
                    value={settingsStore.eventSettings.defaultVenue}
                    onChange={(e) => settingsStore.updateEventSettings({ defaultVenue: e.target.value })}
                  />
                </div>

                <Separator className="bg-white/10" />

                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                  <div>
                    <div className="text-sm font-semibold">Event Creation Approval Required</div>
                    <div className="text-text-dim text-xs">Events created by coordinators must be approved by President/Secretary before publishing.</div>
                  </div>
                  <Switch
                    checked={settingsStore.eventSettings.approvalRequired}
                    onCheckedChange={(v) => settingsStore.updateEventSettings({ approvalRequired: v })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Active Event Categories</Label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {settingsStore.eventSettings.categories.map((cat) => (
                      <Badge key={cat} className="bg-brand/20 text-brand-pink border-brand/30 px-3 py-1 text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECTION 8: NOTIFICATION SETTINGS */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  <Bell className="text-brand-pink h-5 w-5" /> Notification & Alert Dispatch Controls
                </CardTitle>
                <CardDescription>
                  Configure system alerts, attendance warnings, and reminder channels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div>
                      <div className="text-sm font-semibold">Email Notifications</div>
                      <div className="text-text-dim text-xs">Send event invites and summaries via email</div>
                    </div>
                    <Switch
                      checked={settingsStore.notificationSettings.emailNotifications}
                      onCheckedChange={(v) => settingsStore.updateNotificationSettings({ emailNotifications: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div>
                      <div className="text-sm font-semibold">Push Notifications</div>
                      <div className="text-text-dim text-xs">In-app banners and mobile push alerts</div>
                    </div>
                    <Switch
                      checked={settingsStore.notificationSettings.pushNotifications}
                      onCheckedChange={(v) => settingsStore.updateNotificationSettings({ pushNotifications: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div>
                      <div className="text-sm font-semibold">Event Reminders</div>
                      <div className="text-text-dim text-xs">Notify members 2 hours prior to scheduled events</div>
                    </div>
                    <Switch
                      checked={settingsStore.notificationSettings.eventReminder}
                      onCheckedChange={(v) => settingsStore.updateNotificationSettings({ eventReminder: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <div>
                      <div className="text-sm font-semibold">Low Attendance Threshold Alert</div>
                      <div className="text-text-dim text-xs">Warn when a member drops below required attendance %</div>
                    </div>
                    <Switch
                      checked={settingsStore.notificationSettings.lowAttendanceAlert}
                      onCheckedChange={(v) => settingsStore.updateNotificationSettings({ lowAttendanceAlert: v })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECTION 9: SIGN IN PAGE DESIGN CUSTOMIZATION */}
          <TabsContent value="signin" className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg font-bold">
                      <Layout className="text-brand-pink h-5 w-5" /> Sign In Page Design Customization
                    </CardTitle>
                    <CardDescription>
                      Customize the branding, headings, tagline, background theme, and portal defaults of the login screen.
                    </CardDescription>
                  </div>
                  {!isAdminOrPresident && (
                    <Badge variant="destructive" className="gap-1">
                      <ShieldAlert className="h-3.5 w-3.5" /> Restricted Access
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isAdminOrPresident ? (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-xs text-amber-200">
                    Sign In Page design customization requires Super Admin or President credentials.
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="loginTitle">Sign In Form Heading Title</Label>
                        <Input
                          id="loginTitle"
                          value={settingsStore.loginPageDesign.loginTitle}
                          onChange={(e) => settingsStore.updateLoginPageDesign({ loginTitle: e.target.value })}
                          placeholder="SIGN IN"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loginButtonLabel">Action Button Label</Label>
                        <Input
                          id="loginButtonLabel"
                          value={settingsStore.loginPageDesign.loginButtonLabel}
                          onChange={(e) => settingsStore.updateLoginPageDesign({ loginButtonLabel: e.target.value })}
                          placeholder="Sign In"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loginSubheading">Rotaract Banner Tagline / Motto</Label>
                      <Input
                        id="loginSubheading"
                        value={settingsStore.loginPageDesign.loginSubheading}
                        onChange={(e) => settingsStore.updateLoginPageDesign({ loginSubheading: e.target.value })}
                        placeholder="CREATE LASTING IMPACT"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="bgTheme">Background Visual Style</Label>
                        <Select
                          value={settingsStore.loginPageDesign.loginBackgroundStyle}
                          onValueChange={(v: any) => settingsStore.updateLoginPageDesign({ loginBackgroundStyle: v })}
                        >
                          <SelectTrigger id="bgTheme"><SelectValue placeholder="Select style" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Rotaract Glow">Rotaract Radial Glow (Default)</SelectItem>
                            <SelectItem value="Deep Midnight">Deep Midnight Obsidian</SelectItem>
                            <SelectItem value="Royal Gold Accent">Royal Gold & Cranberry</SelectItem>
                            <SelectItem value="Glassmorphism Dark">Glassmorphism Dark Studio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="defaultPortal">Default Portal Selection</Label>
                        <Select
                          value={settingsStore.loginPageDesign.defaultPortalTab}
                          onValueChange={(v: any) => settingsStore.updateLoginPageDesign({ defaultPortalTab: v })}
                        >
                          <SelectTrigger id="defaultPortal"><SelectValue placeholder="Select portal" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin Portal</SelectItem>
                            <SelectItem value="member">Member Portal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="noticeText">Custom Login Footer Notice / Helper Text</Label>
                      <Input
                        id="noticeText"
                        value={settingsStore.loginPageDesign.loginNoticeText}
                        onChange={(e) => settingsStore.updateLoginPageDesign({ loginNoticeText: e.target.value })}
                        placeholder="Super Admin: presidentnigesh@racatria.org / 12345678"
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                      <div>
                        <div className="text-sm font-semibold">Show Admin / Member Portal Tabs</div>
                        <div className="text-text-dim text-xs">Allow users to switch between Admin and Member portals on login.</div>
                      </div>
                      <Switch
                        checked={settingsStore.loginPageDesign.showPortalTabs}
                        onCheckedChange={(v) => settingsStore.updateLoginPageDesign({ showPortalTabs: v })}
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button
                        onClick={() => toast.success("Sign In Page Design Saved", { description: "Your custom sign-in design is now live!" })}
                        className="brand-gradient gap-2 px-6 font-bold text-white shadow-lg"
                      >
                        <Save className="h-4 w-4" /> Save Sign In Design
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
