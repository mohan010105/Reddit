import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useAdminLogs } from "@/hooks/useAdminApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { ScrollText, ChevronLeft, ChevronRight, Download, Shield, User, FileText, MessageSquare, Globe, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ACTION_ICONS: Record<string, any> = {
  ban_user: User, unban_user: User, mute_user: User, unmute_user: User,
  shadow_ban: User, unshadow_ban: User, change_role: Shield,
  delete_post: FileText, approve_post: FileText, reject_post: FileText,
  feature_post: FileText, pin_post: FileText, archive_post: FileText, restore_post: FileText,
  delete_comment: MessageSquare,
  delete_community: Globe, approve_community: Globe,
  resolve_report: Flag, dismiss_report: Flag,
  bulk_action: FileText, update_settings: Shield,
};

const ACTION_COLORS: Record<string, string> = {
  ban_user: "text-destructive", unban_user: "text-green-500",
  delete_post: "text-destructive", delete_comment: "text-destructive", delete_community: "text-destructive",
  approve_post: "text-green-500", feature_post: "text-amber-500", pin_post: "text-blue-500",
  resolve_report: "text-green-500", dismiss_report: "text-muted-foreground",
  change_role: "text-purple-500", update_settings: "text-cyan-500",
  restore_post: "text-green-500", bulk_action: "text-amber-500",
};

export default function AdminLogs() {
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState("");
  const [targetFilter, setTargetFilter] = useState("");

  const { data, isLoading } = useAdminLogs({ page, limit: 50, action: actionFilter, targetType: targetFilter });

  const exportCSV = () => {
    if (!data?.data) return;
    const csv = ["ID,Action,Admin,Target Type,Target ID,Date"]
      .concat(data.data.map((l: any) => `${l.id},${l.action},${l.admin?.username || ""},${l.targetType || ""},${l.targetId || ""},${l.createdAt}`))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "admin_logs.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-primary" /> Activity Logs
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Admin action audit trail</p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={exportCSV}>
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <Select value={actionFilter} onValueChange={v => { setActionFilter(v === "all" ? "" : v); setPage(1); }}>
            <SelectTrigger className="w-40 h-9"><SelectValue placeholder="All Actions" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="ban_user">Ban User</SelectItem>
              <SelectItem value="unban_user">Unban User</SelectItem>
              <SelectItem value="change_role">Change Role</SelectItem>
              <SelectItem value="delete_post">Delete Post</SelectItem>
              <SelectItem value="approve_post">Approve Post</SelectItem>
              <SelectItem value="feature_post">Feature Post</SelectItem>
              <SelectItem value="resolve_report">Resolve Report</SelectItem>
              <SelectItem value="dismiss_report">Dismiss Report</SelectItem>
              <SelectItem value="update_settings">Update Settings</SelectItem>
              <SelectItem value="bulk_action">Bulk Action</SelectItem>
            </SelectContent>
          </Select>
          <Select value={targetFilter} onValueChange={v => { setTargetFilter(v === "all" ? "" : v); setPage(1); }}>
            <SelectTrigger className="w-32 h-9"><SelectValue placeholder="All Targets" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Targets</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="post">Post</SelectItem>
              <SelectItem value="comment">Comment</SelectItem>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="report">Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Logs Timeline */}
        <div className="space-y-2">
          {isLoading ? Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          )) : data?.data?.length === 0 ? (
            <div className="bg-card border border-card-border rounded-xl p-8 text-center text-muted-foreground">
              No logs found
            </div>
          ) : data?.data?.map((log: any) => {
            const Icon = ACTION_ICONS[log.action] || Shield;
            const color = ACTION_COLORS[log.action] || "text-muted-foreground";
            return (
              <motion.div key={log.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-card-border rounded-xl p-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-muted/50 shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-[10px] capitalize">{log.action?.replace(/_/g, " ")}</Badge>
                    {log.targetType && (
                      <span className="text-[10px] text-muted-foreground">
                        {log.targetType} {log.targetId ? `#${log.targetId}` : ""}
                      </span>
                    )}
                  </div>
                  {log.details && typeof log.details === "object" && (
                    <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                      {Object.entries(log.details).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium">{log.admin?.username}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Page {page}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" disabled={!data?.hasMore} onClick={() => setPage(p => p + 1)}>
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
