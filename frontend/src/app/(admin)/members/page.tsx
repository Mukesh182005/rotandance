"use client";

import * as React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, Plus, UserPlus } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/lib/store/auth-store";
import { useAppStore } from "@/lib/store/app-store";
import type { Member } from "@/lib/data";
import { cn } from "@/lib/utils";

const DEPARTMENTS = ["CSE", "ISE", "ECE", "MECH", "AIML", "MBA"];

const schema = z.object({
  name: z.string().min(2, "Enter a name"),
  department: z.string().min(1, "Pick a department"),
  year: z.string().min(1, "e.g. 1st"),
  role: z.string().min(1, "e.g. Member"),
});
type FormValues = z.infer<typeof schema>;

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function MembersPage() {
  const session = useAuthStore((s) => s.session)!;
  const members = useAppStore((s) => s.members);
  const addMember = useAppStore((s) => s.addMember);

  const [search, setSearch] = React.useState("");
  const [dept, setDept] = React.useState("All Depts");
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "attendance", desc: true },
  ]);
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { department: "CSE", year: "1st", role: "Member" },
  });

  const total = members.length;
  const active = members.filter((m) => m.status === "Active").length;
  const volunteers = members.filter((m) => m.role !== "Member").length;

  const data = React.useMemo(
    () =>
      members.filter((m) => {
        if (dept !== "All Depts" && m.department !== dept) return false;
        if (
          search &&
          !m.name.toLowerCase().includes(search.toLowerCase()) &&
          !m.memberId.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        return true;
      }),
    [members, dept, search],
  );

  const columns = React.useMemo<ColumnDef<Member>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Member",
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="brand-gradient font-heading text-[11px] font-bold text-white">
                {row.original.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-[13.5px] font-semibold">{row.original.name}</div>
              <div className="text-text-faint text-[11px]">{row.original.memberId}</div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "department",
        header: "Dept",
        cell: ({ getValue }) => (
          <span className="text-text-muted">{getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "year",
        header: "Year",
        cell: ({ getValue }) => (
          <span className="text-text-muted">{getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue }) => (
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-semibold",
              getValue<string>() === "Member"
                ? "text-text-muted border-white/12 bg-white/5"
                : "border-brand/40 bg-brand/18 text-brand-pink-2",
            )}
          >
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "attendance",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Attendance <ArrowUpDown className="h-3 w-3" />
          </button>
        ),
        cell: ({ getValue }) => {
          const v = getValue<number>();
          return (
            <div className="flex items-center gap-2.5">
              <Progress
                value={v}
                className="[&_[data-slot=progress-indicator]]:from-brand-hover [&_[data-slot=progress-indicator]]:to-brand h-[5px] w-24 [&_[data-slot=progress-indicator]]:bg-gradient-to-r"
              />
              <span className="w-9 text-[12px] font-semibold">{v}%</span>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: () => <span className="block text-right">Status</span>,
        cell: ({ getValue }) => (
          <div className="text-right">
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-[10.5px] font-semibold",
                getValue<string>() === "Active"
                  ? "border-brand/30 bg-brand/16 text-brand-pink"
                  : "text-text-dim border-white/10 bg-white/4",
              )}
            >
              {getValue<string>()}
            </span>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const onSubmit = handleSubmit((values) => {
    addMember({
      memberId: `RCA-${Math.floor(100 + Math.random() * 800)}`,
      name: values.name,
      initials: initialsOf(values.name),
      department: values.department,
      year: values.year,
      role: values.role,
      attendance: 0,
      status: "Active",
    });
    toast.success("Member added", { description: values.name });
    reset({ name: "", department: "CSE", year: "1st", role: "Member" });
    setOpen(false);
  });

  return (
    <>
      <Topbar title="Members" searchPlaceholder="Search by name or ID…" session={session}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="brand-gradient gap-2 rounded-full text-white">
              <Plus className="h-4 w-4" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a member</DialogTitle>
              <DialogDescription>
                They&apos;ll show up in the directory instantly.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Meera Iyer" {...register("name")} />
                {errors.name ? (
                  <p className="text-destructive text-xs">{errors.name.message}</p>
                ) : null}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label>Dept</Label>
                  <Select
                    defaultValue="CSE"
                    onValueChange={(v) => setValue("department", v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" placeholder="1st" {...register("year")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Member" {...register("role")} />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="brand-gradient w-full gap-2 text-white"
                >
                  <UserPlus className="h-4 w-4" />{" "}
                  {isSubmitting ? "Adding…" : "Add Member"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Topbar>

      <div className="flex-1 space-y-5 px-5 py-6 lg:px-7">
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          <MiniStat label="Total Members" value={total} />
          <MiniStat label="Active" value={active} highlight />
          <MiniStat label="Volunteers" value={volunteers} />
          <MiniStat label="New this month" value="+6" highlight />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {["All Depts", ...DEPARTMENTS].map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold",
                dept === d
                  ? "brand-gradient text-white"
                  : "text-text-muted border bg-white/[0.03]",
              )}
            >
              {d}
            </button>
          ))}
          <div className="flex-1" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="h-9 w-48"
          />
        </div>

        <div className="glass-card overflow-hidden p-0">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="text-[10.5px] tracking-wide uppercase">
                  {hg.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-text-dim py-10 text-center"
                  >
                    No members match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

function MiniStat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={cn("glass-card p-4", highlight && "border-brand/28")}>
      <div className={cn("text-xs", highlight ? "text-brand-pink" : "text-text-dim")}>
        {label}
      </div>
      <div
        className={cn(
          "font-heading mt-1 text-[26px] font-bold",
          highlight && "text-brand-pink",
        )}
      >
        {value}
      </div>
    </div>
  );
}
