/**
 * Fixed, low-opacity film-grain texture over the whole viewport — the
 * tactile, "premium physical product" finish both reference sites share.
 * Pure CSS/SVG, no image asset, no client JS.
 */
export function GrainOverlay() {
  return (
    <svg aria-hidden className="pointer-events-none fixed inset-0 z-[70] h-full w-full opacity-[0.035] mix-blend-multiply">
      <filter id="grain-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  );
}
