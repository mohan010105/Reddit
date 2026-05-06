import { Link } from "wouter";
import { useListNotifications, useMarkAllNotificationsRead, useMarkNotificationRead, getListNotificationsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, CheckCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export default function Notifications() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useListNotifications({ limit: 50 });
  const markAll = useMarkAllNotificationsRead();
  const markOne = useMarkNotificationRead();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListNotificationsQueryKey() });

  const handleMarkAll = () => {
    markAll.mutate(undefined, { onSuccess: () => { toast.success("All marked as read"); invalidate(); }, onError: () => toast.error("Failed") });
  };

  const handleMarkOne = (id: number) => {
    markOne.mutate({ id }, { onSuccess: invalidate });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2"><Bell className="w-5 h-5 text-primary" /> Notifications</h1>
        {(data?.unreadCount ?? 0) > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAll} className="gap-1" data-testid="button-mark-all-read">
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </Button>
        )}
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4 border-b border-border">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1 space-y-1"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-1/4" /></div>
            </div>
          ))
        ) : data?.data.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : data?.data.map(n => (
          <div
            key={n.id}
            className={`flex items-start gap-3 p-4 border-b border-border last:border-b-0 transition-colors cursor-pointer hover:bg-muted/40 ${!n.isRead ? "bg-primary/5" : ""}`}
            onClick={() => { if (!n.isRead) handleMarkOne(n.id); }}
            data-testid={`notification-${n.id}`}
          >
            {!n.isRead && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarImage src={n.actor?.avatarUrl ?? undefined} />
              <AvatarFallback className="text-xs">{n.actor?.username?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}</p>
              {n.postId && (
                <Link href={`/post/${n.postId}`} className="text-xs text-primary hover:underline mt-0.5 block">View post</Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
