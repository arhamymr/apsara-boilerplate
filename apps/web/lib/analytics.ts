import { sendGAEvent } from "@next/third-parties/google";

// Event tracking utility for Google Analytics
export const GA = {
  // Track custom events
  track: (eventName: string, parameters?: Record<string, any>) => {
    sendGAEvent("event", eventName, parameters || {});
  },

  // Track page views (if needed for manual tracking)
  pageview: (page_path?: string) => {
    sendGAEvent("event", "page_view", { page_path });
  },

  // Track user interactions
  trackClick: (elementName: string, elementType?: string) => {
    GA.track("click", {
      element_name: elementName,
      element_type: elementType || "button",
    });
  },

  // Track form submissions
  trackFormSubmit: (formName: string) => {
    GA.track("form_submit", {
      form_name: formName,
    });
  },

  // Track user engagement
  trackEngagement: (action: string, category: string) => {
    GA.track("engagement", {
      action,
      category,
    });
  },

  // Track conversions
  trackConversion: (value?: number, currency?: string) => {
    GA.track("conversion", {
      value,
      currency,
    });
  },
};
