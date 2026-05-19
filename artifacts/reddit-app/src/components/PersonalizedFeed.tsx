import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, RefreshCw, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/PostCard";
import { useRecommendationStore } from "@/store/monetizationStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import axios from "axios";



export function PersonalizedFeed() {
  const { recommendedPosts, setRecommendations } = useRecommendationStore();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecommendations = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const [postsRes, commsRes] = await Promise.all([
        axios.get("/api/recommendations/posts"),
        axios.get("/api/recommendations/communities")
      ]);

      setRecommendations(postsRes.data, commsRes.data);
    } catch (e) {
      console.error("Failed to load recommendations", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (recommendedPosts.length === 0) {
      fetchRecommendations();
    }
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-card border border-card-border rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-bold text-lg">For You</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1.5 text-muted-foreground hover:text-primary"
          onClick={() => fetchRecommendations(true)}
          disabled={refreshing}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="flex flex-col gap-3">
          {recommendedPosts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}

          {recommendedPosts.length === 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="bg-card border border-card-border rounded-xl p-12 text-center"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 opacity-20" />
              </div>
              <p className="font-bold">No recommendations yet</p>
              <p className="text-sm text-muted-foreground mb-4">Join some communities to help us personalize your feed.</p>
              <Link href="/communities">
                <Button variant="outline" size="sm" className="gap-2">
                  Browse Communities <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}

export function RecommendedCommunitiesWidget() {
  const { recommendedCommunities } = useRecommendationStore();

  if (recommendedCommunities.length === 0) return null;

  return (
    <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-border bg-gradient-to-r from-primary/5 to-transparent flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="font-bold text-sm">Suggested Communities</h3>
      </div>
      <div className="p-2 space-y-1">
        {recommendedCommunities.slice(0, 4).map((c) => (
          <Link key={c.id} href={`/r/${c.slug}`}>
            <motion.div 
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">r/{c.slug}</p>
                <p className="text-[10px] text-muted-foreground">{c.memberCount.toLocaleString()} members</p>
              </div>
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs font-bold text-primary hover:bg-primary/10">
                Join
              </Button>
            </motion.div>
          </Link>
        ))}
      </div>
      <Link href="/communities">
        <div className="px-4 py-2 text-xs font-bold text-muted-foreground hover:text-primary hover:bg-muted border-t border-border text-center cursor-pointer transition-colors">
          View all communities
        </div>
      </Link>
    </div>
  );
}
