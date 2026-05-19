import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Receipt, Calendar, ArrowRight, Loader2, ExternalLink, Shield, BadgeCheck, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMonetizationStore } from "@/store/monetizationStore";
import { toast } from "sonner";
import api from "@/lib/api";
import { Link } from "wouter";

export default function BillingDashboard() {
  const { subscription, setSubscription } = useMonetizationStore();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get("/payments/subscription").then(({ data }) => {
        if (data.plan) setSubscription({ plan: data.plan, status: data.status, currentPeriodEnd: data.currentPeriodEnd });
      }).catch(err => console.error("Failed to fetch subscription:", err)),
      api.get("/payments/history").then(({ data }) => setTransactions(data))
         .catch(err => console.error("Failed to fetch payment history:", err)),
    ]).finally(() => setLoading(false));
  }, []);

  const handleManageBilling = async () => {
    try {
      const { data } = await api.post("/payments/billing-portal");
      if (data.url) window.location.href = data.url;
    } catch {
      toast.error("Failed to open billing portal");
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel? You'll keep access until the end of your billing period.")) return;
    try {
      setCancelLoading(true);
      await api.post("/payments/cancel");
      toast.success("Subscription will be canceled at period end");
      // Refresh
      const { data } = await api.get("/payments/subscription");
      if (data.plan) setSubscription({ plan: data.plan, status: data.status, currentPeriodEnd: data.currentPeriodEnd });
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Failed to cancel");
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const isActive = subscription.status === "active" && subscription.plan !== "free";
  const periodEnd = subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : null;

  const statusConfig = {
    active: { label: "Active", color: "text-green-500", bg: "bg-green-500/10", icon: BadgeCheck },
    past_due: { label: "Past Due", color: "text-yellow-500", bg: "bg-yellow-500/10", icon: Clock },
    canceled: { label: "Canceled", color: "text-red-500", bg: "bg-red-500/10", icon: XCircle },
    none: { label: "Free", color: "text-muted-foreground", bg: "bg-muted", icon: Shield },
    expired: { label: "Expired", color: "text-red-500", bg: "bg-red-500/10", icon: XCircle },
  } as const;

  const currentStatus = statusConfig[subscription.status as keyof typeof statusConfig] || statusConfig.none;
  const StatusIcon = currentStatus.icon;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-6 px-4">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage your plan, view invoices, and update payment methods.</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" /> Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black capitalize">{subscription.plan}</h3>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${currentStatus.bg} ${currentStatus.color}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  {currentStatus.label}
                </div>
              </div>
              {periodEnd && (
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {subscription.status === "canceled" ? "Access until " : "Renews on "}{periodEnd}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              {isActive && (
                <>
                  <Button variant="outline" onClick={handleManageBilling} className="gap-2">
                    <ExternalLink className="w-4 h-4" /> Manage
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={handleCancelSubscription}
                    disabled={cancelLoading}
                  >
                    {cancelLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cancel"}
                  </Button>
                </>
              )}
              {!isActive && (
                <Link href="/premium">
                  <Button className="gap-2">
                    Upgrade <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" /> Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.map((tx: any) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                      ${tx.status === "succeeded" ? "bg-green-500/10 text-green-500" :
                        tx.status === "failed" ? "bg-red-500/10 text-red-500" :
                        "bg-yellow-500/10 text-yellow-500"}`}
                    >
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold capitalize">{tx.type} Payment</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleDateString()} · {tx.description || tx.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">${tx.amount}</p>
                    <p className={`text-xs font-medium capitalize
                      ${tx.status === "succeeded" ? "text-green-500" :
                        tx.status === "failed" ? "text-red-500" :
                        "text-yellow-500"}`}
                    >{tx.status}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Receipt className="w-12 h-12 opacity-10 mx-auto mb-3" />
              <p className="font-medium">No transactions yet</p>
              <p className="text-sm mt-1">Your payment history will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
