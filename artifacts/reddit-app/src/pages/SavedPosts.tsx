import { useListSavedPosts } from "@workspace/api-client-react";
import { PostCard } from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, Folder, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function SavedPosts() {
  const { session } = useAuth();
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  
  const { data: collections } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await fetch("/api/saved/collections", {
        headers: { "Authorization": `Bearer ${session?.access_token}` }
      });
      return res.json() as Promise<any[]>;
    },
    enabled: !!session,
  });

  const { data, isLoading } = useListSavedPosts({ limit: 20 });
  
  const filteredPosts = selectedCollectionId 
    ? data?.data.filter(p => (p as any).collectionId === selectedCollectionId)
    : data?.data;

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-primary" /> Saved Posts
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Collections Sidebar */}
        <div className="w-full md:w-56 shrink-0 space-y-4">
          <div className="bg-card border border-card-border rounded-xl p-2">
            <h3 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" /> Collections
            </h3>
            <div className="flex flex-col gap-0.5 mt-1">
              <Button
                variant={selectedCollectionId === null ? "secondary" : "ghost"}
                size="sm"
                className="justify-start gap-2.5 h-9"
                onClick={() => setSelectedCollectionId(null)}
              >
                <Bookmark className="w-4 h-4 opacity-70" />
                All Saved
              </Button>
              {collections?.map(c => (
                <Button
                  key={c.id}
                  variant={selectedCollectionId === c.id ? "secondary" : "ghost"}
                  size="sm"
                  className="justify-start gap-2.5 h-9"
                  onClick={() => setSelectedCollectionId(c.id)}
                >
                  <Folder className="w-4 h-4 text-primary opacity-80" />
                  <span className="truncate">{c.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div key="skeletons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-card border border-card-border rounded-xl p-4 flex gap-3">
                      <Skeleton className="w-10 h-24 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-2.5">
                        <Skeleton className="h-3 w-1/4" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : filteredPosts?.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-card-border rounded-xl p-14 text-center"
                >
                  <Bookmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-semibold mb-1">Nothing found</h3>
                  <p className="text-muted-foreground text-sm">No posts in this collection yet.</p>
                </motion.div>
              ) : (
                <motion.div key="posts" className="flex flex-col gap-3">
                  {filteredPosts?.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
