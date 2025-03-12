import { useCallback, useRef } from "react";

const useInfiniteScroll = (
  setCurrentPage: (callback: (prev: number) => number) => void,
  totalPages?: number
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && totalPages && totalPages > 1) {
          setCurrentPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [setCurrentPage, totalPages]
  );

  return lastElementRef;
};

export default useInfiniteScroll;
