import { describe, it, expect } from "vitest";
import { render, screen } from "../utils";

// ─── Accessibility test suite ───────────────────────────────
// Tests for WCAG compliance patterns used across the app

function AccessibleForm() {
  return (
    <form aria-label="Test form" role="form">
      <div>
        <label htmlFor="email-input">Email</label>
        <input
          id="email-input"
          type="email"
          aria-required="true"
          aria-describedby="email-help"
          placeholder="you@example.com"
        />
        <span id="email-help" role="note">We'll never share your email.</span>
      </div>
      <div>
        <label htmlFor="password-input">Password</label>
        <input
          id="password-input"
          type="password"
          aria-required="true"
          minLength={8}
        />
      </div>
      <button type="submit" aria-label="Submit form">Submit</button>
    </form>
  );
}

function AccessibleModal() {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-desc">
      <h2 id="modal-title">Confirm Action</h2>
      <p id="modal-desc">Are you sure you want to proceed?</p>
      <button aria-label="Confirm">Yes</button>
      <button aria-label="Cancel">No</button>
    </div>
  );
}

function AccessibleNav() {
  return (
    <nav aria-label="Main navigation" role="navigation">
      <ul role="list">
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/communities">Communities</a></li>
        <li><a href="/search">Search</a></li>
      </ul>
    </nav>
  );
}

describe("Accessibility Patterns", () => {
  describe("Forms", () => {
    it("all inputs have associated labels", () => {
      render(<AccessibleForm />);
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("required fields have aria-required", () => {
      render(<AccessibleForm />);
      expect(screen.getByLabelText("Email")).toHaveAttribute("aria-required", "true");
      expect(screen.getByLabelText("Password")).toHaveAttribute("aria-required", "true");
    });

    it("inputs have descriptive help text via aria-describedby", () => {
      render(<AccessibleForm />);
      const email = screen.getByLabelText("Email");
      expect(email).toHaveAttribute("aria-describedby", "email-help");
      expect(screen.getByRole("note")).toHaveTextContent("We'll never share your email.");
    });

    it("submit button has aria-label", () => {
      render(<AccessibleForm />);
      expect(screen.getByRole("button", { name: "Submit form" })).toBeInTheDocument();
    });
  });

  describe("Modals/Dialogs", () => {
    it("dialog has correct role and aria attributes", () => {
      render(<AccessibleModal />);
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
      expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
      expect(dialog).toHaveAttribute("aria-describedby", "modal-desc");
    });

    it("action buttons have aria-labels", () => {
      render(<AccessibleModal />);
      expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("nav has aria-label", () => {
      render(<AccessibleNav />);
      expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Main navigation");
    });

    it("current page link has aria-current", () => {
      render(<AccessibleNav />);
      expect(screen.getByText("Home")).toHaveAttribute("aria-current", "page");
    });

    it("all navigation links are accessible", () => {
      render(<AccessibleNav />);
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(3);
      links.forEach((link: any) => {
        expect(link).toHaveAttribute("href");
      });
    });
  });
});
