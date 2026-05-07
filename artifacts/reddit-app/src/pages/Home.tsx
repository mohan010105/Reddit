import { useState, useEffect, useCallback, useRef } from "react";
import { useListPosts } from "@workspace/api-client-react";
import type { Post } from "@workspace/api-client-react";
import { PostCard } from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Sparkles, TrendingUp, ArrowUp, Loader2 } from "lucide-react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { motion, AnimatePresence } from "framer-motion";

type SortMode = "hot" | "new" | "top" | "rising";

function PostSkeleton() {
  return (
    <div className="bg-card border border-card-border rounded-xl p-4 flex gap-3">
      <Skeleton className="w-10 h-24 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2.5">
        <div className="flex gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [sort, setSort] = useState<SortMode>("hot");
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const { data, isLoading, isFetching } = useListPosts({ sort, page, limit: 20 });

  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllPosts(data.data);
      } else {
        setAllPosts(prev => {
          const ids = new Set(prev.map(p => p.id));
          return [...prev, ...data.data.filter(p => !ids.has(p.id))];
        });
      }
      setHasMore(data.hasMore);
    }
  }, [data, page]);

  const handleSortChange = (newSort: string) => {
    setSort(newSort as SortMode);
    setPage(1);
    setAllPosts([]);
    setHasMore(false);
  };

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) setPage(p => p + 1);
  }, [isFetching, hasMore]);

  const { sentinelRef } = useInfiniteScroll(loadMore, hasMore, isFetching);

  const sortIcons = { hot: Flame, new: Sparkles, top: TrendingUp, rising: ArrowUp };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-card border border-card-border rounded-xl p-3">
        <Tabs value={sort} onValueChange={handleSortChange}>
          <TabsList className="bg-transparent p-0 gap-1">
            {(["hot", "new", "top", "rising"] as SortMode[]).map(s => {
              const Icon = sortIcons[s];
              return (
                <TabsTrigger key={s} value={s} className="gap-1.5 capitalize text-sm" data-testid={`tab-sort-${s}`}>
                  <Icon className="w-3.5 h-3.5" /> {s}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="wait">
          {isLoading && page === 1 ? (
            <motion.div
              key="skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3"
            >
              {Array.from({ length: 5 }).map((_, i) => <PostSkeleton key={i} />)}
            </motion.div>
          ) : allPosts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-card-border rounded-xl p-14 text-center"
            >
              <TrendingUp className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-1">No posts yet</h3>
              <p className="text-muted-foreground text-sm">Be the first to share something interesting.</p>
            </motion.div>
          ) : (
            <motion.div key={`feed-${sort}`} className="flex flex-col gap-3">
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
    </div>
  );
}
