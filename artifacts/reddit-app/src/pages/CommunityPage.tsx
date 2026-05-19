import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "wouter";
import { useGetCommunity, useGetCommunityPosts, useJoinCommunity, useLeaveCommunity, getGetCommunityQueryKey } from "@workspace/api-client-react";
import type { Post } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { PostCard } from "@/components/PostCard";
import { CreatePostModal } from "@/components/CreatePostModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Plus, Flame, Sparkles, TrendingUp, ArrowUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { motion, AnimatePresence } from "framer-motion";

type SortMode = "hot" | "new" | "top" | "rising";

export default function CommunityPage() {
  const { slug } = useParams<{ slug: string }>();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [sort, setSort] = useState<SortMode>("hot");
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const { data: community, isLoading: communityLoading } = useGetCommunity(slug!);
  const { data: posts, isLoading: postsLoading, isFetching } = useGetCommunityPosts(slug!, { sort, page, limit: 20 });
  const joinCommunity = useJoinCommunity();
  const leaveCommunity = useLeaveCommunity();

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

  const handleSortChange = (newSort: string) => {
    setSort(newSort as SortMode);
    setPage(1);
    setAllPosts([]);
  };

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) setPage(p => p + 1);
  }, [isFetching, hasMore]);

  const { sentinelRef } = useInfiniteScroll(loadMore, hasMore, isFetching);

  const handleJoin = () => {
    if (!session) { toast.error("Log in to join"); return; }
    const invalidate = () => queryClient.invalidateQueries({ queryKey: getGetCommunityQueryKey(slug!) });
    if (community?.isJoined) {
      leaveCommunity.mutate({ slug: slug! }, { onSuccess: invalidate, onError: () => toast.error("Failed to leave") });
    } else {
      joinCommunity.mutate({ slug: slug! }, { onSuccess: invalidate, onError: () => toast.error("Failed to join") });
    }
  };

  if (communityLoading) return (
    <div className="space-y-4">
      <Skeleton className="h-44 w-full rounded-xl" />
      <Skeleton className="h-12 w-full rounded-xl" />
      {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)}
    </div>
  );

  if (!community) return (
    <div className="text-center py-20 text-muted-foreground">
      <p className="text-lg font-medium mb-2">Community not found</p>
      <p className="text-sm">This community may have been deleted or never existed.</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Banner + Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-card-border rounded-xl overflow-hidden"
      >
        {community.bannerUrl ? (
          <img src={community.bannerUrl} alt={community.name} className="w-full h-28 object-cover" />
        ) : (
          <div className="w-full h-28 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
        )}
        <div className="p-4 flex items-end gap-4 -mt-8">
          <Avatar className="w-16 h-16 border-4 border-card ring-2 ring-primary/20">
            <AvatarImage src={community.iconUrl ?? undefined} />
            <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">{community.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 pb-1 min-w-0">
            <h1 className="text-xl font-bold leading-tight">r/{community.slug}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {community.memberCount.toLocaleString()} members
            </p>
          </div>
          <div className="flex gap-2 pb-1 shrink-0">
            {session && (
              <Button size="sm" onClick={() => setCreatePostOpen(true)} className="gap-1.5" data-testid="button-create-post-community">
                <Plus className="w-3.5 h-3.5" /> Post
              </Button>
            )}
            <Button
              size="sm"
              variant={community.isJoined ? "outline" : "default"}
              onClick={handleJoin}
              data-testid="button-join-community"
            >
              {community.isJoined ? "Joined" : "Join"}
            </Button>
          </div>
        </div>
        {community.description && (
          <p className="px-4 pb-4 text-sm text-muted-foreground">{community.description}</p>
        )}
      </motion.div>

      {/* Sort tabs */}
      <div className="bg-card border border-card-border rounded-xl p-3">
        <Tabs value={sort} onValueChange={handleSortChange}>
          <TabsList className="bg-transparent p-0 gap-1">
            {(["hot", "new", "top", "rising"] as SortMode[]).map(s => {
              const Icon = { hot: Flame, new: Sparkles, top: TrendingUp, rising: ArrowUp }[s];
              return (
                <TabsTrigger key={s} value={s} className="gap-1.5 capitalize text-sm">
                  <Icon className="w-3.5 h-3.5" /> {s}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-card-border rounded-xl p-12 text-center"
            >
              <p className="text-muted-foreground mb-3">No posts yet. Be the first to share!</p>
              {session && (
                <Button onClick={() => setCreatePostOpen(true)} size="sm" className="gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Create Post
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div key={`community-feed-${sort}`} className="flex flex-col gap-3">
              {allPosts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="flex justify-center py-4" aria-hidden>
        {isFetching && page > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </motion.div>
        )}
      </div>

      {createPostOpen && community && (
        <CreatePostModal open={createPostOpen} onClose={() => setCreatePostOpen(false)} communityId={community.id} />
      )}
    </div>
  );
}
