import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useAdminUsers, useUpdateUserRole, useBanUser, useShadowBanUser, useMuteUser } from "@/hooks/useAdminApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Shield, Ban, Search, Users, Eye, EyeOff, VolumeX, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function AdminUsers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [banModal, setBanModal] = useState<any>(null);
  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState<string>("");

  const { data, isLoading } = useAdminUsers({ page, limit: 20, search, role: roleFilter, status: statusFilter });
  const updateRole = useUpdateUserRole();
  const banUser = useBanUser();
  const shadowBan = useShadowBanUser();
  const muteUser = useMuteUser();

  const handleRoleChange = (username: string, role: string) => {
    updateRole.mutate({ username, role }, {
      onSuccess: () => toast.success("Role updated"),
      onError: (e) => toast.error(e.message),
    });
  };

  const handleBan = () => {
    if (!banModal) return;
    banUser.mutate({
      username: banModal.username,
      banned: !banModal.isBanned,
      reason: banReason,
      duration: banDuration ? parseInt(banDuration) : undefined,
    }, {
      onSuccess: () => { toast.success(banModal.isBanned ? "User unbanned" : "User banned"); setBanModal(null); setBanReason(""); setBanDuration(""); },
      onError: (e) => toast.error(e.message),
    });
  };

  const handleShadowBan = (username: string, current: boolean) => {
    shadowBan.mutate({ username, shadowBanned: !current }, {
      onSuccess: () => toast.success(current ? "Shadow ban removed" : "Shadow banned"),
      onError: (e) => toast.error(e.message),
    });
  };

  const handleMute = (username: string, hours: number | null) => {
    muteUser.mutate({ username, duration: hours }, {
      onSuccess: () => toast.success(hours ? `Muted for ${hours}h` : "Unmuted"),
      onError: (e) => toast.error(e.message),
    });
  };

  const exportCSV = () => {
    if (!data?.data) return;
    const csv = ["Username,Email,Role,Karma,Status,Joined"]
      .concat(data.data.map((u: any) => `${u.username},${u.email},${u.role},${u.karma},${u.isBanned ? "Banned" : "Active"},${u.createdAt}`))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "users.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> User Management
            {data?.total != null && <Badge variant="secondary" className="ml-2 font-normal">{data.total}</Badge>}
          </h1>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={exportCSV}>
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-9 h-9" value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <Select value={roleFilter} onValueChange={v => { setRoleFilter(v === "all" ? "" : v); setPage(1); }}>
            <SelectTrigger className="w-32 h-9"><SelectValue placeholder="All Roles" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="super_admin">Super Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v === "all" ? "" : v); setPage(1); }}>
            <SelectTrigger className="w-32 h-9"><SelectValue placeholder="All Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">User</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Role</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Karma</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs hidden sm:table-cell">Joined</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Status</th>
                  <th className="text-right p-3 font-medium text-muted-foreground text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="p-3"><Skeleton className="h-8 w-40" /></td>
                    <td className="p-3"><Skeleton className="h-8 w-24" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-16" /></td>
                    <td className="p-3 hidden sm:table-cell"><Skeleton className="h-6 w-20" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-16" /></td>
                    <td className="p-3"><Skeleton className="h-8 w-28 ml-auto" /></td>
                  </tr>
                )) : data?.data?.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No users found</td></tr>
                ) : data?.data?.map((user: any) => (
                  <tr key={user.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-7 h-7">
                          <AvatarImage src={user.avatarUrl ?? undefined} />
                          <AvatarFallback className="text-xs">{user.username?.[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-xs">{user.username}</p>
                          <p className="text-[10px] text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Select defaultValue={user.role} onValueChange={v => handleRoleChange(user.username, v)}>
                        <SelectTrigger className="w-28 h-7 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="super_admin">Super Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">{user.karma?.toLocaleString()}</td>
                    <td className="p-3 text-muted-foreground text-[11px] hidden sm:table-cell">
                      {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col gap-0.5">
                        <Badge variant={user.isBanned ? "destructive" : "secondary"} className="text-[10px] w-fit">
                          {user.isBanned ? "Banned" : "Active"}
                        </Badge>
                        {user.isShadowBanned && <Badge variant="outline" className="text-[10px] w-fit">Shadow</Badge>}
                        {user.mutedUntil && new Date(user.mutedUntil) > new Date() && (
                          <Badge variant="outline" className="text-[10px] w-fit text-amber-500">Muted</Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 justify-end">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0"
                          title={user.isShadowBanned ? "Remove shadow ban" : "Shadow ban"}
                          onClick={() => handleShadowBan(user.username, user.isShadowBanned)}>
                          {user.isShadowBanned ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0"
                          title="Mute 24h"
                          onClick={() => handleMute(user.username, user.mutedUntil ? null : 24)}>
                          <VolumeX className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="outline"
                          className={`h-7 text-[11px] gap-1 ${user.isBanned ? "" : "text-destructive hover:text-destructive"}`}
                          onClick={() => user.isBanned ? banUser.mutate({ username: user.username, banned: false }, { onSuccess: () => toast.success("Unbanned") }) : setBanModal(user)}>
                          <Ban className="w-3 h-3" /> {user.isBanned ? "Unban" : "Ban"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Page {page} {data?.total != null && `· ${data.total} total`}
            </span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <Button variant="outline" size="sm" disabled={!data?.hasMore} onClick={() => setPage(p => p + 1)}>
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Ban Dialog */}
        <Dialog open={!!banModal} onOpenChange={() => { setBanModal(null); setBanReason(""); setBanDuration(""); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ban User: {banModal?.username}</DialogTitle>
              <DialogDescription>Choose ban type and reason</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Input placeholder="Reason for ban..." value={banReason} onChange={e => setBanReason(e.target.value)} />
              <Select value={banDuration} onValueChange={setBanDuration}>
                <SelectTrigger><SelectValue placeholder="Permanent Ban" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Permanent</SelectItem>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="168">7 days</SelectItem>
                  <SelectItem value="720">30 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="destructive" onClick={handleBan} disabled={banUser.isPending}>
                {banUser.isPending ? "Banning..." : "Confirm Ban"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
