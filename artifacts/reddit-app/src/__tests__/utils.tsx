import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ─── Mock Auth Context ──────────────────────────────────────
const mockSession = {
  access_token: "test-token",
  token_type: "bearer",
  expires_in: 3600,
  refresh_token: "test-refresh-token",
  user: {
    id: "test-user-id",
    email: "test@threadit.com",
    aud: "authenticated",
    role: "authenticated",
    app_metadata: {},
    user_metadata: { username: "testuser", display_name: "Test User" },
    created_at: new Date().toISOString(),
  },
  expires_at: Math.floor(Date.now() / 1000) + 3600,
};

const mockAuthContext = {
  session: mockSession,
  supabaseUser: mockSession.user,
  isLoading: false,
  signOut: async () => {},
};

const AuthContext = React.createContext(mockAuthContext);

// ─── Test Query Client ──────────────────────────────────────
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

// ─── Providers Wrapper ──────────────────────────────────────
interface TestProviderOptions {
  authenticated?: boolean;
  isLoading?: boolean;
}

function createAllProviders(options: TestProviderOptions = {}) {
  const queryClient = createTestQueryClient();
  const authValue = {
    ...mockAuthContext,
    session: options.authenticated === false ? null : mockSession,
    supabaseUser: options.authenticated === false ? null : mockSession.user,
    isLoading: options.isLoading ?? false,
  };

  return function AllProviders({ children }: { children: React.ReactNode }) {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(
        AuthContext.Provider,
        { value: authValue as any },
        children,
      ),
    );
  };
}

// ─── Custom Render ──────────────────────────────────────────
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  authenticated?: boolean;
  isLoading?: boolean;
}

function customRender(ui: ReactElement, options: CustomRenderOptions = {}) {
  const { authenticated, isLoading, ...renderOptions } = options;
  return render(ui, {
    wrapper: createAllProviders({ authenticated, isLoading }),
    ...renderOptions,
  });
}

// ─── Test Data Factories ────────────────────────────────────
export function createMockPost(overrides: Record<string, any> = {}) {
  return {
    id: `post-${Math.random().toString(36).slice(2)}`,
    title: "Test Post Title",
    content: "This is test content for the post.",
    type: "text",
    author_id: "test-user-id",
    community_id: "community-1",
    upvotes: 42,
    downvotes: 3,
    comment_count: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: { username: "testuser", display_name: "Test User", avatar_url: null },
    community: { name: "TestCommunity", slug: "testcommunity", icon_url: null },
    user_vote: null,
    is_saved: false,
    ...overrides,
  };
}

export function createMockComment(overrides: Record<string, any> = {}) {
  return {
    id: `comment-${Math.random().toString(36).slice(2)}`,
    content: "Test comment content",
    author_id: "test-user-id",
    post_id: "post-1",
    parent_id: null,
    upvotes: 5,
    downvotes: 0,
    created_at: new Date().toISOString(),
    author: { username: "testuser", display_name: "Test User", avatar_url: null },
    user_vote: null,
    replies: [],
    ...overrides,
  };
}

export function createMockCommunity(overrides: Record<string, any> = {}) {
  return {
    id: `community-${Math.random().toString(36).slice(2)}`,
    name: "TestCommunity",
    slug: "testcommunity",
    description: "A test community for testing purposes.",
    icon_url: null,
    banner_url: null,
    member_count: 1234,
    created_at: new Date().toISOString(),
    is_member: false,
    ...overrides,
  };
}

export function createMockUser(overrides: Record<string, any> = {}) {
  return {
    id: "test-user-id",
    username: "testuser",
    display_name: "Test User",
    avatar_url: null,
    bio: "Test user bio",
    role: "user",
    karma: 1500,
    post_count: 42,
    comment_count: 128,
    created_at: new Date().toISOString(),
    is_following: false,
    ...overrides,
  };
}

export function createMockNotification(overrides: Record<string, any> = {}) {
  return {
    id: `notif-${Math.random().toString(36).slice(2)}`,
    type: "comment_reply",
    message: "Someone replied to your comment",
    is_read: false,
    created_at: new Date().toISOString(),
    actor: { username: "otheruser", display_name: "Other User", avatar_url: null },
    ...overrides,
  };
}

// Re-export everything from RTL
export * from "@testing-library/react";
import { screen as rtlScreen, fireEvent as rtlFireEvent } from "@testing-library/react";
export const screen = rtlScreen;
export const fireEvent = rtlFireEvent;
export { customRender as render };
export { mockSession, mockAuthContext, createTestQueryClient };

