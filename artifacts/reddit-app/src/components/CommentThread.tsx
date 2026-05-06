import { useState } from "react";
import { ArrowUp, ArrowDown, ChevronDown, ChevronRight, Reply, Trash2, Pencil } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useVoteComment, useDeleteComment, useUpdateComment, useCreateComment, getListCommentsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import type { Comment } from "@workspace/api-client-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";

interface CommentThreadProps {
  comment: Comment;
  postId: number;
  depth?: number;
}

export function CommentThread({ comment, postId, depth = 0 }: CommentThreadProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [collapsed, setCollapsed] = useState(false);
  const [myVote, setMyVote] = useState(comment.myVote ?? 0);
  const [score, setScore] = useState(comment.score);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const voteComment = useVoteComment();
  const deleteComment = useDeleteComment();
  const updateComment = useUpdateComment();
  const createComment = useCreateComment();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListCommentsQueryKey(postId) });

  const handleVote = (val: 1 | -1) => {
    if (!session) { toast.error("Log in to vote"); return; }
    const newVote = myVote === val ? 0 : val;
    setMyVote(newVote); setScore(s => s + (newVote - myVote));
    voteComment.mutate({ id: comment.id, data: { value: newVote as 0 | 1 | -1 } }, {
      onError: () => { setMyVote(myVote); setScore(comment.score); },
      onSuccess: invalidate,
    });
  };

  const handleDelete = () => {
    deleteComment.mutate({ id: comment.id }, { onSuccess: invalidate, onError: () => toast.error("Failed to delete") });
  };

  const handleEdit = () => {
    if (!editText.trim()) return;
    updateComment.mutate({ id: comment.id, data: { content: editText } }, {
      onSuccess: () => { setEditing(false); invalidate(); },
      onError: () => toast.error("Failed to update"),
    });
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    createComment.mutate({ postId, data: { content: replyText, parentId: comment.id } }, {
      onSuccess: () => { setReplyText(""); setReplyOpen(false); invalidate(); },
      onError: () => toast.error("Failed to post reply"),
    });
  };

  const indentColors = ["border-primary/40", "border-blue-500/40", "border-green-500/40", "border-purple-500/40", "border-yellow-500/40"];

  if (comment.isDeleted && (!comment.replies || comment.replies.length === 0)) return null;

  return (
    <div className={`flex gap-2 ${depth > 0 ? "mt-2" : ""}`}>
      {depth > 0 && (
        <div
          className={`w-0.5 shrink-0 rounded-full cursor-pointer hover:opacity-100 opacity-60 transition-opacity ${indentColors[Math.min(depth - 1, 4)]}`}
          style={{ minHeight: "1.5rem" }}
          onClick={() => setCollapsed(!collapsed)}
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Avatar className="w-5 h-5">
            <AvatarImage src={comment.author?.avatarUrl ?? undefined} />
            <AvatarFallback className="text-xs">{comment.author?.username?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <Link href={`/u/${comment.author?.username}`}>
            <span className="text-xs font-semibold hover:text-primary transition-colors">{comment.author?.username}</span>
          </Link>
          <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
          {depth > 0 && (
            <button onClick={() => setCollapsed(!collapsed)} className="ml-auto text-muted-foreground">
              {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>

        {!collapsed && (
          <>
            {editing ? (
              <div className="mb-2">
                <Textarea value={editText} onChange={e => setEditText(e.target.value)} className="text-sm min-h-[60px]" />
                <div className="flex gap-2 mt-1">
                  <Button size="sm" onClick={handleEdit} disabled={updateComment.isPending}>Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <p className={`text-sm mb-1 ${comment.isDeleted ? "text-muted-foreground italic" : ""}`}>
                {comment.isDeleted ? "[deleted]" : comment.content}
              </p>
            )}

            <div className="flex items-center gap-1 mb-2">
              <button onClick={() => handleVote(1)} className={`p-1 rounded transition-colors ${myVote === 1 ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
                <ArrowUp className="w-3 h-3" />
              </button>
              <span className={`text-xs font-bold ${myVote === 1 ? "text-primary" : myVote === -1 ? "text-blue-500" : ""}`}>{score}</span>
              <button onClick={() => handleVote(-1)} className={`p-1 rounded transition-colors ${myVote === -1 ? "text-blue-500" : "text-muted-foreground hover:text-blue-500"}`}>
                <ArrowDown className="w-3 h-3" />
              </button>
              {session && (
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1" onClick={() => setReplyOpen(!replyOpen)}>
                  <Reply className="w-3 h-3" /> Reply
                </Button>
              )}
              {session && !comment.isDeleted && (
                <>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setEditing(true)}>
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-destructive" onClick={handleDelete}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>

            {replyOpen && (
              <div className="mb-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className="text-sm min-h-[60px]"
                />
                <div className="flex gap-2 mt-1">
                  <Button size="sm" onClick={handleReply} disabled={createComment.isPending}>Reply</Button>
                  <Button size="sm" variant="ghost" onClick={() => setReplyOpen(false)}>Cancel</Button>
                </div>
              </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-1">
                {comment.replies.map(reply => (
                  <CommentThread key={reply.id} comment={reply} postId={postId} depth={depth + 1} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
