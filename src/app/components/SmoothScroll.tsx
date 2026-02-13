"use client";

import { ReactLenis } from "lenis/react";
import React from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ duration: 1.15, lerp: 0.085, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
