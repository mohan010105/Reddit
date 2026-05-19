import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

/**
 * Full-screen loading spinner shown while the initial auth session
 * is being restored. Prevents layout flicker on app boot.
 */
export function AuthLoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
      >
        <TrendingUp className="w-6 h-6 text-primary" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-muted-foreground font-medium"
      >
        Loading Threadit...
      </motion.p>
    </div>
  );
}
