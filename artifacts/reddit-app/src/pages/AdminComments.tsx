import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useAdminComments, useModerateComment } from "@/hooks/useAdminApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { MessageSquare, Search, ChevronLeft, ChevronRight, Trash2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function AdminComments() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useAdminComments({ page, limit: 20, search });
  const moderate = useModerateComment();

  const handleModerate = (id: number, action: string) => {
    moderate.mutate({ id, action }, {
      onSuccess: () => toast.success(`Comment ${action}d`),
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" /> Comment Management
          {data?.total != null && <Badge variant="secondary" className="ml-2 font-normal">{data.total}</Badge>}
        </h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search comments..." className="pl-9 h-9" value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Comment</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs hidden md:table-cell">Author</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs hidden md:table-cell">Post</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Score</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Status</th>
                  <th className="text-right p-3 font-medium text-muted-foreground text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="p-3"><Skeleton className="h-8 w-48" /></td>
                    <td className="p-3 hidden md:table-cell"><Skeleton className="h-6 w-20" /></td>
                    <td className="p-3 hidden md:table-cell"><Skeleton className="h-6 w-32" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-12" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-16" /></td>
                    <td className="p-3"><Skeleton className="h-8 w-20 ml-auto" /></td>
                  </tr>
                )) : data?.data?.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No comments found</td></tr>
                ) : data?.data?.map((comment: any) => (
                  <tr key={comment.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="p-3 max-w-xs">
                      <p className="text-xs line-clamp-2">{comment.content}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </p>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">{comment.author?.username}</td>
                    <td className="p-3 text-xs text-muted-foreground hidden md:table-cell line-clamp-1">
                      {comment.post?.title?.slice(0, 40)}
                    </td>
                    <td className="p-3 text-xs font-medium">{comment.score}</td>
                    <td className="p-3">
                      <Badge variant={comment.isDeleted ? "destructive" : "secondary"} className="text-[10px]">
                        {comment.isDeleted ? "Deleted" : "Active"}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end">
                        {comment.isDeleted ? (
                          <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1"
                            onClick={() => handleModerate(comment.id, "restore")}>
                            <RotateCcw className="w-3 h-3" /> Restore
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1 text-destructive"
                            onClick={() => handleModerate(comment.id, "delete")}>
                            <Trash2 className="w-3 h-3" /> Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-border flex items-center justify-between">
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
        </motion.div>
      </div>
    </AdminLayout>
  );
}
