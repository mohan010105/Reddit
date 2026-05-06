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
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id!);
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const createComment = useCreateComment();

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

  if (postLoading) return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );

  if (!post) return <div className="text-center py-20 text-muted-foreground">Post not found</div>;

  return (
    <div className="flex flex-col gap-4">
      <PostCard post={post} />

      {/* Comment box */}
      {session ? (
        <div className="bg-card border border-card-border rounded-xl p-4">
          <p className="text-sm font-medium mb-2">Add a comment</p>
          <Textarea
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Share your thoughts..."
            className="min-h-[80px] mb-2"
            data-testid="input-comment"
          />
          <Button
            onClick={handleComment}
            disabled={createComment.isPending || !commentText.trim()}
            size="sm"
            data-testid="button-post-comment"
          >
            {createComment.isPending ? "Posting..." : "Comment"}
          </Button>
        </div>
      ) : (
        <div className="bg-card border border-card-border rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">Log in to join the discussion</p>
          <Link href="/login"><Button size="sm">Log In</Button></Link>
        </div>
      )}

      {/* Comments */}
      <div className="bg-card border border-card-border rounded-xl p-4">
        <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          {post.commentCount} Comments
        </h2>
        {commentsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded" />)}
          </div>
        ) : comments && comments.length > 0 ? (
          <div className="flex flex-col gap-4">
            {comments.map(comment => (
              <CommentThread key={comment.id} comment={comment} postId={postId} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm text-center py-8">No comments yet. Start the conversation.</p>
        )}
      </div>
    </div>
  );
}
