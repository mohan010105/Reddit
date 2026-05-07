import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/`,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setSentEmail(data.email);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-2xl mb-2 select-none">
            <motion.div
              animate={{ rotate: [0, 15, -5, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <TrendingUp className="w-7 h-7" />
            </motion.div>
            Threadit
          </Link>
          <p className="text-muted-foreground text-sm mt-1">Reset your password</p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 250, delay: 0.1 }}
                  className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </motion.div>
                <h3 className="font-semibold text-lg mb-2">Check your inbox</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  We sent a password reset link to:
                </p>
                <p className="font-medium text-sm text-primary mb-6 break-all">{sentEmail}</p>
                <p className="text-xs text-muted-foreground mb-6">
                  Didn't receive it? Check your spam folder or try again in a few minutes.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSent(false)}
                >
                  Try a different email
                </Button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="you@example.com"
                      autoComplete="email"
                      autoFocus
                      data-testid="input-email"
                      className="h-10"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-destructive text-xs"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      We'll send a password reset link to this address.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-10 font-semibold"
                    disabled={loading}
                    data-testid="button-reset-password"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </span>
                    ) : "Send Reset Link"}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 pt-4 border-t border-border text-center text-sm text-muted-foreground">
            <Link href="/login" className="text-primary hover:underline font-semibold inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
