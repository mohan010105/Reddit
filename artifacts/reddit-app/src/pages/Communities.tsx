import { useState } from "react";
import { Link } from "wouter";
import { useListCommunities } from "@workspace/api-client-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Plus, Search, TrendingUp, Sparkles, AlignLeft } from "lucide-react";
import { CreateCommunityModal } from "@/components/CreateCommunityModal";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Communities() {
  const { session } = useAuth();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"popular" | "new" | "alphabetical">("popular");
  const [createOpen, setCreateOpen] = useState(false);

  const { data, isLoading } = useListCommunities({ q: search || undefined, sort, limit: 50 });

  const sortIcons = { popular: TrendingUp, new: Sparkles, alphabetical: AlignLeft };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold flex items-center gap-2"
        >
          <Users className="w-5 h-5 text-primary" /> Communities
        </motion.h1>
        {session && (
          <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}>
            <Button size="sm" onClick={() => setCreateOpen(true)} className="gap-1.5" data-testid="button-new-community">
              <Plus className="w-3.5 h-3.5" /> New Community
            </Button>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-card border border-card-border rounded-xl p-4 flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            className="pl-9 h-9"
            placeholder="Search communities..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            data-testid="input-search-communities"
          />
        </div>
        <Tabs value={sort} onValueChange={v => setSort(v as any)}>
          <TabsList className="bg-transparent p-0 gap-1">
            {(["popular", "new", "alphabetical"] as const).map(s => {
              const Icon = sortIcons[s];
              return (
                <TabsTrigger key={s} value={s} className="gap-1.5 text-sm capitalize">
                  <Icon className="w-3.5 h-3.5" />
                  {s === "alphabetical" ? "A–Z" : s}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeletons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </motion.div>
        ) : data?.data.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-card-border rounded-xl p-14 text-center col-span-2"
          >
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold mb-1">No communities found</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {search ? `No results for "${search}"` : "Be the first to create a community."}
            </p>
            {session && (
              <Button size="sm" onClick={() => setCreateOpen(true)} className="gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Create Community
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`grid-${sort}-${search}`}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {data?.data.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.3 }}
              >
                <Link href={`/r/${c.slug}`}>
                  <div
                    className="bg-card border border-card-border rounded-xl p-4 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 h-full cursor-pointer group"
                    data-testid={`card-community-${c.id}`}
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="relative shrink-0">
                        <Avatar className="w-11 h-11 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                          <AvatarImage src={c.iconUrl ?? undefined} />
                          <AvatarFallback className="text-base font-bold bg-gradient-to-br from-primary/30 to-primary/10 text-primary">
                            {c.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold group-hover:text-primary transition-colors truncate">r/{c.slug}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Users className="w-3 h-3" />
                          {c.memberCount.toLocaleString()} members
                        </p>
                      </div>
                      {c.isJoined && (
                        <span className="shrink-0 text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full">
                          Joined
                        </span>
                      )}
                    </div>
                    {c.description ? (
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{c.description}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground/50 italic">No description yet.</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <CreateCommunityModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
