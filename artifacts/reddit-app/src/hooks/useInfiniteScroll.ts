import { useEffect, useRef, useCallback } from "react";

export function useInfiniteScroll(onLoadMore: () => void, hasMore: boolean, isLoading: boolean) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
      rootMargin: "300px",
    });
    const el = sentinelRef.current;
    if (el) observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [handleIntersect]);

  return { sentinelRef };
}
