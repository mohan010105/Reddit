import { useState } from "react";
import { useListReports, useResolveReport, getListReportsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, ChevronLeft, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function AdminReports() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"pending" | "resolved" | "dismissed">("pending");
  const { data, isLoading } = useListReports({ page, limit: 20, status });
  const resolveReport = useResolveReport();

  const handleResolve = (id: number, action: "resolved" | "dismissed") => {
    resolveReport.mutate({ id, data: { status: action } }, {
      onSuccess: () => {
        toast.success(action === "resolved" ? "Report resolved" : "Report dismissed");
        queryClient.invalidateQueries({ queryKey: getListReportsQueryKey() });
      },
      onError: () => toast.error("Action failed"),
    });
  };

  const statusColors = { pending: "secondary", resolved: "default", dismissed: "outline" } as const;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href="/admin"><Button variant="ghost" size="icon"><ChevronLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-xl font-bold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-primary" /> Reports</h1>
        <div className="flex gap-1 ml-auto">
          {(["pending", "resolved", "dismissed"] as const).map(s => (
            <Button key={s} size="sm" variant={status === s ? "default" : "outline"} onClick={() => setStatus(s)} className="capitalize text-xs h-7">
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)
        ) : data?.data.length === 0 ? (
          <div className="bg-card border border-card-border rounded-xl p-12 text-center text-muted-foreground text-sm">
            No {status} reports
          </div>
        ) : data?.data.map(report => (
          <div key={report.id} className="bg-card border border-card-border rounded-xl p-4" data-testid={`card-report-${report.id}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge variant="outline" className="text-xs">{report.reason}</Badge>
                  <Badge variant={statusColors[report.status as keyof typeof statusColors]} className="text-xs capitalize">
                    {report.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    reported by u/{report.reporter?.username} · {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                  </span>
                </div>
                {report.details && <p className="text-sm text-muted-foreground">{report.details}</p>}
                {report.postId && (
                  <Link href={`/post/${report.postId}`}>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs gap-1 mt-1">
                      <ExternalLink className="w-3 h-3" /> View reported post
                    </Button>
                  </Link>
                )}
              </div>
              {report.status === "pending" && (
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm" variant="default" className="h-7 text-xs gap-1"
                    onClick={() => handleResolve(report.id, "resolved")}
                    data-testid={`button-resolve-${report.id}`}
                  >
                    <CheckCircle className="w-3 h-3" /> Resolve
                  </Button>
                  <Button
                    size="sm" variant="outline" className="h-7 text-xs gap-1"
                    onClick={() => handleResolve(report.id, "dismissed")}
                    data-testid={`button-dismiss-${report.id}`}
                  >
                    <XCircle className="w-3 h-3" /> Dismiss
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
