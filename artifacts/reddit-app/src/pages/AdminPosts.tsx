import { useState } from "react";
import { useListAdminPosts, useDeletePost, getListAdminPostsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, ChevronLeft, Trash2, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function AdminPosts() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useListAdminPosts({ page, limit: 20 });
  const deletePost = useDeletePost();

  const handleDelete = (id: number) => {
    deletePost.mutate({ id }, {
      onSuccess: () => {
        toast.success("Post deleted");
        queryClient.invalidateQueries({ queryKey: getListAdminPostsQueryKey() });
      },
      onError: () => toast.error("Failed to delete"),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href="/admin"><Button variant="ghost" size="icon"><ChevronLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-xl font-bold flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Manage Posts</h1>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Post</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Author</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Community</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Score</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Created</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    {Array.from({ length: 6 }).map((_, j) => <td key={j} className="p-3"><Skeleton className="h-6 w-full" /></td>)}
                  </tr>
                ))
              ) : data?.data.map(post => (
                <tr key={post.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors" data-testid={`row-post-${post.id}`}>
                  <td className="p-3 max-w-xs">
                    <p className="font-medium truncate">{post.title}</p>
                    {post.isDeleted && <Badge variant="destructive" className="text-xs mt-0.5">Deleted</Badge>}
                  </td>
                  <td className="p-3 text-muted-foreground">u/{post.author.username}</td>
                  <td className="p-3 text-muted-foreground">r/{post.community.slug}</td>
                  <td className="p-3">{post.score}</td>
                  <td className="p-3 text-muted-foreground text-xs">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</td>
                  <td className="p-3 text-right flex justify-end gap-1">
                    <Link href={`/post/${post.id}`}>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><ExternalLink className="w-3 h-3" /></Button>
                    </Link>
                    <Button
                      size="sm" variant="outline"
                      className="h-7 text-xs gap-1 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(post.id)}
                      data-testid={`button-delete-post-${post.id}`}
                      disabled={post.isDeleted}
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.hasMore && (
          <div className="p-3 border-t border-border flex justify-center">
            <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)}>Load More</Button>
          </div>
        )}
      </div>
    </div>
  );
}
