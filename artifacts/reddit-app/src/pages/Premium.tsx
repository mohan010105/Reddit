import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Shield, Crown, Star, Loader2, CreditCard, Sparkles, ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMonetizationStore } from "@/store/monetizationStore";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useGetMe, getGetMeQueryKey } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { loadRazorpay } from "@/utils/loadRazorpay";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Get started with the basics",
    icon: Star,
    color: "from-slate-400 to-slate-500",
    glow: "shadow-slate-500/20",
    features: ["Basic community access", "Posts & comments", "Voting", "Basic profile"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 499,
    popular: true,
    description: "The ultimate Threadit experience",
    icon: Sparkles,
    color: "from-orange-400 to-red-500",
    glow: "shadow-orange-500/30",
    features: ["Ad-free browsing", "Premium badge", "Advanced analytics", "Exclusive communities", "Enhanced profile", "Priority support"],
  },
  {
    id: "creator",
    name: "Creator Pro",
    price: 999,
    description: "For content creators & builders",
    icon: Zap,
    color: "from-violet-500 to-indigo-600",
    glow: "shadow-violet-500/30",
    features: ["All Premium features", "Monetize your posts", "Creator dashboard", "Higher upload limits", "Subscriber-only posts", "Priority support"],
  },
  {
    id: "community",
    name: "Community Pro",
    price: 1499,
    description: "Everything to lead a community",
    icon: Crown,
    color: "from-amber-400 to-orange-600",
    glow: "shadow-amber-500/30",
    features: ["All Creator features", "Verified communities", "Advanced AI moderation", "Community analytics", "Custom CSS branding", "Priority listing"],
  },
];

export default function Premium() {
  const { subscription, setSubscription } = useMonetizationStore();
  const [loading, setLoading] = useState<string | null>(null);
  const [billingLoading, setBillingLoading] = useState(false);
  const { supabaseUser } = useAuth();
  const { data: me } = useGetMe({ query: { enabled: !!supabaseUser, queryKey: getGetMeQueryKey() } });
  const [_, setLocation] = useLocation();

  // Fetch current subscription on mount
  useEffect(() => {
    api.get("/payments/subscription")
      .then(({ data }) => {
        if (data.plan && data.status) {
          setSubscription({ plan: data.plan, status: data.status, currentPeriodEnd: data.currentPeriodEnd });
        }
      })
      .catch(() => {});
  }, []);

  const handleSubscribe = async (planId: string) => {
    if (planId === "free") return;
    try {
      setLoading(planId);
      
      console.log(`[Frontend Debug] Clicked Subscribe for Plan: ${planId}`);
      console.log(`[Frontend Debug] Loading Razorpay script dynamically...`);
      
      const success = await loadRazorpay();
      if (!success) {
        toast.error("Unable to load payment service");
        return;
      }
      
      console.log("[Frontend Debug] Script loaded successfully. window.Razorpay exists:", !!(window as any).Razorpay);

      console.log("[Frontend Debug] Initiating order creation request to /payments/create-order...");
      // Forensic Step 5: Axios request sending { plan: planId } instead of planId
      const { data } = await api.post("/payments/create-order", { plan: planId });
      
      console.log("[Frontend Debug] Order creation response data:", data);
      
      // Forensic Step 5: Check response.data.order.id must exist. If missing: throw error.
      if (!data || !data.success || !data.order || !data.order.id) {
        console.error("[Frontend Debug] Order ID check failed! Full data:", data);
        throw new Error("Invalid order response from payment server. Order ID is missing.");
      }

      console.log(`[Frontend Debug] Order ID verified: ${data.order.id}. Opening checkout modal...`);

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Threadit Premium",
        description: "Premium subscription",
        order_id: data.order.id,
        prefill: {
          name: me?.username || supabaseUser?.user_metadata?.username || "Threadit User",
          email: supabaseUser?.email || "",
        },
        theme: {
          color: "#ff4500", // orange
        },
        modal: {
          ondismiss: () => {
            console.log("[Frontend Debug] Checkout modal dismissed by user.");
            toast.info("Payment cancelled");
            setLoading(null);
          }
        },
        handler: async function (response: any) {
          console.log("[Frontend Debug] Payment succeeded on gateway. Verification payload:", response);
          try {
            setLoading(planId);
            toast.loading("Verifying payment...", { id: "verify-toast" });
            
            const verifyRes = await api.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log("[Frontend Debug] Verification response received:", verifyRes.data);
            
            toast.success("Subscription activated successfully!", { id: "verify-toast" });
            
            // Set subscription status in local store
            setSubscription({
              plan: planId as any,
              status: "active",
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            });

            // Redirect user to subscription page
            setTimeout(() => {
              setLocation("/profile/subscription");
            }, 1000);
          } catch (e: any) {
            console.error("[Frontend Debug] Signature verification request failed:", e);
            toast.error(e.response?.data?.error || "Payment verification failed. Please contact support.", { id: "verify-toast" });
          } finally {
            setLoading(null);
          }
        },
      };

      console.log("[Frontend Debug] Instantiating Razorpay checkout with options:", options);
      const rzp = new (window as any).Razorpay(options);
      
      rzp.on('payment.failed', function (resp: any) {
        console.error("[Frontend Debug] Payment failed reason from SDK:", resp.error);
        toast.error(`Payment failed: ${resp.error.description || "Checkout failed"}`);
        setLoading(null);
      });

      rzp.open();
    } catch (error: any) {
      console.error("[Frontend Debug] Order creation flow caught error:", error);
      toast.error(error.response?.data?.error || error.message || "Failed to initiate payment");
      setLoading(null);
    }
  };

  const handleManageBilling = async () => {
    try {
      setBillingLoading(true);
      const { data } = await api.post("/payments/billing-portal");
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast.error("Failed to open billing portal");
    } finally {
      setBillingLoading(false);
    }
  };

  const currentPlanId = subscription.plan;
  const isActive = subscription.status === "active";

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-2">
          <Sparkles className="w-4 h-4" /> Upgrade Your Experience
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Choose Your <span className="gradient-text">Threadit</span> Plan
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Unlock premium features, advanced tools, and monetization options. 
          Support the community and elevate your experience.
        </p>
      </motion.div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PLANS.map((plan, i) => {
          const isCurrent = currentPlanId === plan.id && isActive;
          const Icon = plan.icon;
          
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 30 }}
              className={`relative flex flex-col rounded-2xl border-2 transition-all duration-300 overflow-hidden
                ${plan.popular ? `border-primary shadow-2xl ${plan.glow} scale-[1.02]` : 'border-card-border bg-card hover:border-primary/40'}
                ${isCurrent ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-orange-500 text-white text-xs font-bold text-center py-1.5 tracking-wide">
                  ✨ MOST POPULAR
                </div>
              )}

              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-xs font-bold text-center py-1.5 tracking-wide flex items-center justify-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" /> CURRENT PLAN
                </div>
              )}

              <div className={`p-6 flex flex-col flex-1 ${plan.popular || isCurrent ? 'pt-10' : ''}`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-1 mb-3">
                  <span className="text-3xl font-black">${plan.price === 0 ? "0" : plan.price}</span>
                  {plan.price > 0 && <span className="text-muted-foreground text-sm">/month</span>}
                </div>

                <p className="text-sm text-muted-foreground mb-5 h-10">{plan.description}</p>

                <div className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {plan.id === "free" ? (
                  <Button variant="outline" className="w-full h-11" disabled>
                    {isCurrent ? "Current Plan" : "Included"}
                  </Button>
                ) : (
                  <Button
                    className={`w-full h-11 font-bold gap-2 ${plan.popular ? 'bg-gradient-to-r from-primary to-orange-500 hover:opacity-90' : ''}`}
                    variant={isCurrent ? "outline" : "default"}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading !== null || isCurrent}
                  >
                    {loading === plan.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isCurrent ? (
                      "Active"
                    ) : (
                      <>Subscribe <ArrowRight className="w-4 h-4" /></>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Manage Billing */}
      {isActive && currentPlanId !== "free" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-card-border rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="flex-1 space-y-1">
            <h3 className="font-bold text-lg">Manage Your Subscription</h3>
            <p className="text-sm text-muted-foreground">
              Update payment methods or cancel your subscription through your account settings.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="gap-2 shrink-0"
            onClick={() => toast.info("Manual subscription management coming soon. Please contact support to cancel.")}
          >
            <CreditCard className="w-4 h-4" />
            Manage Plan
          </Button>
        </motion.div>
      )}

      {/* Security Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-card-border rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold">Secure Payments via Razorpay</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            All transactions are secure and processed through Razorpay. 
            Your card details never touch our servers. Support for UPI, Cards, and Netbanking.
          </p>
        </div>
        <div className="flex items-center gap-3 opacity-40">
          <CreditCard className="w-8 h-8" />
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider">Powered by</span>
            <span className="font-black text-lg text-blue-600">Razorpay</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
