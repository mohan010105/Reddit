import { useState, useEffect, useCallback, useMemo } from "react";
import { useListPosts } from "@workspace/api-client-react";
import type { Post } from "@workspace/api-client-react";
import { PostCard } from "@/components/PostCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Sparkles, TrendingUp, ArrowUp, Loader2, Wand2 } from "lucide-react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { motion, AnimatePresence } from "framer-motion";
import { FeedSkeleton } from "@/components/Skeletons";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";

type SortMode = "hot" | "new" | "top" | "rising" | "recommended";

export default function Home() {
  const { session } = useAuth();
  const [sort, setSort] = useState<SortMode>(session ? "recommended" : "hot");
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [recLoading, setRecLoading] = useState(false);

  // Default query for standard sorts
  const { data, isLoading, isFetching } = useListPosts(
    { sort: sort === "recommended" ? "hot" : sort as any, page, limit: 20 },
    { query: { enabled: sort !== "recommended", queryKey: ["posts", sort, page] } }
  );

  // Fetch recommendations
  useEffect(() => {
    if (sort !== "recommended") return;
    
    const fetchRecs = async () => {
      try {
        if (page === 1) setRecLoading(true);
        const { data: recs } = await api.get("/recommendations/posts", {
          params: { limit: 20, offset: (page - 1) * 20 }
        });
        
        if (page === 1) {
          setAllPosts(recs);
        } else {
          setAllPosts(prev => {
            const ids = new Set(prev.map(p => p.id));
            return [...prev, ...recs.filter((p: any) => !ids.has(p.id))];
          });
        }
        setHasMore(recs.length === 20);
      } catch (e) {
        // Fallback to hot if recommendations fail
        setSort("hot");
      } finally {
        setRecLoading(false);
      }
    };

    fetchRecs();
  }, [sort, page, session]);

  // Standard sort effect
  useEffect(() => {
    if (sort !== "recommended" && data?.data) {
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
  }, [data, page, sort]);

  const handleSortChange = (newSort: string) => {
    setSort(newSort as SortMode);
    setPage(1);
    setAllPosts([]);
    setHasMore(false);
  };

  const loadMore = useCallback(() => {
    if (!isFetching && !recLoading && hasMore) setPage(p => p + 1);
  }, [isFetching, recLoading, hasMore]);

  const { sentinelRef } = useInfiniteScroll(loadMore, hasMore, isFetching || recLoading);

  const sortIcons = useMemo(() => ({ 
    recommended: Wand2,
    hot: Flame, 
    new: Sparkles, 
    top: TrendingUp, 
    rising: ArrowUp 
  }), []);

  const currentLoading = (isLoading && page === 1) || (recLoading && page === 1);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-card border border-card-border rounded-xl p-3 shadow-sm sticky top-[65px] z-10 glass">
        <Tabs value={sort} onValueChange={handleSortChange}>
          <TabsList className="bg-transparent p-0 gap-1 overflow-x-auto no-scrollbar justify-start">
            {(session ? ["recommended", "hot", "new", "top", "rising"] : ["hot", "new", "top", "rising"]).map(s => {
              const Icon = (sortIcons as any)[s];
              return (
                <TabsTrigger key={s} value={s} className="gap-1.5 capitalize text-sm px-4 h-9" data-testid={`tab-sort-${s}`}>
                  <Icon className="w-3.5 h-3.5" /> {s === "recommended" ? "For You" : s}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="wait">
          {currentLoading ? (
            <motion.div
              key="skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeedSkeleton count={6} />
            </motion.div>
          ) : allPosts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-card-border rounded-2xl p-20 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <h3 className="font-bold text-xl mb-2">No posts here yet</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">Explore some communities to see more content in your feed.</p>
            </motion.div>
          ) : (
            <motion.div 
              key={`feed-${sort}`} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col gap-3"
            >
              {allPosts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div ref={sentinelRef} className="flex justify-center py-10" aria-hidden>
        {(isFetching || recLoading) && page > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
