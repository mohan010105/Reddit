import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Zap, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { AnimatedCounter } from "@/components/PageTransition";

interface MetricCardProps {
  label: string;
  value: number;
  change: number;
  icon: any;
  prefix?: string;
  suffix?: string;
}

function MetricCard({ label, value, change, icon: Icon, prefix = "", suffix = "" }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <motion.div
      {...staggerItem}
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
          isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
        }`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <h2 className="text-3xl font-black mt-1">
          <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
        </h2>
      </div>
    </motion.div>
  );
}

export function GrowthDashboard() {
  const metrics = [
    { label: "Daily Active Users", value: 12450, change: 12.5, icon: Users },
    { label: "Monthly Active Users", value: 85200, change: 8.2, icon: Activity },
    { label: "Viral K-Factor", value: 1.18, change: 4.3, icon: TrendingUp, suffix: "" },
    { label: "Revenue (ARR)", value: 45200, change: 15.8, icon: Zap, prefix: "$" },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Growth & Scale</h1>
          <p className="text-muted-foreground">Real-time performance and expansion metrics.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-muted text-sm font-bold hover:bg-muted/80 transition-colors">Last 30 Days</button>
          <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20">Export Report</button>
        </div>
      </div>

      <motion.div
        {...staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map(m => (
          <MetricCard key={m.label} {...m} />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div {...fadeInUp} className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" /> Conversion Funnel
          </h3>
          <div className="space-y-6">
            {[
              { label: "Landing Page View", count: 100000, color: "bg-primary/20" },
              { label: "Sign Up Start", count: 45000, color: "bg-primary/40" },
              { label: "Onboarding Complete", count: 28000, color: "bg-primary/60" },
              { label: "First Post Created", count: 12000, color: "bg-primary" },
            ].map((step, i) => (
              <div key={step.label} className="relative">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{step.label}</span>
                  <span className="text-muted-foreground">{step.count.toLocaleString()} ({((step.count/100000)*100).toFixed(0)}%)</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(step.count/100000)*100}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full ${step.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeInUp} className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" /> System Health
          </h3>
          <div className="space-y-4">
            {[
              { label: "API Latency", value: "42ms", status: "optimal" },
              { label: "Cache Hit Rate", value: "94.2%", status: "optimal" },
              { label: "Worker Queue", value: "12 jobs", status: "warning" },
              { label: "Error Rate", value: "0.02%", status: "optimal" },
            ].map(stat => (
              <div key={stat.label} className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                <span className="text-sm font-medium">{stat.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{stat.value}</span>
                  <div className={`w-2 h-2 rounded-full ${stat.status === "optimal" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
