import React from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * A route guard that redirects authenticated users away from public-only pages
 * (e.g. login, register). Shows a loading spinner while checking auth state.
 */
export function PublicRoute({ component: Component }: { component: React.ComponentType }) {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (session) {
    return <Redirect to="/" />;
  }

  return <Component />;
}
