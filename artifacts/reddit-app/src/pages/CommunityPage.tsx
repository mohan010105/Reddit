import { useState } from "react";
import { useParams, Link } from "wouter";
import { useGetCommunity, useGetCommunityPosts, useJoinCommunity, useLeaveCommunity, getGetCommunityQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { PostCard } from "@/components/PostCard";
import { CreatePostModal } from "@/components/CreatePostModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Plus, Flame, Sparkles, TrendingUp, ArrowUp } from "lucide-react";
import { toast } from "sonner";

type SortMode = "hot" | "new" | "top" | "rising";

export default function CommunityPage() {
  const { slug } = useParams<{ slug: string }>();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [sort, setSort] = useState<SortMode>("hot");
  const [page, setPage] = useState(1);
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const { data: community, isLoading: communityLoading } = useGetCommunity(slug!);
  const { data: posts, isLoading: postsLoading } = useGetCommunityPosts(slug!, { sort, page, limit: 20 });
  const joinCommunity = useJoinCommunity();
  const leaveCommunity = useLeaveCommunity();

  const handleJoin = () => {
    if (!session) { toast.error("Log in to join"); return; }
    if (community?.isJoined) {
      leaveCommunity.mutate({ slug: slug! }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetCommunityQueryKey(slug!) }),
        onError: () => toast.error("Failed to leave"),
      });
    } else {
      joinCommunity.mutate({ slug: slug! }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetCommunityQueryKey(slug!) }),
        onError: () => toast.error("Failed to join"),
      });
    }
  };

  if (communityLoading) return (
    <div className="space-y-4">
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );

  if (!community) return <div className="text-center py-20 text-muted-foreground">Community not found</div>;

  return (
    <div className="flex flex-col gap-4">
      {/* Banner */}
      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        {community.bannerUrl ? (
          <img src={community.bannerUrl} alt={community.name} className="w-full h-24 object-cover" />
        ) : (
          <div className="w-full h-24 bg-gradient-to-r from-primary/20 to-primary/5" />
        )}
        <div className="p-4 flex items-end gap-4 -mt-6">
          <Avatar className="w-16 h-16 border-4 border-card">
            <AvatarImage src={community.iconUrl ?? undefined} />
            <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">{community.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 pb-1">
            <h1 className="text-xl font-bold leading-tight">r/{community.slug}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {community.memberCount.toLocaleString()} members
            </p>
          </div>
          <div className="flex gap-2 pb-1">
            {session && (
              <Button size="sm" onClick={() => setCreatePostOpen(true)} className="gap-1" data-testid="button-create-post-community">
                <Plus className="w-3.5 h-3.5" /> Post
              </Button>
            )}
            <Button size="sm" variant={community.isJoined ? "outline" : "default"} onClick={handleJoin} data-testid="button-join-community">
              {community.isJoined ? "Joined" : "Join"}
            </Button>
          </div>
        </div>
        {community.description && (
          <p className="px-4 pb-4 text-sm text-muted-foreground">{community.description}</p>
        )}
      </div>

      {/* Sort tabs */}
      <div className="bg-card border border-card-border rounded-xl p-3">
        <Tabs value={sort} onValueChange={v => { setSort(v as SortMode); setPage(1); }}>
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
        {postsLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)
        ) : posts?.data.length === 0 ? (
          <div className="bg-card border border-card-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground">No posts yet. Be the first!</p>
          </div>
        ) : (
          posts?.data.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {posts?.hasMore && (
        <Button variant="outline" onClick={() => setPage(p => p + 1)} className="self-center">Load More</Button>
      )}

      {createPostOpen && community && (
        <CreatePostModal open={createPostOpen} onClose={() => setCreatePostOpen(false)} communityId={community.id} />
      )}
    </div>
  );
}
