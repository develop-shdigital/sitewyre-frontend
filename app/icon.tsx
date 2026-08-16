import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#eef0f9",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 1 L19 6 V14 L10 19 L1 14 V6 Z" stroke="#15141b" strokeWidth="1.4" />
          <path d="M10 1 V19 M1 6 L19 14 M19 6 L1 14" stroke="#ff5a1f" strokeWidth="1" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
