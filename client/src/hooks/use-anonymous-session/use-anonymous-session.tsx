import { useEffect } from "react";

export function useAnonymousSession() {
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const trySetCookie = () => {
      const analytics = (window as any).analytics;
      if (!analytics || !analytics.user) return;

      const anonymousId = analytics.user().anonymousId?.();
      if (anonymousId) {
        document.cookie = `session_id=${anonymousId}; path=/; max-age=${
          7 * 24 * 60 * 60
        }`;
        clearInterval(interval);
      }
    };

    interval = setInterval(trySetCookie, 500);
    trySetCookie();

    return () => clearInterval(interval);
  }, []);
}
