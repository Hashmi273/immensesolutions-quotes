import { createFileRoute } from "@tanstack/react-router";
import { QuotationBuilder } from "@/components/quotation/QuotationBuilder";

const title = "Quotation Manager — Immense Smart Solution";
const description =
  "Build, price and export professional A4 business proposals for Bulk SMS, RCS, WhatsApp API, OBD, IVR and SMPP in one click.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuotationBuilder,
});
