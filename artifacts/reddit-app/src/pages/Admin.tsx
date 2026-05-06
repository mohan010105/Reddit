import { Link } from "wouter";
import { useGetAdminStats } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Users, FileText, AlertTriangle, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Admin() {
  const { data: stats, isLoading } = useGetAdminStats();

  const statCards = [
    { label: "Total Users", value: stats?.totalUsers, icon: Users, color: "text-blue-500" },
    { label: "Total Posts", value: stats?.totalPosts, icon: FileText, color: "text-green-500" },
    { label: "Communities", value: stats?.totalCommunities, icon: TrendingUp, color: "text-primary" },
    { label: "Pending Reports", value: stats?.pendingReports, icon: AlertTriangle, color: "text-destructive" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Shield className="w-6 h-6 text-primary" /> Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-card-border rounded-xl p-4">
            {isLoading ? <Skeleton className="h-12 w-full" /> : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <p className="text-2xl font-bold">{(value ?? 0).toLocaleString()}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {stats?.dailyStats && stats.dailyStats.length > 0 && (
        <div className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Daily Activity (last 30 days)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stats.dailyStats}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 11 }} />
              <YAxis className="text-xs" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="posts" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.1)" name="Posts" />
              <Area type="monotone" dataKey="comments" stroke="hsl(200 98% 39%)" fill="hsl(200 98% 39% / 0.1)" name="Comments" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: "/admin/users", label: "Manage Users", icon: Users, desc: "Ban, unban, change roles" },
          { href: "/admin/posts", label: "Manage Posts", icon: FileText, desc: "Remove problematic content" },
          { href: "/admin/reports", label: "Review Reports", icon: AlertTriangle, desc: "Resolve user reports" },
        ].map(({ href, label, icon: Icon, desc }) => (
          <Link key={href} href={href}>
            <div className="bg-card border border-card-border rounded-xl p-5 hover:border-primary/40 transition-colors cursor-pointer">
              <Icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold">{label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
