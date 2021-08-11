import { RefObject, useEffect } from "react";

interface Options extends IntersectionObserverInit {
  target?: RefObject<Element>;
  onIntersect: () => void;
  enabled: boolean | undefined;
}

function useIntersectionObserver({
  root = null,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = "0px",
  enabled = true,
}: Options) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [enabled, root, rootMargin, threshold, target, onIntersect]);
}

export default useIntersectionObserver;
