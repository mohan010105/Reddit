import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Layout } from "@/components/Layout";
import { PublicRoute } from "@/components/PublicRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthLoadingScreen } from "@/components/AuthLoadingScreen";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { CookieConsent } from "@/components/CookieConsent";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { SkipToContent, A11yAnnouncerProvider } from "@/components/Accessibility";
import { useGetMe } from "@workspace/api-client-react";
import { useRealtimePosts } from "@/hooks/useRealtimePosts";
import { usePWAStore } from "@/store/monetizationStore";

// Lazy-loaded Pages for performance
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const CommunityPage = lazy(() => import("@/pages/CommunityPage"));
const PostDetail = lazy(() => import("@/pages/PostDetail"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const SavedPosts = lazy(() => import("@/pages/SavedPosts"));
const Settings = lazy(() => import("@/pages/Settings"));
const Search = lazy(() => import("@/pages/Search"));
const Communities = lazy(() => import("@/pages/Communities"));
const Admin = lazy(() => import("@/pages/Admin"));
const AdminUsers = lazy(() => import("@/pages/AdminUsers"));
const AdminPosts = lazy(() => import("@/pages/AdminPosts"));
const AdminComments = lazy(() => import("@/pages/AdminComments"));
const AdminCommunities = lazy(() => import("@/pages/AdminCommunities"));
const AdminReports = lazy(() => import("@/pages/AdminReports"));
const AdminAnalytics = lazy(() => import("@/pages/AdminAnalytics"));
const AdminModeration = lazy(() => import("@/pages/AdminModeration"));
const AdminLogs = lazy(() => import("@/pages/AdminLogs"));
const AdminSettings = lazy(() => import("@/pages/AdminSettings"));
const NotFound = lazy(() => import("@/pages/not-found"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));

// Phase 4 Pages
const Premium = lazy(() => import("@/pages/Premium"));
const CreatorDashboard = lazy(() => import("@/pages/CreatorDashboard"));
const PaymentSuccess = lazy(() => import("@/pages/PaymentSuccess"));
const PaymentCanceled = lazy(() => import("@/pages/PaymentCanceled"));
const BillingDashboard = lazy(() => import("@/pages/BillingDashboard"));

// Phase 5: Compliance Pages
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));

// Phase 6: Growth & Scale
const OnboardingWizardPage = lazy(() => import("@/pages/OnboardingPage"));
const GrowthDashboardPage = lazy(() => import("@/pages/GrowthDashboardPage"));

// Dataset Explorer
const DatasetExplorer = lazy(() => import("@/pages/DatasetExplorer"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { session, isLoading } = useAuth();
  if (isLoading) return <AuthLoadingScreen />;
  if (!session) return <Redirect to="/login" />;
  return <Component />;
}

function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { session, isLoading } = useAuth();
  const { data: me, isLoading: meLoading } = useGetMe({ query: { enabled: !!session, queryKey: ['me'] } });
  if (isLoading || meLoading) return <AuthLoadingScreen />;
  if (!session) return <Redirect to="/login" />;
  if (me && !["admin", "super_admin", "moderator"].includes(me.role)) return <Redirect to="/" />;
  // If me is still undefined but session exists, show loading (edge case during initial fetch)
  if (!me) return <AuthLoadingScreen />;
  return <Component />;
}

function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  useRealtimePosts(!!session);
  return <>{children}</>;
}

function PWALifecycle({ children }: { children: React.ReactNode }) {
  const { setInstallable, setOffline } = usePWAStore();

  useEffect(() => {
    // PWA install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallable(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Online/offline status
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <>{children}</>;
}

function Router() {
  return (
    <Suspense fallback={<AuthLoadingScreen />}>
      <Switch>
        <Route path="/login">{() => <PublicRoute component={Login} />}</Route>
        <Route path="/register">{() => <PublicRoute component={Register} />}</Route>
        <Route path="/forgot-password">{() => <PublicRoute component={ForgotPassword} />}</Route>
        <Route>
          <Layout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/r/:slug" component={CommunityPage} />
              <Route path="/post/:id" component={PostDetail} />
              <Route path="/u/:username" component={UserProfile} />
              <Route path="/communities" component={Communities} />
              <Route path="/search" component={Search} />
              <Route path="/dataset">{() => <AdminRoute component={DatasetExplorer} />}</Route>
              
              {/* Phase 5: Compliance Routes */}
              <Route path="/privacy" component={PrivacyPolicy} />
              <Route path="/terms" component={TermsOfService} />
              <Route path="/cookie-policy" component={CookiePolicy} />
              
              {/* Phase 6: Growth & Scale Routes */}
              <Route path="/onboarding" component={OnboardingWizardPage} />
              <Route path="/admin/growth" component={GrowthDashboardPage} />
              <Route path="/premium">{() => <ProtectedRoute component={Premium} />}</Route>
              <Route path="/creator">{() => <ProtectedRoute component={CreatorDashboard} />}</Route>
              <Route path="/billing">{() => <ProtectedRoute component={BillingDashboard} />}</Route>
              <Route path="/profile/subscription">{() => <ProtectedRoute component={BillingDashboard} />}</Route>
              <Route path="/payment/success">{() => <ProtectedRoute component={PaymentSuccess} />}</Route>
              <Route path="/payment/canceled">{() => <ProtectedRoute component={PaymentCanceled} />}</Route>
              
              {/* Protected Routes */}
              <Route path="/notifications">{() => <ProtectedRoute component={Notifications} />}</Route>
              <Route path="/saved">{() => <ProtectedRoute component={SavedPosts} />}</Route>
              <Route path="/settings">{() => <ProtectedRoute component={Settings} />}</Route>
              
              {/* Admin Routes */}
              <Route path="/admin">{() => <AdminRoute component={Admin} />}</Route>
              <Route path="/admin/users">{() => <AdminRoute component={AdminUsers} />}</Route>
              <Route path="/admin/posts">{() => <AdminRoute component={AdminPosts} />}</Route>
              <Route path="/admin/comments">{() => <AdminRoute component={AdminComments} />}</Route>
              <Route path="/admin/communities">{() => <AdminRoute component={AdminCommunities} />}</Route>
              <Route path="/admin/reports">{() => <AdminRoute component={AdminReports} />}</Route>
              <Route path="/admin/analytics">{() => <AdminRoute component={AdminAnalytics} />}</Route>
              <Route path="/admin/moderation">{() => <AdminRoute component={AdminModeration} />}</Route>
              <Route path="/admin/logs">{() => <AdminRoute component={AdminLogs} />}</Route>
              <Route path="/admin/settings">{() => <AdminRoute component={AdminSettings} />}</Route>
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <A11yAnnouncerProvider>
              <PWALifecycle>
                <RealtimeProvider>
                  <SkipToContent />
                  <WouterRouter base={(import.meta.env.BASE_URL || "").replace(/\/$/, "")}>
                    <Router />
                  </WouterRouter>
                  <Toaster position="bottom-right" richColors />
                  <PWAInstallPrompt />
                  <CookieConsent />
                  <OnboardingFlow />
                </RealtimeProvider>
              </PWALifecycle>
            </A11yAnnouncerProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
