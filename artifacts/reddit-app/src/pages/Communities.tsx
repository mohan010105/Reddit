import { useState } from "react";
import { Link } from "wouter";
import { useListCommunities } from "@workspace/api-client-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Plus, Search } from "lucide-react";
import { CreateCommunityModal } from "@/components/CreateCommunityModal";
import { useAuth } from "@/contexts/AuthContext";

export default function Communities() {
  const { session } = useAuth();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"popular" | "new" | "alphabetical">("popular");
  const [createOpen, setCreateOpen] = useState(false);

  const { data, isLoading } = useListCommunities({ q: search || undefined, sort, limit: 50 });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Communities</h1>
        {session && (
          <Button size="sm" onClick={() => setCreateOpen(true)} className="gap-1" data-testid="button-new-community">
            <Plus className="w-3.5 h-3.5" /> New Community
          </Button>
        )}
      </div>

      <div className="bg-card border border-card-border rounded-xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search communities..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            data-testid="input-search-communities"
          />
        </div>
        <Tabs value={sort} onValueChange={v => setSort(v as any)}>
          <TabsList className="bg-transparent p-0 gap-1">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="alphabetical">A-Z</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)
        ) : data?.data.map(c => (
          <Link key={c.id} href={`/r/${c.slug}`}>
            <div className="bg-card border border-card-border rounded-xl p-4 hover:border-primary/30 transition-colors h-full" data-testid={`card-community-${c.id}`}>
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={c.iconUrl ?? undefined} />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold">{c.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">r/{c.slug}</p>
                  <p className="text-xs text-muted-foreground">{c.memberCount.toLocaleString()} members</p>
                </div>
                {c.isJoined && <span className="ml-auto text-xs text-primary font-medium">Joined</span>}
              </div>
              {c.description && <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>}
            </div>
          </Link>
        ))}
      </div>

      <CreateCommunityModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
