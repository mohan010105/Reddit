import { useEffect } from "react";
import { motion } from "framer-motion";
import { Cookie, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { updateSEO } from "@/lib/seo";
import { pageTransition } from "@/lib/animations";

export default function CookiePolicy() {
  useEffect(() => {
    updateSEO({
      title: "Cookie Policy",
      description: "Threadit Cookie Policy — learn about the cookies we use and how to manage them.",
    });
  }, []);

  return (
    <motion.div {...pageTransition} className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <Cookie className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: May 12, 2026</p>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">What Are Cookies?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Cookies are small text files stored on your device when you visit a website. They help
            us provide a better user experience by remembering your preferences, maintaining your
            session, and analyzing how you use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Essential Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            These cookies are necessary for the platform to function. They include authentication
            tokens, session management, and security features. You cannot opt out of essential cookies.
          </p>
          <div className="rounded-lg border border-border overflow-hidden mt-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr><th className="text-left p-3">Cookie</th><th className="text-left p-3">Purpose</th><th className="text-left p-3">Duration</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3 font-mono text-xs">sb-access-token</td><td className="p-3">Authentication</td><td className="p-3">1 hour</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-mono text-xs">sb-refresh-token</td><td className="p-3">Session refresh</td><td className="p-3">7 days</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-mono text-xs">threadit_consent</td><td className="p-3">Cookie preferences</td><td className="p-3">1 year</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Analytics Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use analytics cookies to understand how visitors interact with our platform.
            This helps us improve user experience and platform performance.
          </p>
          <div className="rounded-lg border border-border overflow-hidden mt-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr><th className="text-left p-3">Cookie</th><th className="text-left p-3">Purpose</th><th className="text-left p-3">Duration</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3 font-mono text-xs">ph_distinct_id</td><td className="p-3">PostHog analytics</td><td className="p-3">1 year</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-mono text-xs">ph_session_id</td><td className="p-3">Session tracking</td><td className="p-3">30 min</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Functional Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            These cookies remember your preferences like theme (dark/light mode), language,
            and other settings to provide a personalized experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Managing Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            You can manage your cookie preferences at any time through our cookie consent banner
            or your browser settings. Note that disabling certain cookies may affect the functionality
            of our platform.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
