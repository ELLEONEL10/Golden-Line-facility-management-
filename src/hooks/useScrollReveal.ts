import { useEffect, useRef, type RefObject } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.1): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          } else {
            entry.target.classList.remove("in");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -30px 0px" }
    );

    const animEls = el.querySelectorAll(".anim");
    animEls.forEach((a) => observer.observe(a));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
