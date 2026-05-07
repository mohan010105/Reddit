import { useListSavedPosts } from "@workspace/api-client-react";
import { PostCard } from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SavedPosts() {
  const { data, isLoading } = useListSavedPosts({ limit: 20 });

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <Bookmark className="w-5 h-5 text-primary" /> Saved Posts
      </h1>

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
          ) : data?.data.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-card-border rounded-xl p-14 text-center"
            >
              <Bookmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold mb-1">Nothing saved yet</h3>
              <p className="text-muted-foreground text-sm">Posts you save will appear here.</p>
            </motion.div>
          ) : (
            <motion.div key="posts" className="flex flex-col gap-3">
              {data?.data.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
