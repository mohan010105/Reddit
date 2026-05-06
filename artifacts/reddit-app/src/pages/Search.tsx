import { useEffect, useState } from "react";
import { useSearch } from "@workspace/api-client-react";
import { PostCard } from "@/components/PostCard";
import { Link, useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, Users } from "lucide-react";

export default function Search() {
  const [location] = useLocation();
  const q = new URLSearchParams(window.location.search).get("q") ?? "";
  const [type, setType] = useState<"all" | "posts" | "communities" | "users">("all");

  const { data, isLoading } = useSearch({ q, type, limit: 20 }, { query: { enabled: !!q } });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <SearchIcon className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-bold">Results for "{q}"</h1>
        {data && <span className="text-muted-foreground text-sm">({data.total} results)</span>}
      </div>

      <div className="bg-card border border-card-border rounded-xl p-3">
        <Tabs value={type} onValueChange={v => setType(v as any)}>
          <TabsList className="bg-transparent p-0 gap-1">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)
      ) : (
        <div className="flex flex-col gap-4">
          {(type === "all" || type === "posts") && data?.posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}

          {(type === "all" || type === "communities") && data?.communities.map(c => (
            <Link key={c.id} href={`/r/${c.slug}`}>
              <div className="bg-card border border-card-border rounded-xl p-4 hover:border-primary/30 transition-colors flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={c.iconUrl ?? undefined} />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold">{c.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">r/{c.slug}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" /> {c.memberCount.toLocaleString()} members</p>
                </div>
              </div>
            </Link>
          ))}

          {(type === "all" || type === "users") && data?.users.map(u => (
            <Link key={u.id} href={`/u/${u.username}`}>
              <div className="bg-card border border-card-border rounded-xl p-4 hover:border-primary/30 transition-colors flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={u.avatarUrl ?? undefined} />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold">{u.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">u/{u.username}</p>
                  <p className="text-sm text-muted-foreground">{u.karma.toLocaleString()} karma</p>
                </div>
              </div>
            </Link>
          ))}

          {data && data.total === 0 && (
            <div className="bg-card border border-card-border rounded-xl p-12 text-center text-muted-foreground text-sm">
              No results found for "{q}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
