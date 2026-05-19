import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Sparkles, Hash, Users, Target } from "lucide-react";
import { pageTransition, staggerContainer, staggerItem } from "@/lib/animations";

const INTERESTS = [
  { id: "tech", label: "Technology", icon: "💻" },
  { id: "gaming", label: "Gaming", icon: "🎮" },
  { id: "science", label: "Science", icon: "🧪" },
  { id: "art", label: "Art & Design", icon: "🎨" },
  { id: "finance", label: "Finance", icon: "📈" },
  { id: "coding", label: "Coding", icon: "⌨️" },
  { id: "lifestyle", label: "Lifestyle", icon: "🏠" },
  { id: "news", label: "World News", icon: "🌍" },
];

export function OnboardingWizard({ onComplete }: { onComplete: (interests: string[]) => void }) {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const nextStep = () => setStep(prev => prev + 1);

  return (
    <motion.div {...pageTransition} className="max-w-2xl mx-auto py-12 px-6">
      <div className="mb-12 flex justify-center gap-2">
        {[1, 2, 3].map(i => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? "bg-primary w-8" : "bg-muted w-4"}`} 
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            {...staggerContainer}
            className="space-y-6"
          >
            <motion.div {...staggerItem} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Pick your interests</h1>
              <p className="text-muted-foreground mt-2">We'll use these to build your personalized feed.</p>
            </motion.div>

            <motion.div {...staggerItem} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {INTERESTS.map(interest => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                    selectedInterests.includes(interest.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{interest.icon}</span>
                  <span className="text-sm font-medium">{interest.label}</span>
                  {selectedInterests.includes(interest.id) && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </motion.div>

            <motion.div {...staggerItem} className="flex justify-center pt-4">
              <button
                disabled={selectedInterests.length < 3}
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95"
              >
                Continue {selectedInterests.length < 3 && `(Pick ${3 - selectedInterests.length} more)`}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            {...staggerContainer}
            className="space-y-8"
          >
            <motion.div {...staggerItem} className="text-center">
              <h1 className="text-3xl font-bold">Recommended Communities</h1>
              <p className="text-muted-foreground mt-2">Based on your interests, we think you'll love these.</p>
            </motion.div>

            <motion.div {...staggerItem} className="grid gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:bg-muted/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-primary">r/</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">r/technology</h3>
                    <p className="text-xs text-muted-foreground">1.2M members • Daily discussions</p>
                  </div>
                  <button className="px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-bold">Join</button>
                </div>
              ))}
            </motion.div>

            <motion.div {...staggerItem} className="flex justify-center pt-4">
              <button
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-all hover:scale-105"
              >
                Final Step
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            {...staggerContainer}
            className="text-center space-y-6"
          >
            <motion.div {...staggerItem} className="w-24 h-24 bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div {...staggerItem}>
              <h1 className="text-4xl font-black tracking-tight">You're all set!</h1>
              <p className="text-muted-foreground mt-3 text-lg">Your personalized feed is being prepared.</p>
            </motion.div>
            <motion.div {...staggerItem} className="pt-6">
              <button
                onClick={() => onComplete(selectedInterests)}
                className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground text-lg font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
              >
                Go to my feed
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
