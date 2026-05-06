import { useListSavedPosts } from "@workspace/api-client-react";
import { PostCard } from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark } from "lucide-react";

export default function SavedPosts() {
  const { data, isLoading } = useListSavedPosts({ limit: 20 });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <Bookmark className="w-5 h-5 text-primary" /> Saved Posts
      </h1>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)
        ) : data?.data.length === 0 ? (
          <div className="bg-card border border-card-border rounded-xl p-12 text-center">
            <Bookmark className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" />
            <p className="text-muted-foreground text-sm">No saved posts yet</p>
          </div>
        ) : (
          data?.data.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
