import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useAnalyticsOverview, useAnalyticsDaily, useAnalyticsUsers, useAnalyticsPosts, useAnalyticsCommunities, useRealtimeMetrics } from "@/hooks/useAdminApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { BarChart3, Users, FileText, Globe, Activity, TrendingUp, Zap, ThumbsUp, MessageSquare, DollarSign, CreditCard, PieChart as PieIcon } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";
import api from "@/lib/api";

const COLORS = ["hsl(16,100%,55%)", "hsl(200,98%,45%)", "hsl(142,71%,45%)", "hsl(262,83%,58%)", "hsl(0,84%,60%)"];

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "10px",
  fontSize: "12px",
};

export default function AdminAnalytics() {
  const [days, setDays] = useState(30);
  const { data: overview, isLoading: overviewLoading } = useAnalyticsOverview();
  const { data: daily, isLoading: dailyLoading } = useAnalyticsDaily(days);
  const { data: userAnalytics, isLoading: usersLoading } = useAnalyticsUsers();
  const { data: postAnalytics, isLoading: postsLoading } = useAnalyticsPosts();
  const { data: communityAnalytics, isLoading: communitiesLoading } = useAnalyticsCommunities();
  const { data: realtime } = useRealtimeMetrics();
  
  const [monetization, setMonetization] = useState<any>(null);
  const [monetizationLoading, setMonetizationLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/monetization/stats")
      .then(({ data }) => setMonetization(data))
      .catch(err => console.error("Failed to fetch admin stats:", err))
      .finally(() => setMonetizationLoading(false));
  }, []);

  const statCards = [
    { label: "Total Revenue", value: `$${(monetization?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: "text-green-500" },
    { label: "MRR", value: `$${(monetization?.mrr || 0).toLocaleString()}`, icon: TrendingUp, color: "text-primary" },
    { label: "Active Subs", value: monetization?.activeSubscriptions || 0, icon: CreditCard, color: "text-blue-500" },
    { label: "Active Now", value: realtime?.activeNow || 0, icon: Zap, color: "text-amber-500" },
    { label: "Total Users", value: overview?.totalUsers, icon: Users, color: "text-blue-400" },
    { label: "Engagement", value: `${overview?.engagementRate || 0}%`, icon: Activity, color: "text-purple-500" },
    { label: "Total Posts", value: overview?.totalPosts, icon: FileText, color: "text-orange-500" },
    { label: "Total Votes", value: overview?.totalVotes, icon: ThumbsUp, color: "text-pink-500" },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Platform Insights
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Real-time performance and financial analytics</p>
          </div>
          <Select value={String(days)} onValueChange={v => setDays(parseInt(v))}>
            <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
              {overviewLoading || monetizationLoading ? <Skeleton className="h-14 w-full" /> : (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
                  </div>
                  <p className="text-xl font-black">{typeof value === "number" ? value.toLocaleString() : value}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Revenue & Growth Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" /> Revenue Growth
            </h2>
            {monetizationLoading ? <Skeleton className="h-64 w-full" /> : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monetization?.revenueHistory || []}>
                  <defs>
                    <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS[2]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS[2]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="amount" stroke={COLORS[2]} fill="url(#gRevenue)" strokeWidth={2} name="Revenue ($)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-primary" /> Plan Distribution
            </h2>
            {monetizationLoading ? <Skeleton className="h-64 w-full" /> : (
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={monetization?.planDistribution || []} dataKey="count" nameKey="plan"
                      cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                      {(monetization?.planDistribution || []).map((_: any, i: number) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-full space-y-2 mt-4">
                  {(monetization?.planDistribution || []).map((r: any, i: number) => (
                    <div key={r.plan} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="capitalize">{r.plan}</span>
                      </div>
                      <span className="font-bold">{r.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Daily Engagement Chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Daily Engagement
          </h2>
          {dailyLoading ? <Skeleton className="h-64 w-full" /> : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={daily || []}>
                <defs>
                  <linearGradient id="gPosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gComments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Area type="monotone" dataKey="posts" stroke={COLORS[0]} fill="url(#gPosts)" strokeWidth={2} name="Posts" />
                <Area type="monotone" dataKey="comments" stroke={COLORS[1]} fill="url(#gComments)" strokeWidth={2} name="Comments" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Communities */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-500" /> Top Communities
            </h2>
            {communitiesLoading ? <Skeleton className="h-48 w-full" /> : (
              <div className="space-y-1">
                {(communityAnalytics?.topCommunities || []).slice(0, 5).map((c: any, i: number) => (
                  <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">r/{c.slug}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold">{c.memberCount?.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">members</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Top Posts */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" /> Top Performing Posts
            </h2>
            {postsLoading ? <Skeleton className="h-48 w-full" /> : (
              <div className="space-y-1">
                {(postAnalytics?.topPosts || []).slice(0, 5).map((p: any, i: number) => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{p.title}</p>
                      <p className="text-[10px] text-muted-foreground">u/{p.author?.username}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold">{p.score}</p>
                      <p className="text-[10px] text-muted-foreground">votes</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
