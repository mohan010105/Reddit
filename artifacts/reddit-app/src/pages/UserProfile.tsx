import { useParams } from "wouter";
import { useGetUserByUsername, useGetUserPosts, useFollowUser, useUnfollowUser, getGetUserByUsernameQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Trophy, MessageSquare, Users, UserPlus, UserMinus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export default function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();

  const { data: profile, isLoading: profileLoading } = useGetUserByUsername(username!);
  const { data: posts, isLoading: postsLoading } = useGetUserPosts(username!, { page: 1, limit: 10 });

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
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );

  if (!profile) return <div className="text-center py-20 text-muted-foreground">User not found</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-card border border-card-border rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile.avatarUrl ?? undefined} />
            <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
              {profile.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">u/{profile.username}</h1>
            </div>
            {profile.bio && <p className="text-muted-foreground text-sm mb-3">{profile.bio}</p>}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-primary" /> {profile.karma.toLocaleString()} karma</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {profile.postCount} posts</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {profile.followerCount} followers</span>
              <span className="text-xs">Joined {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}</span>
            </div>
            {session && (
              <Button size="sm" variant={profile.isFollowedByMe ? "outline" : "default"} onClick={handleFollow} className="gap-1" data-testid="button-follow-user">
                {profile.isFollowedByMe ? <><UserMinus className="w-3.5 h-3.5" /> Unfollow</> : <><UserPlus className="w-3.5 h-3.5" /> Follow</>}
              </Button>
            )}
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-lg px-1">Posts</h2>
      <div className="flex flex-col gap-3">
        {postsLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)
        ) : posts?.data.length === 0 ? (
          <div className="bg-card border border-card-border rounded-xl p-8 text-center text-muted-foreground text-sm">No posts yet</div>
        ) : (
          posts?.data.map(post => <PostCard key={post.id} post={post} compact />)
        )}
      </div>
    </div>
  );
}
