import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useMonetizationStore } from "@/store/monetizationStore";
import axios from "axios";

export default function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const { setSubscription } = useMonetizationStore();

  useEffect(() => {
    // Refresh subscription status
    axios.get("/api/subscriptions/me")
      .then(({ data }) => {
        if (data.plan && data.status) {
          setSubscription({ plan: data.plan, status: data.status, currentPeriodEnd: data.currentPeriodEnd });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center">
          <CheckCircle2 className="w-14 h-14 text-green-500" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-2 -right-2"
        >
          <PartyPopper className="w-8 h-8 text-amber-500" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 max-w-md"
      >
        <h1 className="text-3xl font-black tracking-tight">Payment Successful! 🎉</h1>
        <p className="text-muted-foreground text-lg">
          Welcome to the premium Threadit experience. Your subscription is now active and all premium features have been unlocked.
        </p>

        <div className="bg-card border border-card-border rounded-xl p-4 space-y-3 text-left">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-medium">Ad-free browsing is now active</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-medium">Premium badge applied to your profile</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-medium">All premium features unlocked</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link href="/">
            <Button className="w-full gap-2">
              Go to Feed <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="outline" className="w-full">
              View Settings
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
