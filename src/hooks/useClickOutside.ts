import { useEffect, useRef } from "react";

export default function useClickOutside<T extends HTMLElement>(
  callback: () => void,
) {
  // 1. Create a ref to attach to your element
  const ref = useRef<T | null>(null);

  useEffect(() => {
    // 2. Handle click events
    const handleClick = (event: MouseEvent) => {
      const element = ref.current;

      // 3. Check if click is outside the element
      if (element && !element.contains(event.target as Node)) {
        callback();
      }
    };

    // 4. Add event listener
    document.addEventListener("mousedown", handleClick);

    // 5. Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [callback]);

  // 6. Return the ref
  return ref;
}
