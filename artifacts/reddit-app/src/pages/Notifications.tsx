import { Link } from "wouter";
import { useListNotifications, useMarkAllNotificationsRead, useMarkNotificationRead, getListNotificationsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, CheckCheck, MessageSquare, ArrowUp, UserPlus, AtSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const notificationIcons: Record<string, React.ReactNode> = {
  post_comment: <MessageSquare className="w-3.5 h-3.5 text-blue-400" />,
  comment_reply: <MessageSquare className="w-3.5 h-3.5 text-green-400" />,
  upvote: <ArrowUp className="w-3.5 h-3.5 text-primary" />,
  follow: <UserPlus className="w-3.5 h-3.5 text-purple-400" />,
  mention: <AtSign className="w-3.5 h-3.5 text-yellow-400" />,
};

export default function Notifications() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useListNotifications({ limit: 50 });
  const markAll = useMarkAllNotificationsRead();
  const markOne = useMarkNotificationRead();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListNotificationsQueryKey() });

  const handleMarkAll = () => {
    markAll.mutate(undefined, {
      onSuccess: () => { toast.success("All marked as read"); invalidate(); },
      onError: () => toast.error("Failed"),
    });
  };

  const handleMarkOne = (id: number) => {
    markOne.mutate({ id }, { onSuccess: invalidate });
  };

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" /> Notifications
          {(data?.unreadCount ?? 0) > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded-full"
            >
              {data?.unreadCount} new
            </motion.span>
          )}
        </h1>
        {(data?.unreadCount ?? 0) > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAll} className="gap-1.5" data-testid="button-mark-all-read">
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </Button>
        )}
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4 border-b border-border last:border-b-0">
              <Skeleton className="w-9 h-9 rounded-full shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))
        ) : data?.data.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-14 text-center text-muted-foreground"
          >
            <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium mb-1">All caught up!</p>
            <p className="text-sm opacity-70">No notifications yet</p>
          </motion.div>
        ) : (
          <AnimatePresence initial={false}>
            {data?.data.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex items-start gap-3 p-4 border-b border-border last:border-b-0 transition-colors cursor-pointer hover:bg-muted/40 ${!n.isRead ? "bg-primary/5" : ""}`}
                onClick={() => { if (!n.isRead) handleMarkOne(n.id); }}
                data-testid={`notification-${n.id}`}
              >
                <div className="relative shrink-0">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={n.actor?.avatarUrl ?? undefined} />
                    <AvatarFallback className="text-xs font-semibold">{n.actor?.username?.[0]?.toUpperCase() ?? "?"}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 bg-card rounded-full p-0.5">
                    {notificationIcons[n.type] ?? <Bell className="w-3.5 h-3.5 text-muted-foreground" />}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">
                    {n.actor && (
                      <Link href={`/u/${n.actor.username}`}>
                        <span className="font-semibold hover:text-primary transition-colors">{n.actor.username} </span>
                      </Link>
                    )}
                    {n.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                  </p>
                  {n.postId && (
                    <Link href={`/post/${n.postId}`} className="text-xs text-primary hover:underline mt-1 block">
                      View post →
                    </Link>
                  )}
                </div>
                {!n.isRead && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
