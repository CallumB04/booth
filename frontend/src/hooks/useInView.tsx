import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

const useInView = <T extends HTMLElement = HTMLDivElement>({
    threshold = 0.15,
    rootMargin = "0px 0px -10% 0px",
    triggerOnce = true,
}: UseInViewOptions = {}) => {
    const ref = useRef<T>(null);
    const [isInView, setIsInView] = useState<boolean>(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (triggerOnce) {
                        observer.unobserve(node);
                    }
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isInView] as const;
};

export default useInView;
