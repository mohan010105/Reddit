import { Link } from "wouter";
import { ArrowUp, ArrowDown, MessageSquare, Bookmark, BookmarkCheck, Flag, MoreHorizontal, Trash2, Pencil } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import {
  useVotePost, useSavePost, useUnsavePost, useDeletePost,
  getListPostsQueryKey, getGetPostQueryKey, getListSavedPostsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import type { Post } from "@workspace/api-client-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ReportModal } from "@/components/ReportModal";

interface PostCardProps {
  post: Post;
  compact?: boolean;
}

export function PostCard({ post, compact = false }: PostCardProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [myVote, setMyVote] = useState(post.myVote ?? 0);
  const [score, setScore] = useState(post.score);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [reportOpen, setReportOpen] = useState(false);

  const votePost = useVotePost();
  const savePost = useSavePost();
  const unsavePost = useUnsavePost();
  const deletePost = useDeletePost();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: getListPostsQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetPostQueryKey(post.id) });
  };

  const handleVote = (val: 1 | -1 | 0) => {
    if (!session) { toast.error("Log in to vote"); return; }
    const newVote = myVote === val ? 0 : val;
    const scoreDiff = newVote - myVote;
    setMyVote(newVote);
    setScore(s => s + scoreDiff);
    votePost.mutate({ id: post.id, data: { value: newVote as 1 | -1 | 0 } }, {
      onError: () => { setMyVote(myVote); setScore(post.score); toast.error("Vote failed"); },
      onSuccess: invalidate,
    });
  };

  const handleSave = () => {
    if (!session) { toast.error("Log in to save"); return; }
    if (isSaved) {
      setIsSaved(false);
      unsavePost.mutate({ id: post.id }, {
        onError: () => { setIsSaved(true); },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getListSavedPostsQueryKey() }),
      });
    } else {
      setIsSaved(true);
      savePost.mutate({ id: post.id }, {
        onError: () => { setIsSaved(false); },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getListSavedPostsQueryKey() }),
      });
    }
  };

  const handleDelete = () => {
    deletePost.mutate({ id: post.id }, {
      onSuccess: () => { toast.success("Post deleted"); invalidate(); },
      onError: () => toast.error("Failed to delete post"),
    });
  };

  return (
    <div className="bg-card border border-card-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors group" data-testid={`card-post-${post.id}`}>
      <div className="flex">
        {/* Vote column */}
        <div className="flex flex-col items-center gap-1 px-2 py-3 bg-muted/40 w-12 shrink-0">
          <button
            onClick={() => handleVote(1)}
            className={`p-1 rounded transition-colors ${myVote === 1 ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            data-testid={`button-upvote-${post.id}`}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <span className={`text-xs font-bold ${myVote === 1 ? "text-primary" : myVote === -1 ? "text-blue-500" : "text-foreground"}`}>
            {score}
          </span>
          <button
            onClick={() => handleVote(-1)}
            className={`p-1 rounded transition-colors ${myVote === -1 ? "text-blue-500" : "text-muted-foreground hover:text-blue-500"}`}
            data-testid={`button-downvote-${post.id}`}
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 min-w-0">
          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5 flex-wrap">
            <Link href={`/r/${post.community.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors">
              r/{post.community.slug}
            </Link>
            <span>·</span>
            <span>Posted by</span>
            <Link href={`/u/${post.author.username}`} className="hover:text-foreground transition-colors">
              u/{post.author.username}
            </Link>
            <span>·</span>
            <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
          </div>

          {/* Title */}
          <Link href={`/post/${post.id}`}>
            <h2 className="font-semibold text-base leading-snug hover:text-primary transition-colors line-clamp-2 mb-1.5">
              {post.title}
            </h2>
          </Link>

          {/* Image */}
          {post.imageUrl && !compact && (
            <Link href={`/post/${post.id}`}>
              <img src={post.imageUrl} alt={post.title} className="w-full max-h-96 object-cover rounded-lg mb-2" loading="lazy" />
            </Link>
          )}

          {/* Content preview */}
          {post.content && !compact && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{post.content}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Link href={`/post/${post.id}`}>
              <Button variant="ghost" size="sm" className="h-7 px-2 gap-1.5 text-xs" data-testid={`button-comments-${post.id}`}>
                <MessageSquare className="w-3.5 h-3.5" />
                {post.commentCount} comments
              </Button>
            </Link>
            <Button
              variant="ghost" size="sm"
              className={`h-7 px-2 gap-1.5 text-xs ${isSaved ? "text-primary" : ""}`}
              onClick={handleSave}
              data-testid={`button-save-${post.id}`}
            >
              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              {isSaved ? "Saved" : "Save"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {session && (
                  <DropdownMenuItem onClick={() => setReportOpen(true)}>
                    <Flag className="w-3.5 h-3.5 mr-2" /> Report
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} postId={post.id} />
    </div>
  );
}
