"use client";

import { useEffect, useState } from "react";

/** Feature-detects WebGL so the 3D hero can fall back to a CSS/DOM scene. */
export function useWebglSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
