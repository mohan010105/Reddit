import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { UserPlus, UserMinus, Loader2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useSocialStore } from "@/store/socialStore";
import { useFollowUser, useUnfollowUser } from "@workspace/api-client-react";

export function SuggestedUsers() {
  const { session } = useAuth();
  const isFollowing = useSocialStore((state) => state.isFollowing);
  const toggleFollowingStore = useSocialStore((state) => state.toggleFollowing);
  
  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();

  const { data: users, isLoading } = useQuery({
    queryKey: ["suggested-users"],
    queryFn: async () => {
      const res = await fetch("/api/users/suggested", {
        headers: {
          "Authorization": `Bearer ${session?.access_token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<any[]>;
    },
    enabled: !!session,
  });

  const handleFollow = (username: string, userId: number) => {
    if (!session) return;
    const following = isFollowing(userId);
    
    // Optimistic update
    toggleFollowingStore(userId);
    
    if (following) {
      unfollowUser.mutate({ username }, {
        onError: () => { toggleFollowingStore(userId); toast.error("Failed to unfollow"); }
      });
    } else {
      followUser.mutate({ username }, {
        onError: () => { toggleFollowingStore(userId); toast.error("Failed to follow"); }
      });
    }
  };

  if (!session) return null;

  return (
    <div className="bg-card border border-card-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 bg-gradient-to-r from-blue-500/10 to-transparent border-b border-border">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500" /> Suggested for you
        </h3>
      </div>
      <div className="p-2 flex flex-col gap-0.5">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 p-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2 w-12" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : users?.length === 0 ? (
            <div className="p-4 text-center text-xs text-muted-foreground">No suggestions</div>
          ) : (
            <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-0.5">
              {users?.map((u) => {
                const following = isFollowing(u.id);
                return (
                  <div key={u.id} className="flex items-center gap-3 hover:bg-muted rounded-lg p-2 transition-colors">
                    <Link href={`/u/${u.username}`} className="flex items-center gap-3 flex-1 min-w-0">
                      <Avatar className="w-8 h-8 shrink-0">
                        <AvatarImage src={u.avatarUrl ?? undefined} />
                        <AvatarFallback className="text-xs font-bold bg-primary/20 text-primary">{u.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">u/{u.username}</p>
                        <p className="text-[10px] text-muted-foreground">{u.karma.toLocaleString()} karma</p>
                      </div>
                    </Link>
                    <Button
                      size="sm"
                      variant={following ? "ghost" : "outline"}
                      className="h-7 w-7 p-0 shrink-0"
                      onClick={() => handleFollow(u.username, u.id)}
                    >
                      {following ? <UserMinus className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                    </Button>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
