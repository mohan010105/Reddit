import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center space-y-6"
          >
            <div className="w-20 h-20 bg-destructive/10 rounded-3xl flex items-center justify-center mx-auto text-destructive shadow-lg shadow-destructive/10">
              <AlertTriangle className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight">Something went wrong</h1>
              <p className="text-muted-foreground leading-relaxed">
                The application encountered an unexpected error. Don't worry, your data is safe.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="bg-muted p-4 rounded-xl text-left text-xs font-mono overflow-auto max-h-40 border border-border">
                {this.state.error?.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={this.handleReset} className="flex-1 gap-2 h-11">
                <RefreshCcw className="w-4 h-4" /> Try Again
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/"} className="flex-1 gap-2 h-11">
                <Home className="w-4 h-4" /> Go Home
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
