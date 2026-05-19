import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, FileText, MessageSquare, Flag,
  BarChart3, Settings, Shield, ChevronLeft, ChevronRight,
  Globe, Bot, ScrollText, Menu, X, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/posts", icon: FileText, label: "Posts" },
  { href: "/admin/comments", icon: MessageSquare, label: "Comments" },
  { href: "/admin/communities", icon: Globe, label: "Communities" },
  { href: "/admin/reports", icon: Flag, label: "Reports" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/moderation", icon: Bot, label: "AI Moderation" },
  { href: "/admin/logs", icon: ScrollText, label: "Activity Logs" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const isMobile = useIsMobile();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return location === href;
    return location.startsWith(href) && (href !== "/admin" || location === "/admin");
  };

  const sidebar = (
    <motion.aside
      initial={false}
      animate={{ width: collapsed && !isMobile ? 72 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`
        h-full flex flex-col border-r border-border
        bg-gradient-to-b from-card to-background
        ${isMobile ? "fixed inset-y-0 left-0 z-50 shadow-2xl" : "relative"}
      `}
    >
      {/* Header */}
      <div className="h-16 flex items-center px-4 border-b border-border gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <h1 className="font-bold text-sm gradient-text">Admin Panel</h1>
                <p className="text-[10px] text-muted-foreground">Enterprise Control</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setMobileOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map(({ href, icon: Icon, label, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link key={href} href={href} onClick={() => isMobile && setMobileOpen(false)}>
              <motion.div
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                  ${active
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }
                `}
              >
                <Icon className={`w-[18px] h-[18px] shrink-0 ${active ? "text-primary" : ""}`} />
                <AnimatePresence>
                  {(!collapsed || isMobile) && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium overflow-hidden whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && !collapsed && (
                  <motion.div
                    layoutId="admin-nav-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Collapse button */}
      {!isMobile && (
        <div className="p-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(c => !c)}
            className="w-full justify-center gap-2 text-xs text-muted-foreground"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            {!collapsed && "Collapse"}
          </Button>
        </div>
      )}
    </motion.aside>
  );

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden -mx-4 -mt-4 lg:-mx-6 lg:-mt-6">
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      {isMobile ? (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50"
            >
              {sidebar}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        sidebar
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        {isMobile && (
          <div className="sticky top-0 z-30 flex items-center gap-3 px-4 h-12 bg-background/80 backdrop-blur-md border-b border-border">
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
              <Menu className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">Admin Panel</span>
            </div>
          </div>
        )}
        <div className="p-4 lg:p-6 max-w-[1400px]">
          {children}
        </div>
      </main>
    </div>
  );
}
