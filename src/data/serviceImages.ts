import type { ImageMetadata } from "astro";
import type { ServiceImage } from "./types";
import consultation from "../assets/illustrations/consultation.webp";
import library from "../assets/illustrations/library.webp";
import justice from "../assets/illustrations/cta-justice.webp";
import pillars from "../assets/illustrations/hero-pillars.webp";
import insightProperty from "../assets/illustrations/insight-property.webp";
import insightWomen from "../assets/illustrations/insight-women.webp";
import insightDispute from "../assets/illustrations/insight-dispute.webp";
import teamCourt from "../assets/firm/team-court-banner.webp";

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
