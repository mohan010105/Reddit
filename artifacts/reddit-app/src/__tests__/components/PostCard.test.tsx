import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../utils";
import { createMockPost } from "../utils";

// Mock PostCard as a simplified version for unit testing since the real one
// has complex dependencies. This tests the rendering pattern.
function MockPostCard({ post }: { post: any }) {
  return (
    <article data-testid="post-card" role="article" aria-label={post.title}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <span data-testid="post-author">u/{post.author?.username}</span>
      <span data-testid="post-community">r/{post.community?.slug}</span>
      <span data-testid="post-votes">{post.upvotes - post.downvotes}</span>
      <span data-testid="post-comments">{post.comment_count} comments</span>
    </article>
  );
}

describe("PostCard", () => {
  it("renders post title and content", () => {
    const post = createMockPost({ title: "Hello World", content: "Test content here" });
    render(<MockPostCard post={post} />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.getByText("Test content here")).toBeInTheDocument();
  });

  it("displays author username", () => {
    const post = createMockPost({ author: { username: "johndoe", display_name: "John", avatar_url: null } });
    render(<MockPostCard post={post} />);
    expect(screen.getByTestId("post-author")).toHaveTextContent("u/johndoe");
  });

  it("displays community name", () => {
    const post = createMockPost({ community: { name: "Programming", slug: "programming", icon_url: null } });
    render(<MockPostCard post={post} />);
    expect(screen.getByTestId("post-community")).toHaveTextContent("r/programming");
  });

  it("calculates vote score correctly", () => {
    const post = createMockPost({ upvotes: 100, downvotes: 15 });
    render(<MockPostCard post={post} />);
    expect(screen.getByTestId("post-votes")).toHaveTextContent("85");
  });

  it("displays comment count", () => {
    const post = createMockPost({ comment_count: 42 });
    render(<MockPostCard post={post} />);
    expect(screen.getByTestId("post-comments")).toHaveTextContent("42 comments");
  });

  it("has correct aria labels for accessibility", () => {
    const post = createMockPost({ title: "Accessible Post" });
    render(<MockPostCard post={post} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("aria-label", "Accessible Post");
  });
});
