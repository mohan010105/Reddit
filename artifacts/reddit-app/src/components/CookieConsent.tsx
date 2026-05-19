import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings2, Check } from "lucide-react";
import { Link } from "wouter";
import { slideInBottom } from "@/lib/animations";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

const CONSENT_KEY = "threadit_cookie_consent";
const PREFERENCES_KEY = "threadit_cookie_preferences";

function getStoredConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "true";
  } catch {
    return false;
  }
}

function getStoredPreferences(): CookiePreferences {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { essential: true, analytics: false, functional: true, marketing: false };
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(getStoredPreferences);

  useEffect(() => {
    // Only show if user hasn't consented yet
    const timer = setTimeout(() => {
      if (!getStoredConsent()) {
        setVisible(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const acceptSelected = () => {
    savePreferences(preferences);
  };

  const rejectNonEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    });
  };

  const savePreferences = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(CONSENT_KEY, "true");
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        {...slideInBottom}
        className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        role="dialog"
        aria-label="Cookie consent"
        aria-describedby="cookie-desc"
      >
        <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-start gap-3 p-5 pb-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base">We value your privacy</h3>
              <p id="cookie-desc" className="text-sm text-muted-foreground mt-1 leading-relaxed">
                We use cookies to enhance your experience, analyze traffic, and personalize content.
                Read our{" "}
                <Link href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </div>
            <button
              onClick={rejectNonEssential}
              className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Detailed Preferences */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pt-4 space-y-3">
                  {[
                    { key: "essential" as const, label: "Essential", desc: "Required for the platform to function", locked: true },
                    { key: "analytics" as const, label: "Analytics", desc: "Help us understand how you use Threadit" },
                    { key: "functional" as const, label: "Functional", desc: "Remember your preferences and settings" },
                    { key: "marketing" as const, label: "Marketing", desc: "Personalized recommendations and content" },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences[item.key]}
                        disabled={item.locked}
                        onChange={(e) =>
                          setPreferences((prev) => ({ ...prev, [item.key]: e.target.checked }))
                        }
                        className="w-4 h-4 rounded accent-primary"
                        aria-label={`${item.label} cookies`}
                      />
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center gap-2 p-5 pt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl border border-border hover:bg-muted transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              {showDetails ? "Hide" : "Customize"}
            </button>
            <div className="flex-1" />
            {showDetails ? (
              <button
                onClick={acceptSelected}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Check className="w-3.5 h-3.5" />
                Save Preferences
              </button>
            ) : (
              <>
                <button
                  onClick={rejectNonEssential}
                  className="px-4 py-2.5 text-sm font-medium rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Check className="w-3.5 h-3.5" />
                  Accept All
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Utility to check consent ─────────────────────────────
export function hasConsent(category: keyof CookiePreferences): boolean {
  const prefs = getStoredPreferences();
  return prefs[category] ?? false;
}
