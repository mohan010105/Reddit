import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWAStore } from "@/store/monetizationStore";

export function PWAInstallPrompt() {
  const { isInstallable, deferredPrompt, clearPrompt } = usePWAStore();
  const [dismissed, setDismissed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      clearPrompt();
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    // Don't show again for 7 days
    localStorage.setItem("pwa-dismiss-time", Date.now().toString());
  };

  // Check if dismissed recently
  useEffect(() => {
    const dismissTime = localStorage.getItem("pwa-dismiss-time");
    if (dismissTime && Date.now() - parseInt(dismissTime) < 7 * 24 * 60 * 60 * 1000) {
      setDismissed(true);
    }
  }, []);

  if (!isInstallable || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-20 lg:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50"
      >
        <div className="glass rounded-2xl p-5 shadow-2xl border border-primary/20">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white shadow-lg shrink-0">
              {isDesktop ? <Monitor className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm">Install Threadit</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {isDesktop
                  ? "Add Threadit to your desktop for quick access and a native-like experience."
                  : "Install the app for offline access, push notifications, and a native feel."}
              </p>
              <Button
                size="sm"
                className="mt-3 gap-2 w-full sm:w-auto"
                onClick={handleInstall}
              >
                <Download className="w-3.5 h-3.5" /> Install App
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
