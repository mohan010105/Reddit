import { motion } from "framer-motion";
import { FileText, Search, Users, Bell, MessageCircle, BookmarkIcon, type LucideIcon } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "search" | "posts" | "comments" | "notifications" | "communities" | "saved";
}

const variantIcons: Record<string, LucideIcon> = {
  search: Search,
  posts: FileText,
  comments: MessageCircle,
  notifications: Bell,
  communities: Users,
  saved: BookmarkIcon,
};

const variantColors: Record<string, string> = {
  default: "bg-muted/60 text-muted-foreground",
  search: "bg-blue-500/10 text-blue-500",
  posts: "bg-orange-500/10 text-orange-500",
  comments: "bg-purple-500/10 text-purple-500",
  notifications: "bg-emerald-500/10 text-emerald-500",
  communities: "bg-cyan-500/10 text-cyan-500",
  saved: "bg-amber-500/10 text-amber-500",
};

export function EmptyState({ icon: IconProp, title, description, action, variant = "default" }: EmptyStateProps) {
  const Icon = IconProp || variantIcons[variant] || FileText;
  const colorClass = variantColors[variant] || variantColors.default;

  return (
    <motion.div
      {...fadeInUp}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      role="status"
      aria-label={title}
    >
      <div className={`w-16 h-16 rounded-2xl ${colorClass} flex items-center justify-center mb-5`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-5">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}

// ─── Preset Empty States ──────────────────────────────────
export function NoPostsEmpty({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      variant="posts"
      title="No posts yet"
      description="Be the first to start a discussion! Create a post and share your thoughts with the community."
      action={onCreate ? { label: "Create Post", onClick: onCreate } : undefined}
    />
  );
}

export function NoCommentsEmpty() {
  return (
    <EmptyState
      variant="comments"
      title="No comments yet"
      description="Start the conversation by leaving the first comment."
    />
  );
}

export function NoSearchResults({ query }: { query: string }) {
  return (
    <EmptyState
      variant="search"
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try different keywords or check your spelling.`}
    />
  );
}

export function NoNotifications() {
  return (
    <EmptyState
      variant="notifications"
      title="All caught up!"
      description="You don't have any notifications right now. Engage with the community to start getting updates."
    />
  );
}

export function NoSavedPosts() {
  return (
    <EmptyState
      variant="saved"
      title="No saved posts"
      description="Posts you save will appear here. Bookmark posts to read them later."
    />
  );
}

export function NoCommunitiesJoined({ onBrowse }: { onBrowse?: () => void }) {
  return (
    <EmptyState
      variant="communities"
      title="No communities joined"
      description="Join communities to see posts in your feed and connect with like-minded people."
      action={onBrowse ? { label: "Browse Communities", onClick: onBrowse } : undefined}
    />
  );
}
