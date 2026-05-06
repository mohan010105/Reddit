import { useState } from "react";
import { useListPosts } from "@workspace/api-client-react";
import { PostCard } from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Sparkles, TrendingUp, ArrowUp } from "lucide-react";

type SortMode = "hot" | "new" | "top" | "rising";

export default function Home() {
  const [sort, setSort] = useState<SortMode>("hot");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useListPosts({ sort, page, limit: 20 });

  const sortIcons = { hot: Flame, new: Sparkles, top: TrendingUp, rising: ArrowUp };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-card border border-card-border rounded-xl p-3">
        <Tabs value={sort} onValueChange={v => { setSort(v as SortMode); setPage(1); }}>
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
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-card border border-card-border rounded-xl p-4 flex gap-3">
              <Skeleton className="w-10 h-20 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))
        ) : data?.data.length === 0 ? (
          <div className="bg-card border border-card-border rounded-xl p-12 text-center">
            <TrendingUp className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-1">No posts yet</h3>
            <p className="text-muted-foreground text-sm">Be the first to share something interesting.</p>
          </div>
        ) : (
          data?.data.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {data?.hasMore && (
        <Button variant="outline" onClick={() => setPage(p => p + 1)} className="self-center" data-testid="button-load-more">
          Load More
        </Button>
      )}
    </div>
  );
}
