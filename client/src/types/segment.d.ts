export {};

declare global {
  interface Window {
    analytics: {
      load: (key: string) => void;
      page: (name?: string, properties?: Record<string, any>) => void;
      track: (event: string, properties?: Record<string, any>) => void;
      identify: (userId: string, traits?: Record<string, any>) => void;
      reset: () => void;
      [key: string]: any;
    };
  }
}
