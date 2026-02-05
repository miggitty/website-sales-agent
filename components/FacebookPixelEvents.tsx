"use client";

import { useEffect } from "react";

const FB_PIXEL_ID = "350380376911864";

export default function FacebookPixelEvents() {
  useEffect(() => {
    // Only run once
    if (typeof window !== "undefined" && !(window as any).fbq) {
      // Create fbq function
      const fbq = function (...args: any[]) {
        if ((fbq as any).callMethod) {
          (fbq as any).callMethod.apply(fbq, args);
        } else {
          (fbq as any).queue.push(args);
        }
      } as any;

      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];

      (window as any).fbq = fbq;
      (window as any)._fbq = fbq;

      // Load the script
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);

      // Init and track
      (window as any).fbq("init", FB_PIXEL_ID);
      (window as any).fbq("track", "PageView");
    }
  }, []);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
