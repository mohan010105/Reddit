import { motion } from "framer-motion";

// ─── Post Card Skeleton ────────────────────────────────────────────────────
export function PostCardSkeleton() {
  return (
    <div className="bg-card border border-card-border rounded-xl p-4 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full skeleton-shimmer" />
        <div className="space-y-1.5 flex-1">
          <div className="h-3 w-24 rounded skeleton-shimmer" />
          <div className="h-2.5 w-16 rounded skeleton-shimmer" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded skeleton-shimmer" />
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="h-3 w-5/6 rounded skeleton-shimmer" />
      </div>
      <div className="flex items-center gap-4 pt-2">
        <div className="h-7 w-20 rounded-full skeleton-shimmer" />
        <div className="h-7 w-16 rounded-full skeleton-shimmer" />
        <div className="h-7 w-14 rounded-full skeleton-shimmer" />
      </div>
    </div>
  );
}

// ─── Feed Skeleton ─────────────────────────────────────────────────────────
export function FeedSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <PostCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Community Card Skeleton ───────────────────────────────────────────────
export function CommunityCardSkeleton() {
  return (
    <div className="bg-card border border-card-border rounded-xl p-4 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full skeleton-shimmer" />
        <div className="space-y-1.5 flex-1">
          <div className="h-4 w-32 rounded skeleton-shimmer" />
          <div className="h-3 w-20 rounded skeleton-shimmer" />
        </div>
        <div className="h-8 w-20 rounded-lg skeleton-shimmer" />
      </div>
      <div className="h-3 w-full rounded skeleton-shimmer" />
    </div>
  );
}

// ─── Profile Skeleton ──────────────────────────────────────────────────────
export function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-32 rounded-xl skeleton-shimmer" />
      <div className="flex items-center gap-4 -mt-10 px-4">
        <div className="w-20 h-20 rounded-full border-4 border-card skeleton-shimmer" />
        <div className="space-y-2 flex-1 pt-8">
          <div className="h-5 w-40 rounded skeleton-shimmer" />
          <div className="h-3 w-24 rounded skeleton-shimmer" />
        </div>
      </div>
      <div className="px-4 space-y-2">
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="h-3 w-3/4 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}

// ─── Sidebar Skeleton ──────────────────────────────────────────────────────
export function SidebarSkeleton() {
  return (
    <div className="bg-card border border-card-border rounded-xl p-4 space-y-3 animate-pulse">
      <div className="h-4 w-32 rounded skeleton-shimmer mb-3" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full skeleton-shimmer" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-24 rounded skeleton-shimmer" />
            <div className="h-2.5 w-16 rounded skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Stats Card Skeleton ───────────────────────────────────────────────────
export function StatsCardSkeleton() {
  return (
    <div className="bg-card border border-card-border rounded-xl p-6 space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded skeleton-shimmer" />
        <div className="w-8 h-8 rounded-lg skeleton-shimmer" />
      </div>
      <div className="h-8 w-32 rounded skeleton-shimmer" />
      <div className="h-2.5 w-20 rounded skeleton-shimmer" />
    </div>
  );
}

// ─── Table Row Skeleton ────────────────────────────────────────────────────
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 p-3 animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className={`h-4 rounded skeleton-shimmer ${i === 0 ? "w-8" : "flex-1"}`} />
      ))}
    </div>
  );
}
