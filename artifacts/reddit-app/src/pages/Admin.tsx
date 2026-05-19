import { Link } from "wouter";
import { useAdminStats, useRealtimeMetrics } from "@/hooks/useAdminApi";
import { AdminLayout } from "@/components/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import {
  Shield, Users, FileText, AlertTriangle, TrendingUp, MessageSquare,
  Activity, ThumbsUp, Globe, Bot, ArrowUpRight, ArrowDownRight, Zap
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["hsl(16,100%,55%)", "hsl(200,98%,45%)", "hsl(142,71%,45%)", "hsl(262,83%,58%)", "hsl(0,84%,60%)"];

function StatCard({ label, value, icon: Icon, color, trend, loading }: {
  label: string; value?: number; icon: any; color: string;
  trend?: { value: number; label: string }; loading?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-card-border rounded-xl p-4 card-hover-glow"
    >
      {loading ? <Skeleton className="h-16 w-full" /> : (
        <>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color} bg-opacity-10`}
                 style={{ backgroundColor: `${color.replace("text-", "").includes("primary") ? "hsl(var(--primary)/0.1)" : ""}` }}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            {trend && (
              <div className={`flex items-center gap-0.5 text-xs font-medium ${trend.value >= 0 ? "text-green-500" : "text-red-500"}`}>
                {trend.value >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(trend.value)}%
              </div>
            )}
          </div>
          <p className="text-2xl font-bold tracking-tight">{(value ?? 0).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">{label}</p>
        </>
      )}
    </motion.div>
  );
}

function RealtimeCard({ metrics, loading }: { metrics: any; loading: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-card-border rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="relative">
          <Zap className="w-5 h-5 text-primary" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        <h3 className="font-semibold text-sm">Live Activity</h3>
        <span className="text-[10px] text-muted-foreground ml-auto">Auto-refreshing</span>
      </div>
      {loading ? <Skeleton className="h-20 w-full" /> : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Active Now", value: metrics?.activeNow || 0, icon: Activity, color: "text-green-500" },
            { label: "Posts/hr", value: metrics?.postsLastHour || 0, icon: FileText, color: "text-blue-500" },
            { label: "Comments/hr", value: metrics?.commentsLastHour || 0, icon: MessageSquare, color: "text-purple-500" },
            { label: "Votes/hr", value: metrics?.votesLastHour || 0, icon: ThumbsUp, color: "text-orange-500" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="text-center p-2 rounded-lg bg-muted/30">
              <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
              <p className="text-lg font-bold">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();
  const { data: realtime, isLoading: realtimeLoading } = useRealtimeMetrics();

  const statCards = [
    { label: "Total Users", value: stats?.totalUsers, icon: Users, color: "text-blue-500", trend: stats?.newUsersWeek ? { value: Math.round((stats.newUsersWeek / Math.max(stats.totalUsers - stats.newUsersWeek, 1)) * 100), label: "this week" } : undefined },
    { label: "Total Posts", value: stats?.totalPosts, icon: FileText, color: "text-green-500", trend: stats?.newPostsWeek ? { value: Math.round((stats.newPostsWeek / Math.max(stats.totalPosts - stats.newPostsWeek, 1)) * 100), label: "this week" } : undefined },
    { label: "Comments", value: stats?.totalComments, icon: MessageSquare, color: "text-purple-500" },
    { label: "Communities", value: stats?.totalCommunities, icon: Globe, color: "text-cyan-500" },
    { label: "Total Votes", value: stats?.totalVotes, icon: ThumbsUp, color: "text-amber-500" },
    { label: "Pending Reports", value: stats?.pendingReports, icon: AlertTriangle, color: "text-destructive" },
    { label: "Active Users (7d)", value: stats?.activeUsers, icon: Activity, color: "text-teal-500" },
    { label: "Engagement Rate", value: stats?.engagementRate, icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" /> Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Platform overview and realtime metrics</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statCards.map(card => (
            <StatCard key={card.label} {...card} loading={isLoading} />
          ))}
        </div>

        {/* Realtime Metrics */}
        <RealtimeCard metrics={realtime} loading={realtimeLoading} />

        {/* Daily Activity Chart */}
        {stats?.dailyStats && stats.dailyStats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-card-border rounded-xl p-6"
          >
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Daily Activity <span className="text-xs text-muted-foreground">(last 30 days)</span>
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={stats.dailyStats}>
                <defs>
                  <linearGradient id="gradPosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(16,100%,55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(16,100%,55%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradComments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(200,98%,45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(200,98%,45%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142,71%,45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142,71%,45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 10 }}
                  tickFormatter={(v) => new Date(v + "T00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" })} />
                <YAxis className="text-xs" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }}
                  labelFormatter={(v) => new Date(v + "T00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                />
                <Area type="monotone" dataKey="posts" stroke="hsl(16,100%,55%)" fill="url(#gradPosts)" strokeWidth={2} name="Posts" />
                <Area type="monotone" dataKey="comments" stroke="hsl(200,98%,45%)" fill="url(#gradComments)" strokeWidth={2} name="Comments" />
                <Area type="monotone" dataKey="users" stroke="hsl(142,71%,45%)" fill="url(#gradUsers)" strokeWidth={2} name="New Users" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: "/admin/users", label: "Manage Users", icon: Users, desc: "Ban, mute, change roles", color: "from-blue-500/10 to-blue-600/5" },
            { href: "/admin/posts", label: "Manage Posts", icon: FileText, desc: "Moderate & feature content", color: "from-green-500/10 to-green-600/5" },
            { href: "/admin/reports", label: "Review Reports", icon: AlertTriangle, desc: `${stats?.pendingReports || 0} pending`, color: "from-red-500/10 to-red-600/5" },
            { href: "/admin/moderation", label: "AI Moderation", icon: Bot, desc: "Auto-flagged content", color: "from-purple-500/10 to-purple-600/5" },
          ].map(({ href, label, icon: Icon, desc, color }) => (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                className={`bg-gradient-to-br ${color} border border-card-border rounded-xl p-5 cursor-pointer card-hover-glow`}
              >
                <Icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-semibold text-sm">{label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
