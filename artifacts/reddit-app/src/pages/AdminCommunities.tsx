import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useAdminCommunities, useDeleteCommunity } from "@/hooks/useAdminApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Globe, Search, ChevronLeft, ChevronRight, Trash2, Users, FileText } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function AdminCommunities() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState<any>(null);

  const { data, isLoading } = useAdminCommunities({ page, limit: 20, search });
  const deleteCommunity = useDeleteCommunity();

  const handleDelete = () => {
    if (!deleteModal) return;
    deleteCommunity.mutate(deleteModal.id, {
      onSuccess: () => { toast.success("Community deleted"); setDeleteModal(null); },
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" /> Community Management
          {data?.total != null && <Badge variant="secondary" className="ml-2 font-normal">{data.total}</Badge>}
        </h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search communities..." className="pl-9 h-9" value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {isLoading ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          )) : data?.data?.length === 0 ? (
            <div className="col-span-full p-8 text-center text-muted-foreground">No communities found</div>
          ) : data?.data?.map((community: any) => (
            <motion.div key={community.id} whileHover={{ y: -2 }}
              className="bg-card border border-card-border rounded-xl p-4 card-hover-glow">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={community.iconUrl ?? undefined} />
                  <AvatarFallback className="text-sm gradient-primary text-white">
                    {community.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{community.name}</h3>
                  <p className="text-[11px] text-muted-foreground">r/{community.slug}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{community.description || "No description"}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {community.memberCount}</span>
                <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {community.postCount}</span>
                <span>{formatDistanceToNow(new Date(community.createdAt), { addSuffix: true })}</span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-[10px] text-muted-foreground">by {community.creator?.username}</span>
                <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1 text-destructive"
                  onClick={() => setDeleteModal(community)}>
                  <Trash2 className="w-3 h-3" /> Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

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

        <Dialog open={!!deleteModal} onOpenChange={() => setDeleteModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Community: r/{deleteModal?.slug}</DialogTitle>
              <DialogDescription>This action is irreversible. All posts in this community will be orphaned.</DialogDescription>
            </DialogHeader>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteCommunity.isPending}>
              {deleteCommunity.isPending ? "Deleting..." : "Confirm Delete"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
