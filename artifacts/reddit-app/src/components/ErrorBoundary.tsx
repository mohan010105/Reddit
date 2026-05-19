import { Component, type ReactNode, type ErrorInfo } from "react";
import { AlertTriangle, RefreshCw, Home, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorId: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    return { hasError: true, error, errorId };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console in development
    if (import.meta.env.DEV) {
      console.error(`[ErrorBoundary:${this.props.name || "root"}]`, error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorId: null });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
          <div className="relative mb-8">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center shadow-2xl shadow-destructive/10"
            >
              <AlertTriangle className="w-12 h-12 text-destructive" />
            </motion.div>
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive border-4 border-background" />
          </div>

          <h1 className="text-3xl font-black tracking-tight mb-3">Oops! Something went wrong</h1>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
            The application encountered an unexpected error. Don't worry, your data is safe and our team has been notified.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full max-w-sm">
            <Button onClick={this.handleRetry} className="w-full h-12 gap-2 text-base font-bold shadow-lg shadow-primary/20">
              <RefreshCw className="w-4 h-4" /> Try Again
            </Button>
            <Button variant="outline" onClick={this.handleGoHome} className="w-full h-12 gap-2 text-base border-2">
              <Home className="w-4 h-4" /> Go Home
            </Button>
          </div>

          <div className="w-full max-w-lg">
            <details className="group border border-card-border rounded-2xl bg-card/50 overflow-hidden transition-all duration-300">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors list-none">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Technical Details</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground/40 transition-transform group-open:rotate-90" />
              </summary>
              <div className="p-4 pt-0 text-left border-t border-card-border/50">
                <div className="bg-muted/50 p-4 rounded-xl font-mono text-[10px] text-muted-foreground overflow-auto max-h-48 leading-relaxed">
                  <p className="font-bold text-destructive mb-1">{this.state.error?.name}: {this.state.error?.message}</p>
                  <p className="opacity-60 mb-2">Error ID: {this.state.errorId}</p>
                  <pre className="whitespace-pre-wrap">{this.state.error?.stack}</pre>
                </div>
              </div>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export class SectionErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode; name?: string },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 rounded-2xl bg-card border border-card-border text-center shadow-sm">
            <AlertTriangle className="w-8 h-8 text-destructive/40 mx-auto mb-3" />
            <p className="text-sm font-bold">Failed to load component</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">An error occurred while rendering this section.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => this.setState({ hasError: false })}
              className="h-8 gap-2 text-xs"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </Button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
