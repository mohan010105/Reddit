import { useState } from "react";
import { useSearch } from "@workspace/api-client-react";
import { PostCard } from "@/components/PostCard";
import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, Users, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useSearchStore } from "@/store/searchStore";

export default function Search() {
  const q = new URLSearchParams(window.location.search).get("q") ?? "";
  const [type, setType] = useState<"all" | "posts" | "communities" | "users">("all");
  const recentQueries = useSearchStore(state => state.recentQueries);
  const clearRecent = useSearchStore(state => state.clearRecent);

  const { data, isLoading } = useSearch({ q, type, limit: 20 }, { query: { enabled: !!q, queryKey: ['search', { q, type, limit: 20 }] } });

  if (!q) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
          <SearchIcon className="w-12 h-12 opacity-20" />
          <p className="font-medium">Search Threadit</p>
          <p className="text-sm opacity-70">Find posts, communities, and people</p>
        </div>

        {recentQueries.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recent Searches</h3>
              <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs" onClick={clearRecent}>Clear All</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentQueries.map(rq => (
                <Link key={rq} href={`/search?q=${encodeURIComponent(rq)}`}>
                  <Button variant="secondary" size="sm" className="rounded-full h-8 text-xs">{rq}</Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <SearchIcon className="w-5 h-5 text-primary shrink-0" />
        <h1 className="text-xl font-bold">Results for "{q}"</h1>
        {data && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-muted-foreground text-sm"
          >
            ({data.total} results)
          </motion.span>
        )}
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

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="skeletons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
          </motion.div>
        ) : (
          <motion.div
            key={`results-${type}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
          >
            {(type === "all" || type === "posts") && data?.posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}

            {(type === "all" || type === "communities") && data?.communities.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/r/${c.slug}`}>
                  <div className="bg-card border border-card-border rounded-xl p-4 hover:border-primary/40 hover:shadow-sm transition-all flex items-center gap-4 cursor-pointer">
                    <Avatar className="w-12 h-12 shrink-0">
                      <AvatarImage src={c.iconUrl ?? undefined} />
                      <AvatarFallback className="text-lg font-bold bg-primary/20 text-primary">{c.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base">r/{c.slug}</p>
                      <p className="text-sm text-muted-foreground">{c.description ?? "No description"}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Users className="w-3 h-3" /> {c.memberCount.toLocaleString()} members
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {(type === "all" || type === "users") && data?.users.map((u, i) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/u/${u.username}`}>
                  <div className="bg-card border border-card-border rounded-xl p-4 hover:border-primary/40 hover:shadow-sm transition-all flex items-center gap-4 cursor-pointer">
                    <Avatar className="w-12 h-12 shrink-0">
                      <AvatarImage src={u.avatarUrl ?? undefined} />
                      <AvatarFallback className="text-lg font-bold bg-primary/20 text-primary">{u.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base">u/{u.username}</p>
                      {u.bio && <p className="text-sm text-muted-foreground truncate">{u.bio}</p>}
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Trophy className="w-3 h-3" /> {u.karma.toLocaleString()} karma
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {data && data.total === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-card-border rounded-xl p-14 text-center"
              >
                <SearchIcon className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-medium mb-1">No results found</p>
                <p className="text-muted-foreground text-sm">Nothing matched "{q}" — try a different search.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
