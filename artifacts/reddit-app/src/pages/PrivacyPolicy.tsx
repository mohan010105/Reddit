import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { updateSEO } from "@/lib/seo";
import { pageTransition } from "@/lib/animations";

export default function PrivacyPolicy() {
  useEffect(() => {
    updateSEO({
      title: "Privacy Policy",
      description: "Threadit Privacy Policy — how we collect, use, and protect your data.",
    });
  }, []);

  return (
    <motion.div {...pageTransition} className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: May 12, 2026</p>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">
            We collect information you provide directly, including your email address, username, display name,
            profile information, and any content you post. We also automatically collect usage data including
            IP addresses, browser type, device information, and interaction data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related notifications</li>
            <li>Send technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, investigate, and prevent fraudulent or unauthorized activity</li>
            <li>Personalize and improve your experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">3. Information Sharing</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not sell your personal information. We may share information with third-party service
            providers who perform services on our behalf, such as hosting, analytics, payment processing,
            and customer service. We may also share information when required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">4. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your information for as long as your account is active or as needed to provide services.
            You may request deletion of your account and associated data at any time through your account settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">5. Your Rights (GDPR)</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your data</li>
            <li><strong>Portability:</strong> Request export of your data in a machine-readable format</li>
            <li><strong>Restriction:</strong> Request limitation of processing</li>
            <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">6. Cookies & Tracking</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use cookies and similar technologies to maintain sessions, remember preferences, and
            analyze usage patterns. You can manage cookie preferences through our cookie consent banner
            or your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">7. Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement industry-standard security measures including encryption in transit (TLS),
            secure authentication, rate limiting, and regular security audits to protect your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">8. Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our services are not directed to children under 13. We do not knowingly collect personal
            information from children under 13. If we learn we have collected such information, we will
            delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">9. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about this Privacy Policy or wish to exercise your rights, please
            contact us at <a href="mailto:privacy@threadit.app" className="text-primary hover:underline">privacy@threadit.app</a>.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
