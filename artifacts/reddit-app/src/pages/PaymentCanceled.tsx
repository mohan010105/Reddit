import { motion } from "framer-motion";
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PaymentCanceled() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
          <XCircle className="w-14 h-14 text-muted-foreground" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 max-w-md"
      >
        <h1 className="text-3xl font-black tracking-tight">Payment Canceled</h1>
        <p className="text-muted-foreground text-lg">
          No worries! Your payment was not processed and no charges were made. 
          You can upgrade anytime you're ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link href="/premium">
            <Button className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" /> View Plans
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Feed
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
          <HelpCircle className="w-4 h-4" />
          <span>Having trouble? Contact us at support@threadit.app</span>
        </div>
      </motion.div>
    </div>
  );
}
