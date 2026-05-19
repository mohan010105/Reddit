import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageCircle, Users, Bell, Heart, ArrowRight, X, CheckCircle2 } from "lucide-react";
import { fadeInScale, staggerContainer, staggerItem } from "@/lib/animations";

interface OnboardingStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const ONBOARDING_KEY = "threadit_onboarding_completed";

const steps: OnboardingStep[] = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Welcome to Threadit!",
    description: "A modern community platform where you can share ideas, join discussions, and connect with people who share your interests.",
    color: "from-orange-500 to-rose-500",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Join Communities",
    description: "Browse and join communities that match your interests. Each community has its own rules, discussions, and culture.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Post & Discuss",
    description: "Share text posts, links, and images. Engage in threaded discussions with upvotes, downvotes, and nested comments.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Stay Connected",
    description: "Get notified when someone replies to you, follows you, or when there's activity in your favorite communities.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "You're All Set!",
    description: "Start exploring communities, make your first post, and become part of the conversation. Have fun!",
    color: "from-rose-500 to-orange-500",
  },
];

export function OnboardingFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timer: any;
    try {
      const completed = localStorage.getItem(ONBOARDING_KEY);
      if (!completed) {
        // Show after a short delay so the page loads first
        timer = setTimeout(() => setIsOpen(true), 3000);
      }
    } catch {}

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    handleComplete();
  }, []);

  const handleComplete = () => {
    try {
      localStorage.setItem(ONBOARDING_KEY, "true");
    } catch {}
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Welcome onboarding"
      >
        <motion.div
          {...fadeInScale}
          className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors"
            aria-label="Skip onboarding"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Gradient Header */}
          <div className={`relative h-48 bg-gradient-to-br ${step.color} flex items-center justify-center overflow-hidden`}>
            <motion.div
              key={currentStep}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="text-white"
            >
              {step.icon}
            </motion.div>
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />
          </div>

          {/* Content */}
          <motion.div
            key={`content-${currentStep}`}
            {...staggerContainer}
            className="p-6"
          >
            <motion.h2 {...staggerItem} className="text-xl font-bold mb-2">
              {step.title}
            </motion.h2>
            <motion.p {...staggerItem} className="text-sm text-muted-foreground leading-relaxed mb-6">
              {step.description}
            </motion.p>

            {/* Progress dots */}
            <motion.div {...staggerItem} className="flex items-center justify-center gap-2 mb-6">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentStep
                      ? "bg-primary w-6"
                      : idx < currentStep
                        ? "bg-primary/50"
                        : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </motion.div>

            {/* Actions */}
            <motion.div {...staggerItem} className="flex items-center gap-3">
              {!isLast && (
                <button
                  onClick={handleSkip}
                  className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Skip
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {isLast ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Get Started
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
