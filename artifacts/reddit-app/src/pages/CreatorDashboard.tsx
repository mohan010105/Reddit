import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, ArrowUpRight, History, Wallet, TrendingUp, Download, Loader2, ExternalLink, Link2, CreditCard, BadgeCheck, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import api from "@/lib/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function CreatorDashboard() {
  const [data, setData] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [earningsRes, analyticsRes, payoutsRes] = await Promise.allSettled([
        api.get("/creator/earnings"),
        api.get("/creator/analytics"),
        api.get("/creator/payouts"),
      ]);

      if (earningsRes.status === "fulfilled") setData(earningsRes.value.data);
      if (analyticsRes.status === "fulfilled") setAnalytics(analyticsRes.value.data);
      if (payoutsRes.status === "fulfilled") setPayouts(payoutsRes.value.data);
    } catch (e) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleConnectRazorpay = async () => {
    try {
      setConnectLoading(true);
      // In a real implementation, this would create a Razorpay account/contact
      // For now, we'll simulate it by calling a new endpoint or just setting a flag
      await api.post("/creator/payout/setup-simulated", {});
      toast.success("Razorpay Route connected successfully!");
      fetchAll();
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Failed to connect Razorpay");
    } finally {
      setConnectLoading(false);
    }
  };

  const handlePayout = async () => {
    const amount = parseFloat(payoutAmount);
    if (isNaN(amount) || amount < 1) {
      toast.error("Minimum payout: $1.00");
      return;
    }

    try {
      setRequesting(true);
      await api.post("/creator/payout", { amount });
      toast.success("Payout processed successfully!");
      setPayoutAmount("");
      fetchAll();
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Payout failed");
    } finally {
      setRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading Creator Studio...</p>
        </div>
      </div>
    );
  }

  const chartData = analytics?.dailyRevenue || [];
  const isConnected = data?.isConnectedToRazorpay;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
            Creator Studio
          </h1>
          <p className="text-muted-foreground mt-1">Manage your earnings, payouts, and monetization.</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Razorpay Connect Banner */}
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-violet-500/10 to-indigo-600/10 border border-violet-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shrink-0">
            <Link2 className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-bold text-lg">Connect with Razorpay</h3>
            <p className="text-sm text-muted-foreground">
              Set up Razorpay Route to receive payouts directly to your bank account via UPI or NEFT.
            </p>
          </div>
          <Button 
            className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 shrink-0"
            onClick={handleConnectRazorpay}
            disabled={connectLoading}
          >
            {connectLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
            Connect Razorpay
          </Button>
        </motion.div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Earned", value: `$${data?.totalEarned || "0.00"}`, icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Pending Balance", value: `$${data?.pendingBalance || "0.00"}`, icon: Wallet, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Withdrawn", value: `$${data?.withdrawnAmount || "0.00"}`, icon: History, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "30d Revenue", value: `$${data?.monthlyRevenue || "0.00"}`, icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Revenue Trend (30 days)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--card-border))' }}
                    formatter={(v: number) => [`$${v}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2.5}
                    fill="url(#colorRevenue)"
                    dot={{ r: 3, fill: 'hsl(var(--primary))' }}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>No revenue data yet. Start creating content to earn!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payout Request */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" /> Request Payout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold opacity-50">$</span>
                <Input
                  className="pl-8"
                  placeholder="10.00"
                  type="number"
                  step="0.01"
                  min="1"
                  value={payoutAmount}
                  onChange={e => setPayoutAmount(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">Minimum payout: $1.00</p>
            </div>

            {isConnected ? (
              <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg text-sm">
                <BadgeCheck className="w-4 h-4 text-green-500" />
                <span className="text-green-700 dark:text-green-400 font-medium">Razorpay Route active</span>
              </div>
            ) : (
              <div className="p-3 bg-yellow-500/10 rounded-lg text-sm text-yellow-700 dark:text-yellow-400">
                Connect Razorpay above to enable payouts
              </div>
            )}

            <Button
              className="w-full h-11 font-bold"
              onClick={handlePayout}
              disabled={requesting || !payoutAmount || !isConnected}
            >
              {requesting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Request Payout"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Recent Tips & Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data?.recentTips?.length > 0 ? data.recentTips.map((tip: any) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 font-bold">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Tip received</p>
                    <p className="text-xs text-muted-foreground">{new Date(tip.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-500">+${tip.amount}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-12 text-muted-foreground">
                <ArrowUpRight className="w-12 h-12 opacity-10 mx-auto mb-2" />
                <p className="font-medium">No earnings yet</p>
                <p className="text-sm mt-1">Share quality content and your followers can tip you!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payout History */}
      {payouts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Payout History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payouts.map((payout: any) => (
                <div key={payout.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                      ${payout.status === "completed" ? "bg-green-500/10 text-green-500" :
                        payout.status === "failed" ? "bg-red-500/10 text-red-500" :
                        "bg-yellow-500/10 text-yellow-500"}`}
                    >
                      {payout.status === "completed" ? "✓" : payout.status === "failed" ? "✕" : "⏳"}
                    </div>
                    <div>
                      <p className="text-sm font-bold">Payout #{payout.id}</p>
                      <p className="text-xs text-muted-foreground">{new Date(payout.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">${payout.amount}</p>
                    <p className={`text-xs font-medium capitalize ${
                      payout.status === "completed" ? "text-green-500" :
                      payout.status === "failed" ? "text-red-500" : "text-yellow-500"
                    }`}>{payout.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
