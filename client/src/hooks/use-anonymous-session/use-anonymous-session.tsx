import { useEffect } from "react";

export function useAnonymousSession() {
  useEffect(() => {
    if (!window.analytics || !window.analytics.user) return;

    const anonymousId = window.analytics.user().anonymousId();
    if (!anonymousId) return;

    document.cookie = `session_id=${anonymousId}; path=/; max-age=${
      7 * 24 * 60 * 60
    }`;
  }, []);
}
