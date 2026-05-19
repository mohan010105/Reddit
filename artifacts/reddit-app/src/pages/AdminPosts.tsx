import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useAdminPosts, useModeratePost, useBulkModeratePosts } from "@/hooks/useAdminApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { FileText, Search, ChevronLeft, ChevronRight, Star, Pin, Trash2, RotateCcw, CheckCircle, XCircle, Download } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function AdminPosts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const { data, isLoading } = useAdminPosts({ page, limit: 20, search, status: statusFilter });
  const moderate = useModeratePost();
  const bulkModerate = useBulkModeratePosts();

  const handleModerate = (id: number, action: string) => {
    moderate.mutate({ id, action }, {
      onSuccess: () => toast.success(`Post ${action}d`),
      onError: (e) => toast.error(e.message),
    });
  };

  const handleBulk = (action: string) => {
    if (selected.length === 0) return;
    bulkModerate.mutate({ ids: selected, action }, {
      onSuccess: () => { toast.success(`${selected.length} posts ${action}d`); setSelected([]); },
      onError: (e) => toast.error(e.message),
    });
  };

  const toggleSelect = (id: number) => {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  const toggleAll = () => {
    if (!data?.data) return;
    setSelected(s => s.length === data.data.length ? [] : data.data.map((p: any) => p.id));
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Post Management
            {data?.total != null && <Badge variant="secondary" className="ml-2 font-normal">{data.total}</Badge>}
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search posts..." className="pl-9 h-9" value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v === "all" ? "" : v); setPage(1); }}>
            <SelectTrigger className="w-32 h-9"><SelectValue placeholder="All Posts" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Posts</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="pinned">Pinned</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        {selected.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <span className="text-sm font-medium">{selected.length} selected</span>
            <div className="flex gap-1 ml-auto">
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => handleBulk("approve")}>
                <CheckCircle className="w-3 h-3" /> Approve
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => handleBulk("delete")}>
                <Trash2 className="w-3 h-3" /> Delete
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => handleBulk("restore")}>
                <RotateCcw className="w-3 h-3" /> Restore
              </Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setSelected([])}>Clear</Button>
            </div>
          </motion.div>
        )}

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="p-3 w-8">
                    <Checkbox checked={data?.data?.length > 0 && selected.length === data?.data?.length}
                      onCheckedChange={toggleAll} />
                  </th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Post</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs hidden md:table-cell">Author</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs hidden md:table-cell">Community</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Score</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Status</th>
                  <th className="text-right p-3 font-medium text-muted-foreground text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="p-3"><Skeleton className="h-4 w-4" /></td>
                    <td className="p-3"><Skeleton className="h-8 w-48" /></td>
                    <td className="p-3 hidden md:table-cell"><Skeleton className="h-6 w-20" /></td>
                    <td className="p-3 hidden md:table-cell"><Skeleton className="h-6 w-20" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-12" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-16" /></td>
                    <td className="p-3"><Skeleton className="h-8 w-32 ml-auto" /></td>
                  </tr>
                )) : data?.data?.length === 0 ? (
                  <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No posts found</td></tr>
                ) : data?.data?.map((post: any) => (
                  <tr key={post.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="p-3">
                      <Checkbox checked={selected.includes(post.id)} onCheckedChange={() => toggleSelect(post.id)} />
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-xs line-clamp-1">{post.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">{post.author?.username}</td>
                    <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">r/{post.community?.slug}</td>
                    <td className="p-3 text-xs font-medium">{post.score}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-0.5">
                        {post.isDeleted && <Badge variant="destructive" className="text-[10px]">Deleted</Badge>}
                        {post.isFeatured && <Badge className="text-[10px] bg-amber-500/20 text-amber-600">Featured</Badge>}
                        {post.isPinned && <Badge className="text-[10px] bg-blue-500/20 text-blue-600">Pinned</Badge>}
                        {post.moderationStatus === "flagged" && <Badge variant="destructive" className="text-[10px]">Flagged</Badge>}
                        {!post.isDeleted && !post.isFeatured && !post.isPinned && post.moderationStatus !== "flagged" && (
                          <Badge variant="secondary" className="text-[10px]">Active</Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 justify-end">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Feature"
                          onClick={() => handleModerate(post.id, post.isFeatured ? "unfeature" : "feature")}>
                          <Star className={`w-3.5 h-3.5 ${post.isFeatured ? "fill-amber-500 text-amber-500" : ""}`} />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Pin"
                          onClick={() => handleModerate(post.id, post.isPinned ? "unpin" : "pin")}>
                          <Pin className={`w-3.5 h-3.5 ${post.isPinned ? "fill-blue-500 text-blue-500" : ""}`} />
                        </Button>
                        {post.isDeleted ? (
                          <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1"
                            onClick={() => handleModerate(post.id, "restore")}>
                            <RotateCcw className="w-3 h-3" /> Restore
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1 text-destructive"
                            onClick={() => handleModerate(post.id, "delete")}>
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
