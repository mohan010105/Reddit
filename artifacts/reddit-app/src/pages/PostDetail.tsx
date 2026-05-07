import { useState } from "react";
import { useParams, Link } from "wouter";
import { useGetPost, useListComments, useCreateComment, getListCommentsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { CommentThread } from "@/components/CommentThread";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, LogIn } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useGetMe } from "@workspace/api-client-react";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id!);
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const createComment = useCreateComment();

  const { data: me } = useGetMe({ query: { enabled: !!session } });
  const { data: post, isLoading: postLoading } = useGetPost(postId, { query: { enabled: !!postId, queryKey: [] } });
  const { data: comments, isLoading: commentsLoading } = useListComments(postId, { query: { enabled: !!postId, queryKey: getListCommentsQueryKey(postId) } });

  const handleComment = () => {
    if (!commentText.trim()) return;
    createComment.mutate({ postId, data: { content: commentText, parentId: null } }, {
      onSuccess: () => {
        setCommentText("");
        queryClient.invalidateQueries({ queryKey: getListCommentsQueryKey(postId) });
        toast.success("Comment posted!");
      },
      onError: () => toast.error("Failed to post comment"),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleComment();
    }
  };

  if (postLoading) return (
    <div className="space-y-4">
      <div className="bg-card border border-card-border rounded-xl p-4 flex gap-3">
        <Skeleton className="w-10 h-32 rounded-lg shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
      <Skeleton className="h-24 w-full rounded-xl" />
      {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
    </div>
  );

  if (!post) return (
    <div className="text-center py-20 text-muted-foreground">
      <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
      <p className="font-medium">Post not found</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      <PostCard post={post} />

      {/* Comment box */}
      {session ? (
        <div className="bg-card border border-card-border rounded-xl p-4">
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarImage src={me?.avatarUrl ?? undefined} />
              <AvatarFallback className="text-xs font-semibold bg-primary/20 text-primary">
                {me?.username?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share your thoughts... (⌘+Enter to post)"
                className="min-h-[80px] mb-2 resize-none text-sm"
                data-testid="input-comment"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleComment}
                  disabled={createComment.isPending || !commentText.trim()}
                  size="sm"
                  className="gap-1.5"
                  data-testid="button-post-comment"
                >
                  {createComment.isPending ? "Posting..." : "Comment"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-card-border rounded-xl p-5 text-center">
          <LogIn className="w-8 h-8 mx-auto mb-2 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground mb-3">Log in to join the discussion</p>
          <Link href="/login">
            <Button size="sm" className="gap-1.5"><LogIn className="w-3.5 h-3.5" /> Log In</Button>
          </Link>
        </div>
      )}

      {/* Comments section */}
      <div className="bg-card border border-card-border rounded-xl p-4">
        <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          {post.commentCount} {post.commentCount === 1 ? "Comment" : "Comments"}
        </h2>
        {commentsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-2">
                <Skeleton className="w-6 h-6 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : comments && comments.length > 0 ? (
          <AnimatePresence initial={false}>
            <div className="flex flex-col gap-4">
              {comments.map((comment, i) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <CommentThread comment={comment} postId={postId} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-10">
            <MessageSquare className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">No comments yet. Start the conversation.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
