import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import CommunityPage from "@/pages/CommunityPage";
import PostDetail from "@/pages/PostDetail";
import UserProfile from "@/pages/UserProfile";
import Notifications from "@/pages/Notifications";
import SavedPosts from "@/pages/SavedPosts";
import Settings from "@/pages/Settings";
import Search from "@/pages/Search";
import Communities from "@/pages/Communities";
import Admin from "@/pages/Admin";
import AdminUsers from "@/pages/AdminUsers";
import AdminPosts from "@/pages/AdminPosts";
import AdminReports from "@/pages/AdminReports";
import NotFound from "@/pages/not-found";
import { useGetMe } from "@workspace/api-client-react";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

function ProtectedRoute({ component: Component }: { component: () => JSX.Element }) {
  const { session, isLoading } = useAuth();
  if (isLoading) return null;
  if (!session) return <Redirect to="/login" />;
  return <Component />;
}

function AdminRoute({ component: Component }: { component: () => JSX.Element }) {
  const { session, isLoading } = useAuth();
  const { data: me } = useGetMe({ query: { enabled: !!session } });
  if (isLoading) return null;
  if (!session) return <Redirect to="/login" />;
  if (me && me.role !== "admin") return <Redirect to="/" />;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/r/:slug" component={CommunityPage} />
            <Route path="/post/:id" component={PostDetail} />
            <Route path="/u/:username" component={UserProfile} />
            <Route path="/communities" component={Communities} />
            <Route path="/search" component={Search} />
            <Route path="/notifications">{() => <ProtectedRoute component={Notifications} />}</Route>
            <Route path="/saved">{() => <ProtectedRoute component={SavedPosts} />}</Route>
            <Route path="/settings">{() => <ProtectedRoute component={Settings} />}</Route>
            <Route path="/admin">{() => <AdminRoute component={Admin} />}</Route>
            <Route path="/admin/users">{() => <AdminRoute component={AdminUsers} />}</Route>
            <Route path="/admin/posts">{() => <AdminRoute component={AdminPosts} />}</Route>
            <Route path="/admin/reports">{() => <AdminRoute component={AdminReports} />}</Route>
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
