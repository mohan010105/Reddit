import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useAdminReports, useResolveReport } from "@/hooks/useAdminApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Flag, ChevronLeft, ChevronRight, CheckCircle, XCircle, Trash2, Ban, Eye } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function AdminReports() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [reviewModal, setReviewModal] = useState<any>(null);
  const [resolutionNote, setResolutionNote] = useState("");
  const [contentAction, setContentAction] = useState("");

  const { data, isLoading } = useAdminReports({ page, limit: 20, status: statusFilter });
  const resolveReport = useResolveReport();

  const handleResolve = (status: string) => {
    if (!reviewModal) return;
    resolveReport.mutate({
      id: reviewModal.id,
      status,
      note: resolutionNote,
      action: contentAction,
    }, {
      onSuccess: () => { toast.success(`Report ${status}`); setReviewModal(null); setResolutionNote(""); setContentAction(""); },
      onError: (e) => toast.error(e.message),
    });
  };

  const getReportTarget = (report: any) => {
    if (report.post) return { type: "Post", title: report.post.title?.slice(0, 50) };
    if (report.comment) return { type: "Comment", title: report.comment.content?.slice(0, 50) };
    return { type: "User", title: "User report" };
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Flag className="w-5 h-5 text-primary" /> Reports
            {data?.total != null && <Badge variant="secondary" className="ml-2 font-normal">{data.total}</Badge>}
          </h1>
          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="dismissed">Dismissed</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {isLoading ? Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          )) : data?.data?.length === 0 ? (
            <div className="bg-card border border-card-border rounded-xl p-8 text-center text-muted-foreground">
              No {statusFilter} reports
            </div>
          ) : data?.data?.map((report: any) => {
            const target = getReportTarget(report);
            return (
              <motion.div key={report.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-card-border rounded-xl p-4 card-hover-glow">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={report.status === "pending" ? "destructive" : report.status === "resolved" ? "secondary" : "outline"}
                        className="text-[10px]">
                        {report.status}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">{target.type}</Badge>
                      {report.reasonCategory && (
                        <Badge variant="outline" className="text-[10px]">{report.reasonCategory}</Badge>
                      )}
                      <span className="text-[10px] text-muted-foreground">
                        #{report.id} · {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <h3 className="font-medium text-sm mt-2">{report.reason}</h3>
                    {report.details && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{report.details}</p>}
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                      <span>Reported by: <strong>{report.reporter?.username}</strong></span>
                      <span>Target: <strong>{target.title}</strong></span>
                    </div>
                  </div>
                  {report.status === "pending" && (
                    <div className="flex gap-1 shrink-0">
                      <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1"
                        onClick={() => setReviewModal(report)}>
                        <Eye className="w-3 h-3" /> Review
                      </Button>
                    </div>
                  )}
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

        {/* Review Dialog */}
        <Dialog open={!!reviewModal} onOpenChange={() => { setReviewModal(null); setResolutionNote(""); setContentAction(""); }}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Review Report #{reviewModal?.id}</DialogTitle>
              <DialogDescription>{reviewModal?.reason}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              {reviewModal?.details && (
                <div className="p-3 bg-muted/30 rounded-lg text-sm">{reviewModal.details}</div>
              )}
              <Textarea placeholder="Resolution note..." value={resolutionNote}
                onChange={e => setResolutionNote(e.target.value)} rows={3} />
              <Select value={contentAction} onValueChange={setContentAction}>
                <SelectTrigger><SelectValue placeholder="Take action on content (optional)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No action</SelectItem>
                  {reviewModal?.postId && <SelectItem value="delete_post">Delete reported post</SelectItem>}
                  {reviewModal?.commentId && <SelectItem value="delete_comment">Delete reported comment</SelectItem>}
                  {reviewModal?.reportedUserId && <SelectItem value="ban_user">Ban reported user</SelectItem>}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button className="flex-1 gap-1" onClick={() => handleResolve("resolved")} disabled={resolveReport.isPending}>
                  <CheckCircle className="w-3.5 h-3.5" /> Resolve
                </Button>
                <Button variant="outline" className="flex-1 gap-1" onClick={() => handleResolve("dismissed")} disabled={resolveReport.isPending}>
                  <XCircle className="w-3.5 h-3.5" /> Dismiss
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
