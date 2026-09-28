import type { ImageMetadata } from "astro";
import type { ServiceImage } from "./types";
import consultation from "../assets/gen/consultation.webp";
import library from "../assets/gen/library.webp";
import justice from "../assets/gen/cta-justice.webp";
import pillars from "../assets/gen/hero-pillars.webp";
import insightProperty from "../assets/gen/insight-property.webp";
import insightWomen from "../assets/gen/insight-women.webp";
import insightDispute from "../assets/gen/insight-dispute.webp";
import teamCourt from "../assets/team-hero.webp";

export const serviceImages: Record<ServiceImage, ImageMetadata> = {
  consultation,
  library,
  justice,
  pillars,
  insightProperty,
  insightWomen,
  insightDispute,
  teamCourt,
};

/** Focal points so each photo crops well in wide and portrait frames. */
export const serviceImagePosition: Record<ServiceImage, string> = {
  consultation: "50% 30%",
  library: "50% 50%",
  justice: "18% 50%",
  pillars: "50% 50%",
  insightProperty: "35% 60%",
  insightWomen: "55% 50%",
  insightDispute: "55% 50%",
  teamCourt: "44% 35%",
};
