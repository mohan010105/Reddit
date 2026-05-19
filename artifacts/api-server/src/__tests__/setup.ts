// Backend test setup
import { jest } from "@jest/globals";

// Set test environment variables
process.env.NODE_ENV = "test";
process.env.PORT = "5001";
process.env.JWT_SECRET = "test-jwt-secret-key-for-testing";
process.env.SUPABASE_URL = "http://localhost:54321";
process.env.SUPABASE_ANON_KEY = "test-anon-key";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/threadit_test";

// Global mocks
jest.unstable_mockModule("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(() => Promise.resolve({ data: null, error: null } as any)),
    auth: {
      getUser: jest.fn(() => Promise.resolve({ data: { user: null }, error: null } as any)),
    },
  })),
}));
