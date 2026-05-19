import { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { updateSEO } from "@/lib/seo";
import { pageTransition } from "@/lib/animations";

export default function TermsOfService() {
  useEffect(() => {
    updateSEO({
      title: "Terms of Service",
      description: "Threadit Terms of Service — rules, guidelines, and legal terms for using our platform.",
    });
  }, []);

  return (
    <motion.div {...pageTransition} className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <FileText className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: May 12, 2026</p>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using Threadit, you agree to be bound by these Terms of Service.
            If you do not agree, do not use our services. We may update these terms at any time,
            and continued use constitutes acceptance of changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">2. Account Registration</h2>
          <p className="text-muted-foreground leading-relaxed">
            You must be at least 13 years old to use Threadit. You are responsible for maintaining
            the confidentiality of your account credentials and for all activities under your account.
            You must provide accurate and complete information during registration.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">3. Content Policy</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">You agree not to post content that:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Is illegal, threatening, harassing, or discriminatory</li>
            <li>Infringes on intellectual property rights</li>
            <li>Contains malware, spam, or misleading information</li>
            <li>Violates any person's privacy rights</li>
            <li>Promotes violence or self-harm</li>
            <li>Contains sexually explicit material involving minors</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">4. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            You retain ownership of content you create. By posting, you grant Threadit a non-exclusive,
            royalty-free, worldwide license to use, display, reproduce, and distribute your content
            in connection with operating and promoting the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">5. Premium Subscriptions</h2>
          <p className="text-muted-foreground leading-relaxed">
            Premium features are available through paid subscriptions. Subscriptions auto-renew unless
            canceled before the renewal date. Refunds are handled according to our refund policy.
            We reserve the right to modify pricing with 30 days' notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">6. Community Guidelines</h2>
          <p className="text-muted-foreground leading-relaxed">
            Community moderators may set additional rules. Violations may result in content removal,
            temporary restrictions, or permanent account suspension. We use both automated and human
            moderation to enforce guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">7. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may suspend or terminate your account at our discretion for violations of these terms.
            You may delete your account at any time through account settings. Upon termination,
            your right to access the service ceases immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">8. Disclaimers & Limitations</h2>
          <p className="text-muted-foreground leading-relaxed">
            Threadit is provided "as is" without warranties of any kind. We are not liable for any
            indirect, incidental, or consequential damages. Our total liability shall not exceed
            the amount paid by you in the preceding 12 months.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">9. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These terms are governed by and construed in accordance with applicable laws.
            Any disputes shall be resolved through binding arbitration. Class action waivers apply.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">10. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            For questions regarding these terms, contact us at{" "}
            <a href="mailto:legal@threadit.app" className="text-primary hover:underline">legal@threadit.app</a>.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
