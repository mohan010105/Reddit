import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useAIModerationLogs, useFlaggedContent, useReviewModeration } from "@/hooks/useAdminApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Bot, CheckCircle, XCircle, AlertTriangle, Shield, ChevronLeft, ChevronRight, Zap, Eye } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  const pct = Math.round(score * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted-foreground w-16">{label}</span>
      <Progress value={pct} className="h-1.5 flex-1" />
      <span className={`text-[10px] font-medium w-8 text-right ${pct > 60 ? "text-destructive" : pct > 30 ? "text-amber-500" : "text-green-500"}`}>
        {pct}%
      </span>
    </div>
  );
}

function ModerationCard({ log, onReview }: { log: any; onReview: (id: number, approved: boolean) => void }) {
  const statusColors: Record<string, string> = {
    flagged: "destructive",
    auto_rejected: "destructive",
    auto_approved: "secondary",
    approved: "secondary",
    rejected: "destructive",
    pending: "outline",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-card-border rounded-xl p-4 card-hover-glow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={statusColors[log.status] as any || "outline"} className="text-[10px]">
              {log.status?.replace("_", " ")}
            </Badge>
            <Badge variant="outline" className="text-[10px]">{log.contentType}</Badge>
            <span className="text-[10px] text-muted-foreground">
              #{log.contentId} · {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
            </span>
          </div>

          {/* Scores */}
          <div className="mt-3 space-y-1.5">
            <ScoreBar label="Toxicity" score={log.toxicityScore || 0} color="red" />
            <ScoreBar label="Spam" score={log.spamScore || 0} color="amber" />
            <ScoreBar label="Hate" score={log.hateSpeechScore || 0} color="red" />
            <ScoreBar label="NSFW" score={log.nsfwScore || 0} color="purple" />
          </div>

          <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
            {log.author && <span>Author: <strong>{log.author.username}</strong></span>}
            <span>Overall: <strong className={log.overallScore > 0.5 ? "text-destructive" : "text-green-500"}>
              {Math.round((log.overallScore || 0) * 100)}%
            </strong></span>
            <span>Confidence: <strong>{Math.round((log.confidence || 0) * 100)}%</strong></span>
          </div>

          {log.reason && (
            <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted/30 rounded-md">{log.reason}</p>
          )}

          {log.categories && log.categories.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {log.categories.map((c: string) => (
                <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>
              ))}
            </div>
          )}
        </div>

        {(log.status === "flagged" || log.status === "pending") && (
          <div className="flex flex-col gap-1 shrink-0">
            <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1 text-green-600"
              onClick={() => onReview(log.id, true)}>
              <CheckCircle className="w-3 h-3" /> Approve
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1 text-destructive"
              onClick={() => onReview(log.id, false)}>
              <XCircle className="w-3 h-3" /> Reject
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function AdminModeration() {
  const [tab, setTab] = useState("flagged");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const { data: flagged, isLoading: flaggedLoading } = useFlaggedContent({ page, limit: 20 });
  const { data: logs, isLoading: logsLoading } = useAIModerationLogs({ page, limit: 20, status: statusFilter });
  const reviewModeration = useReviewModeration();

  const handleReview = (id: number, approved: boolean) => {
    reviewModeration.mutate({ id, approved }, {
      onSuccess: () => toast.success(approved ? "Content approved" : "Content rejected"),
      onError: (e) => toast.error(e.message),
    });
  };

  const currentData = tab === "flagged" ? flagged : logs;
  const currentLoading = tab === "flagged" ? flaggedLoading : logsLoading;

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" /> AI Moderation
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Auto-flagged content and moderation pipeline</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Flagged", value: flagged?.total || flagged?.data?.length || 0, icon: AlertTriangle, color: "text-amber-500" },
            { label: "Auto-Rejected", value: "-", icon: XCircle, color: "text-destructive" },
            { label: "Auto-Approved", value: "-", icon: CheckCircle, color: "text-green-500" },
            { label: "Pending Review", value: flagged?.data?.length || 0, icon: Eye, color: "text-blue-500" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card border border-card-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-[11px] text-muted-foreground">{label}</span>
              </div>
              <p className="text-xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <Tabs value={tab} onValueChange={v => { setTab(v); setPage(1); }}>
          <div className="flex items-center gap-3 flex-wrap">
            <TabsList>
              <TabsTrigger value="flagged" className="gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Flagged Queue
              </TabsTrigger>
              <TabsTrigger value="all" className="gap-1">
                <Shield className="w-3.5 h-3.5" /> All Logs
              </TabsTrigger>
            </TabsList>
            {tab === "all" && (
              <Select value={statusFilter} onValueChange={v => { setStatusFilter(v === "all" ? "" : v); setPage(1); }}>
                <SelectTrigger className="w-32 h-8"><SelectValue placeholder="All Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="auto_approved">Auto-Approved</SelectItem>
                  <SelectItem value="auto_rejected">Auto-Rejected</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="mt-4 space-y-3">
            {currentLoading ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            )) : currentData?.data?.length === 0 ? (
              <div className="bg-card border border-card-border rounded-xl p-8 text-center text-muted-foreground">
                <Bot className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>No moderation logs found</p>
              </div>
            ) : currentData?.data?.map((log: any) => (
              <ModerationCard key={log.id} log={log} onReview={handleReview} />
            ))}
          </div>
        </Tabs>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Page {page}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" disabled={!currentData?.hasMore} onClick={() => setPage(p => p + 1)}>
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
