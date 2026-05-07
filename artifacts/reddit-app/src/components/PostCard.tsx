import { Link } from "wouter";
import { ArrowUp, ArrowDown, MessageSquare, Bookmark, BookmarkCheck, Flag, MoreHorizontal, Trash2, Share2, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  index?: number;
}

export function PostCard({ post, compact = false, index = 0 }: PostCardProps) {
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

  const handleShare = () => {
    const url = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(url).then(() => toast.success("Link copied!")).catch(() => toast.error("Failed to copy"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4), ease: "easeOut" }}
      className="bg-card border border-card-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 group"
      data-testid={`card-post-${post.id}`}
    >
      <div className="flex">
        {/* Vote column */}
        <div className="flex flex-col items-center gap-1 px-2 py-3 bg-muted/30 w-12 shrink-0">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => handleVote(1)}
            className={`p-1 rounded-md transition-colors ${myVote === 1 ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}
            data-testid={`button-upvote-${post.id}`}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
          <AnimatePresence mode="wait">
            <motion.span
              key={score}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className={`text-xs font-bold tabular-nums ${myVote === 1 ? "text-primary" : myVote === -1 ? "text-blue-500" : "text-foreground"}`}
            >
              {score >= 1000 ? `${(score / 1000).toFixed(1)}k` : score}
            </motion.span>
          </AnimatePresence>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => handleVote(-1)}
            className={`p-1 rounded-md transition-colors ${myVote === -1 ? "text-blue-500 bg-blue-500/10" : "text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10"}`}
            data-testid={`button-downvote-${post.id}`}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 min-w-0">
          {/* Meta */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5 flex-wrap">
            <Avatar className="w-4 h-4">
              <AvatarFallback className="text-[8px] bg-primary/20 text-primary">{post.community.name[0]}</AvatarFallback>
            </Avatar>
            <Link href={`/r/${post.community.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors">
              r/{post.community.slug}
            </Link>
            <span className="text-muted-foreground/50">·</span>
            <span>Posted by</span>
            <Link href={`/u/${post.author.username}`} className="hover:text-foreground transition-colors">
              u/{post.author.username}
            </Link>
            <span className="text-muted-foreground/50">·</span>
            <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
            {post.type === "link" && (
              <span className="ml-auto flex items-center gap-0.5 text-primary">
                <ExternalLink className="w-3 h-3" /> link
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/post/${post.id}`}>
            <h2 className="font-semibold text-base leading-snug hover:text-primary transition-colors line-clamp-2 mb-1.5 group-hover:text-primary/90">
              {post.title}
            </h2>
          </Link>

          {/* Image */}
          {post.imageUrl && !compact && (
            <Link href={`/post/${post.id}`}>
              <div className="relative overflow-hidden rounded-lg mb-2 bg-muted">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full max-h-80 object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </Link>
          )}

          {/* Content preview */}
          {post.content && !compact && !post.imageUrl && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2 leading-relaxed">{post.content}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-0.5 text-muted-foreground mt-1">
            <Link href={`/post/${post.id}`}>
              <Button variant="ghost" size="sm" className="h-7 px-2 gap-1.5 text-xs hover:text-foreground" data-testid={`button-comments-${post.id}`}>
                <MessageSquare className="w-3.5 h-3.5" />
                {post.commentCount} {post.commentCount === 1 ? "comment" : "comments"}
              </Button>
            </Link>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost" size="sm"
                className={`h-7 px-2 gap-1.5 text-xs hover:text-foreground ${isSaved ? "text-primary" : ""}`}
                onClick={handleSave}
                data-testid={`button-save-${post.id}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isSaved ? (
                    <motion.span key="saved" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                      <BookmarkCheck className="w-3.5 h-3.5" /> Saved
                    </motion.span>
                  ) : (
                    <motion.span key="save" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5" /> Save
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            <Button variant="ghost" size="sm" className="h-7 px-2 gap-1.5 text-xs hover:text-foreground" onClick={handleShare}>
              <Share2 className="w-3.5 h-3.5" /> Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
    </motion.div>
  );
}
