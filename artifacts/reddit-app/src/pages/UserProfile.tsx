import { useState, useCallback } from "react";
import { useParams, Link } from "wouter";
import { useGetUserByUsername, useGetUserPosts, useFollowUser, useUnfollowUser, getGetUserByUsernameQueryKey } from "@workspace/api-client-react";
import type { Post } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, MessageSquare, Users, UserPlus, UserMinus, Calendar, Loader2 } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useEffect } from "react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export default function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const { session } = useAuth();
  const { isUserOnline } = useOnlineStatus();
  const queryClient = useQueryClient();
  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();

  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const { data: profile, isLoading: profileLoading } = useGetUserByUsername(username!);
  const { data: posts, isLoading: postsLoading, isFetching } = useGetUserPosts(username!, { page, limit: 10 });

  useEffect(() => {
    if (posts?.data) {
      if (page === 1) {
        setAllPosts(posts.data);
      } else {
        setAllPosts(prev => {
          const ids = new Set(prev.map(p => p.id));
          return [...prev, ...posts.data.filter(p => !ids.has(p.id))];
        });
      }
      setHasMore(posts.hasMore);
    }
  }, [posts, page]);

  useEffect(() => {
    setPage(1);
    setAllPosts([]);
  }, [username]);

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) setPage(p => p + 1);
  }, [isFetching, hasMore]);

  const { sentinelRef } = useInfiniteScroll(loadMore, hasMore, isFetching);

  const handleFollow = () => {
    if (!session) { toast.error("Log in to follow"); return; }
    const invalidate = () => queryClient.invalidateQueries({ queryKey: getGetUserByUsernameQueryKey(username!) });
    if (profile?.isFollowedByMe) {
      unfollowUser.mutate({ username: username! }, { onSuccess: invalidate, onError: () => toast.error("Failed to unfollow") });
    } else {
      followUser.mutate({ username: username! }, { onSuccess: invalidate, onError: () => toast.error("Failed to follow") });
    }
  };

  if (profileLoading) return (
    <div className="space-y-4">
      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <Skeleton className="h-32 w-full" />
        <div className="p-5 flex gap-4">
          <Skeleton className="w-20 h-20 rounded-full shrink-0 -mt-10" />
          <div className="flex-1 space-y-2 pt-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)}
    </div>
  );

  if (!profile) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-24 text-muted-foreground"
    >
      <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
      <p className="font-medium">User not found</p>
    </motion.div>
  );

  const statItems = [
    { icon: Trophy, label: "Karma", value: profile.karma.toLocaleString(), color: "text-primary" },
    { icon: MessageSquare, label: "Posts", value: profile.postCount, color: "text-blue-400" },
    { icon: Users, label: "Followers", value: profile.followerCount, color: "text-purple-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      {/* Profile Card */}
      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-br from-primary/30 via-primary/15 to-transparent relative">
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        </div>

        {/* Profile info */}
        <div className="px-5 pb-5 -mt-12">
          <div className="flex items-end gap-4 mb-4">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-card ring-2 ring-primary/20 shrink-0">
                <AvatarImage src={profile.avatarUrl ?? undefined} />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-orange-400 text-white">
                  {profile.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isUserOnline((profile as any).supabaseId) && (
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-4 border-card rounded-full shadow-lg" title="Online" />
              )}
            </div>
            <div className="flex-1 pb-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">u/{profile.username}</h1>
                {session && (
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant={profile.isFollowedByMe ? "outline" : "default"}
                      onClick={handleFollow}
                      className="gap-1.5 h-8"
                      data-testid="button-follow-user"
                    >
                      {profile.isFollowedByMe
                        ? <><UserMinus className="w-3.5 h-3.5" /> Unfollow</>
                        : <><UserPlus className="w-3.5 h-3.5" /> Follow</>}
                    </Button>
                  </motion.div>
                )}
              </div>
              {profile.bio && (
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">{profile.bio}</p>
              )}
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
                <Calendar className="w-3 h-3" />
                Joined {format(new Date(profile.createdAt), "MMMM yyyy")}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {statItems.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-muted/50 rounded-xl p-3 text-center">
                <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
                <p className="font-bold text-lg leading-tight">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Posts section */}
      <div className="flex items-center justify-between px-1">
        <h2 className="font-semibold text-base flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" /> Posts
        </h2>
        <span className="text-xs text-muted-foreground">{profile.postCount} total</span>
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="wait">
          {postsLoading && page === 1 ? (
            <motion.div key="skeletons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)}
            </motion.div>
          ) : allPosts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-card-border rounded-xl p-10 text-center text-muted-foreground"
            >
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No posts yet</p>
            </motion.div>
          ) : (
            <motion.div key="posts" className="flex flex-col gap-3">
              {allPosts.map((post, i) => (
                <PostCard key={post.id} post={post} compact index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="flex justify-center py-4" aria-hidden>
        {isFetching && page > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
