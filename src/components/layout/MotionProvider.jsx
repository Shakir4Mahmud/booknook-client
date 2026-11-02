"use client";

import { MotionConfig } from "framer-motion";

// Respects the "reduce motion" setting of the visitor's device.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}