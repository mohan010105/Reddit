import { describe, it, expect, vi, afterEach, afterAll } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "../utils";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function ProblemChild() {
  throw new Error("Test error");
  return null;
}

function GoodChild() {
  return <div>Everything is fine</div>;
}

describe("ErrorBoundary", () => {
  // Suppress expected React error boundary logs
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Everything is fine")).toBeInTheDocument();
  });

  it("renders fallback UI when child throws", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText(/unexpected error/i)).toBeInTheDocument();
  });

  it("renders custom fallback when provided", () => {
    render(
      <ErrorBoundary fallback={<div>Custom error page</div>}>
        <ProblemChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Custom error page")).toBeInTheDocument();
  });

  it('shows "Try Again" button that resets the error state', () => {
    const { container } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );
    const retryBtn = screen.getByText("Try Again");
    expect(retryBtn).toBeInTheDocument();
    // Clicking try again re-renders children (which will throw again)
    fireEvent.click(retryBtn);
    // After retry it tries to render children again, which throws, so error shows again
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
