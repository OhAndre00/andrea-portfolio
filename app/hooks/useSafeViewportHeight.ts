// hooks/useSafeViewportHeight.ts
import { useEffect, useState } from "react";

export function useSafeViewportHeight(limit: number = 700) {
  const [isLow, setIsLow] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsLow(window.innerHeight < limit);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [limit]);

  return isLow;
}
