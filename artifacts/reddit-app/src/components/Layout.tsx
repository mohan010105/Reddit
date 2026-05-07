import { Link, useLocation } from "wouter";
import { Bell, Home, Compass, BookmarkIcon, Settings, Shield, Sun, Moon, LogOut, Plus, Search, TrendingUp, Flame, Users } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useGetMe, useListNotifications, useGetTrending, useListCommunities } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreatePostModal } from "@/components/CreatePostModal";
import { CreateCommunityModal } from "@/components/CreateCommunityModal";
import { useRealtimeNotifications } from "@/hooks/useRealtimeNotifications";

interface LayoutProps { children: React.ReactNode }

export function Layout({ children }: LayoutProps) {
  const { session, supabaseUser, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [createCommunityOpen, setCreateCommunityOpen] = useState(false);

  const { data: me } = useGetMe({ query: { enabled: !!session } });
  const { data: notifications } = useListNotifications(
    { unreadOnly: true, limit: 1 },
    { query: { enabled: !!session } }
  );
  const { data: trending } = useGetTrending();
  const { data: communitiesData } = useListCommunities(
    { limit: 6, sort: "popular" },
    { query: { enabled: !!session } }
  );

  // Real-time notification updates
  useRealtimeNotifications(supabaseUser?.id);

  const unreadCount = notifications?.unreadCount ?? 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/communities", label: "Communities", icon: Compass },
    ...(session ? [
      { href: "/saved", label: "Saved", icon: BookmarkIcon },
      { href: "/notifications", label: "Notifications", icon: Bell, badge: unreadCount },
      { href: "/settings", label: "Settings", icon: Settings },
      ...(me?.role === "admin" ? [{ href: "/admin", label: "Admin", icon: Shield }] : []),
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary shrink-0 select-none">
            <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
              <TrendingUp className="w-5 h-5" />
            </motion.div>
            <span className="hidden sm:block tracking-tight">Threadit</span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                data-testid="input-search"
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Threadit..."
                className="w-full pl-9 pr-4 py-1.5 text-sm bg-muted rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
              />
            </div>
          </form>

          <div className="flex items-center gap-1 ml-auto">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="shrink-0" data-testid="button-theme-toggle">
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {session ? (
              <>
                <Link href="/notifications">
                  <Button variant="ghost" size="icon" className="relative shrink-0" data-testid="button-notifications">
                    <Bell className="w-4 h-4" />
                    <AnimatePresence>
                      {unreadCount > 0 && (
                        <motion.span
                          key="badge"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"
                        />
                      )}
                    </AnimatePresence>
                  </Button>
                </Link>
                <Button
                  onClick={() => setCreatePostOpen(true)}
                  size="sm"
                  className="hidden sm:flex gap-1.5 font-medium"
                  data-testid="button-create-post"
                >
                  <Plus className="w-4 h-4" /> Post
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="shrink-0" data-testid="button-user-menu">
                      <Avatar className="w-7 h-7 ring-2 ring-primary/20">
                        <AvatarImage src={me?.avatarUrl ?? undefined} />
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground font-semibold">
                          {me?.username?.[0]?.toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <div className="px-2 py-1.5 text-xs text-muted-foreground border-b border-border mb-1">
                      <p className="font-medium text-foreground">u/{me?.username}</p>
                      <p>{(me?.karma ?? 0).toLocaleString()} karma</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href={`/u/${me?.username}`}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    {me?.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="text-destructive" data-testid="button-sign-out">
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" data-testid="button-login">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" data-testid="button-register">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 gap-0.5">
          {navLinks.map(({ href, label, icon: Icon, badge }) => (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                  ${location === href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {badge !== undefined && badge > 0 && (
                  <motion.div
                    key={badge}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="ml-auto"
                  >
                    <Badge className="h-5 px-1.5 text-xs min-w-[20px] justify-center">{badge > 99 ? "99+" : badge}</Badge>
                  </motion.div>
                )}
              </motion.div>
            </Link>
          ))}

          {session && (
            <>
              <div className="my-2 border-t border-border" />
              <button
                onClick={() => setCreateCommunityOpen(true)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left w-full"
                data-testid="button-create-community"
              >
                <Plus className="w-4 h-4 shrink-0" /> Create Community
              </button>

              {communitiesData && communitiesData.data.length > 0 && (
                <>
                  <div className="mt-3 mb-1 px-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-3 h-3" /> Top Communities
                    </p>
                  </div>
                  {communitiesData.data.slice(0, 5).map(c => (
                    <Link key={c.id} href={`/r/${c.slug}`}>
                      <motion.div
                        whileHover={{ x: 2 }}
                        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer
                          ${location === `/r/${c.slug}` ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-muted hover:text-foreground"}`}
                      >
                        <Avatar className="w-5 h-5 shrink-0">
                          <AvatarFallback className="text-[9px] bg-primary/20 text-primary font-bold">{c.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="truncate">r/{c.slug}</span>
                      </motion.div>
                    </Link>
                  ))}
                </>
              )}
            </>
          )}
        </aside>

        {/* Main Feed */}
        <main className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:flex flex-col w-72 shrink-0 gap-4">
          {trending?.trendingCommunities && trending.trendingCommunities.length > 0 && (
            <div className="bg-card border border-card-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-transparent border-b border-border">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Trending Communities
                </h3>
              </div>
              <div className="p-2 flex flex-col gap-0.5">
                {trending.trendingCommunities.slice(0, 5).map((c, i) => (
                  <Link key={c.id} href={`/r/${c.slug}`}>
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-3 hover:bg-muted rounded-lg p-2 transition-colors cursor-pointer"
                    >
                      <span className="text-muted-foreground text-xs font-bold w-4 text-center shrink-0">#{i + 1}</span>
                      <Avatar className="w-7 h-7 shrink-0">
                        <AvatarImage src={c.iconUrl ?? undefined} />
                        <AvatarFallback className="text-xs font-bold bg-primary/20 text-primary">{c.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">r/{c.slug}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />{c.memberCount.toLocaleString()} members
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!session ? (
            <div className="bg-card border border-card-border rounded-xl overflow-hidden">
              <div className="h-16 bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="p-4 -mt-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border-4 border-card flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Join Threadit</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Become part of the conversation — vote, comment, and create communities.
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/register"><Button className="w-full" size="sm">Get Started</Button></Link>
                  <Link href="/login"><Button variant="outline" className="w-full" size="sm">Log In</Button></Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-card-border rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" /> Create
              </h3>
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full justify-start gap-2"
                  size="sm"
                  variant="outline"
                  onClick={() => setCreatePostOpen(true)}
                >
                  <Plus className="w-3.5 h-3.5" /> Create Post
                </Button>
                <Button
                  className="w-full justify-start gap-2"
                  size="sm"
                  variant="outline"
                  onClick={() => setCreateCommunityOpen(true)}
                >
                  <Users className="w-3.5 h-3.5" /> Create Community
                </Button>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border z-40">
        <div className="flex">
          {[
            { href: "/", icon: Home, label: "Home" },
            { href: "/communities", icon: Compass, label: "Explore" },
            ...(session ? [
              { href: "/notifications", icon: Bell, label: "Alerts", badge: unreadCount },
              { href: `/u/${me?.username ?? ""}`, icon: null as any, label: "Profile", avatar: me?.avatarUrl, avatarFallback: me?.username?.[0]?.toUpperCase() ?? "U" },
            ] : [
              { href: "/login", icon: LogOut, label: "Login" },
            ]),
          ].map(({ href, icon: Icon, label, badge, avatar, avatarFallback }) => (
            <Link key={href} href={href} className="flex-1">
              <div className={`flex flex-col items-center py-2.5 text-xs gap-1 transition-colors
                ${location === href ? "text-primary" : "text-muted-foreground"}`}>
                <div className="relative">
                  {avatarFallback ? (
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={avatar} />
                      <AvatarFallback className="text-[9px] bg-primary/20 text-primary">{avatarFallback}</AvatarFallback>
                    </Avatar>
                  ) : Icon ? (
                    <Icon className="w-5 h-5" />
                  ) : null}
                  {badge !== undefined && badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
                <span className="leading-none">{label}</span>
              </div>
            </Link>
          ))}
          {session && (
            <button className="flex-1" onClick={() => setCreatePostOpen(true)}>
              <div className="flex flex-col items-center py-2.5 text-xs gap-1 text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Plus className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <span className="leading-none">Post</span>
              </div>
            </button>
          )}
        </div>
      </nav>

      <div className="lg:hidden h-16" />

      <CreatePostModal open={createPostOpen} onClose={() => setCreatePostOpen(false)} />
      <CreateCommunityModal open={createCommunityOpen} onClose={() => setCreateCommunityOpen(false)} />
    </div>
  );
}
