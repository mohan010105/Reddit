import { Link, useLocation } from "wouter";
import { Bell, Home, Compass, BookmarkIcon, Settings, Shield, Sun, Moon, LogOut, Plus, Search, Menu, X, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useGetMe, useListNotifications, useGetTrending } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreatePostModal } from "@/components/CreatePostModal";
import { CreateCommunityModal } from "@/components/CreateCommunityModal";

interface LayoutProps { children: React.ReactNode }

export function Layout({ children }: LayoutProps) {
  const { session, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [createCommunityOpen, setCreateCommunityOpen] = useState(false);

  const { data: me } = useGetMe({ query: { enabled: !!session } });
  const { data: notifications } = useListNotifications(
    { unreadOnly: true, limit: 1 },
    { query: { enabled: !!session } }
  );
  const { data: trending } = useGetTrending();

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
      { href: "/notifications", label: "Notifications", icon: Bell },
      { href: "/settings", label: "Settings", icon: Settings },
      ...(me?.role === "admin" ? [{ href: "/admin", label: "Admin", icon: Shield }] : []),
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary shrink-0">
            <TrendingUp className="w-5 h-5" />
            <span className="hidden sm:block">Threadit</span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                data-testid="input-search"
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Threadit..."
                className="w-full pl-9 pr-4 py-1.5 text-sm bg-muted rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </form>

          <div className="flex items-center gap-1 ml-auto">
            <Button variant="ghost" size="icon" onClick={toggleTheme} data-testid="button-theme-toggle">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {session ? (
              <>
                <Link href="/notifications">
                  <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Button>
                </Link>
                <Button
                  onClick={() => setCreatePostOpen(true)}
                  size="sm"
                  className="hidden sm:flex gap-1"
                  data-testid="button-create-post"
                >
                  <Plus className="w-4 h-4" /> Post
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" data-testid="button-user-menu">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={me?.avatarUrl ?? undefined} />
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {me?.username?.[0]?.toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
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
        <aside className="hidden lg:flex flex-col w-56 shrink-0 gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <div className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${location === href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"}`}>
                <Icon className="w-4 h-4" />
                {label}
                {label === "Notifications" && unreadCount > 0 && (
                  <Badge className="ml-auto h-5 px-1.5 text-xs">{unreadCount}</Badge>
                )}
              </div>
            </Link>
          ))}
          {session && (
            <>
              <div className="my-2 border-t border-border" />
              <button
                onClick={() => setCreateCommunityOpen(true)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                data-testid="button-create-community"
              >
                <Plus className="w-4 h-4" /> Create Community
              </button>
            </>
          )}
        </aside>

        {/* Main Feed */}
        <main className="flex-1 min-w-0">{children}</main>

        {/* Right Sidebar */}
        <aside className="hidden xl:flex flex-col w-72 shrink-0 gap-4">
          {trending?.trendingCommunities && trending.trendingCommunities.length > 0 && (
            <div className="bg-card border border-card-border rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Trending Communities
              </h3>
              <div className="flex flex-col gap-2">
                {trending.trendingCommunities.slice(0, 5).map((c, i) => (
                  <Link key={c.id} href={`/r/${c.slug}`}>
                    <div className="flex items-center gap-3 hover:bg-muted rounded-lg p-1.5 transition-colors">
                      <span className="text-muted-foreground text-xs w-4 text-right">{i + 1}</span>
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={c.iconUrl ?? undefined} />
                        <AvatarFallback className="text-xs bg-primary/20 text-primary">{c.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">r/{c.slug}</p>
                        <p className="text-xs text-muted-foreground">{c.memberCount.toLocaleString()} members</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!session && (
            <div className="bg-card border border-card-border rounded-xl p-4">
              <h3 className="font-semibold mb-2">Join Threadit</h3>
              <p className="text-sm text-muted-foreground mb-3">Become part of the conversation — vote, comment, and create communities.</p>
              <div className="flex flex-col gap-2">
                <Link href="/register"><Button className="w-full" size="sm">Get Started</Button></Link>
                <Link href="/login"><Button variant="outline" className="w-full" size="sm">Log In</Button></Link>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 flex">
        {[
          { href: "/", icon: Home, label: "Home" },
          { href: "/communities", icon: Compass, label: "Explore" },
          ...(session ? [
            { href: "/notifications", icon: Bell, label: "Alerts", badge: unreadCount },
            { href: `/u/${me?.username ?? ""}`, icon: Avatar as any, label: "Profile" },
          ] : [
            { href: "/login", icon: LogOut, label: "Login" },
          ]),
        ].map(({ href, icon: Icon, label, badge }) => (
          <Link key={href} href={href} className="flex-1">
            <div className={`flex flex-col items-center py-2 text-xs gap-1 transition-colors
              ${location === href ? "text-primary" : "text-muted-foreground"}`}>
              <div className="relative">
                {typeof Icon === "function" ? <Icon className="w-5 h-5" /> : null}
                {badge && badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              <span>{label}</span>
            </div>
          </Link>
        ))}
        {session && (
          <button className="flex-1" onClick={() => setCreatePostOpen(true)}>
            <div className="flex flex-col items-center py-2 text-xs gap-1 text-muted-foreground">
              <Plus className="w-5 h-5" />
              <span>Post</span>
            </div>
          </button>
        )}
      </nav>

      <div className="lg:hidden h-16" />

      <CreatePostModal open={createPostOpen} onClose={() => setCreatePostOpen(false)} />
      <CreateCommunityModal open={createCommunityOpen} onClose={() => setCreateCommunityOpen(false)} />
    </div>
  );
}
