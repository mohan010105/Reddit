// Mock for @workspace/api-client-react used in tests
import { vi } from "vitest";

export const setAuthTokenGetter = vi.fn();
export const useGetMe = vi.fn().mockReturnValue({
  data: {
    id: "test-user-id",
    username: "testuser",
    display_name: "Test User",
    role: "user",
    avatar_url: null,
    karma: 1500,
  },
  isLoading: false,
  error: null,
});

export const useGetPosts = vi.fn().mockReturnValue({
  data: [],
  isLoading: false,
  error: null,
});

export const useGetCommunities = vi.fn().mockReturnValue({
  data: [],
  isLoading: false,
  error: null,
});

export const useGetNotifications = vi.fn().mockReturnValue({
  data: [],
  isLoading: false,
  error: null,
});

export const useCreatePost = vi.fn().mockReturnValue({
  mutate: vi.fn(),
  mutateAsync: vi.fn(),
  isPending: false,
});

export const useUpdateMyProfile = vi.fn().mockReturnValue({
  mutate: vi.fn(),
  mutateAsync: vi.fn(),
  isPending: false,
});

export const useVotePost = vi.fn().mockReturnValue({
  mutate: vi.fn(),
  mutateAsync: vi.fn(),
  isPending: false,
});

export const useDeletePost = vi.fn().mockReturnValue({
  mutate: vi.fn(),
  mutateAsync: vi.fn(),
  isPending: false,
});
