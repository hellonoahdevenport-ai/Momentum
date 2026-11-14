import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Momentum",
    short_name: "Momentum",
    description:
      "Momentum is a working title for a medical and nursing education product: practice clinical reasoning in fictional, interactive cases. For education and simulation only.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcf8",
    theme_color: "#355cff",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
