export type ProductKey =
  | "bulkSms"
  | "rcs"
  | "whatsapp"
  | "obd"
  | "ivr"
  | "smpp";

export interface RateRow {
  slabLabel: string;
  slabValue: string;
  rateLabel: string;
  rateValue: string;
}

export interface Pricing {
  setup: string;
  monthly: string;
  price: string;
  gst: string;
  total: string;
}

export interface Product {
  key: ProductKey;
  enabled: boolean;
  /** Banner heading, e.g. "SMS Services & Pricing" */
  title: string;
  /** Small label inside the round icon */
  badge: string;
  /** Sub heading above the rate table */
  subTitle: string;
  intro: string;
  tables: RateRow[];
  bullets: string[];
  pricing: Pricing;
}

export interface ClientInfo {
  clientName: string;
  companyName: string;
  proposalNumber: string;
  date: string;
}

export interface AccountManager {
  name: string;
  designation: string;
  mobile: string;
  email: string;
}

export interface Quotation {
  client: ClientInfo;
  products: Product[];
  manager: AccountManager;
}

const emptyPricing = (setup = "0", monthly = "0"): Pricing => ({
  setup,
  monthly,
  price: "0",
  gst: "18",
  total: "0",
});

export const PRODUCT_LABELS: Record<ProductKey, string> = {
  bulkSms: "Bulk SMS",
  rcs: "RCS Business Messaging",
  whatsapp: "WhatsApp Business API",
  obd: "OBD Voice Calls",
  ivr: "IVR Solutions",
  smpp: "SMPP Connectivity",
};

export const defaultQuotation = (): Quotation => ({
  client: {
    clientName: "KISSHT",
    companyName: "KISSHT",
    proposalNumber: "ISS/2026/001",
    date: "",
  },
  manager: {
    name: "Rushikesh Limje",
    designation: "Sales & Marketing Manager",
    mobile: "+91 9768566466",
    email: "sales@immensesmartsolutions.in",
  },
  products: [
    {
      key: "bulkSms",
      enabled: true,
      title: "SMS Services & Pricing",
      badge: "SMS",
      subTitle: "Promotional SMS",
      intro:
        "Immense Smart Solution offers competitive SMS services designed to meet your business communication needs. Our services are routed through reliable promotional routes, ensuring the swift and secure delivery of your messages.",
      tables: [
        {
          slabLabel: "Credit Slab",
          slabValue: "Per SMS",
          rateLabel: "SMS Rate",
          rateValue: "0.0675",
        },
      ],
      bullets: [
        "You will be charged only for delivered SMS.",
        "Undelivered credits will be refunded within 24 hours.",
        "Delivery: Non-DND & Partial DND Numbers.",
        "Delivery Ratio: 100%",
        "SMS Sending Time: 24 Hrs.",
        "DLT & Templates Support.",
        "Content approval TAT: 15 Minutes.",
        "Easy to use interface.",
        "REST API available with Postman collection and JSON format for easy integration.",
        "Comprehensive API documentation and sample requests are available.",
        "Technical assistance is available during the integration process.",
      ],
      pricing: emptyPricing(),
    },
    {
      key: "rcs",
      enabled: true,
      title: "RCS Business Messaging",
      badge: "RCS",
      subTitle: "RCS SMS",
      intro:
        "Immense Smart Solution delivers verified RCS Business Messaging with rich media, carousels and action buttons — giving your brand a trusted identity inside the native messaging inbox.",
      tables: [
        {
          slabLabel: "Credit Slab (Utility)",
          slabValue: "Per RCS",
          rateLabel: "RCS Rate",
          rateValue: "0.10 Paisa",
        },
      ],
      bullets: [
        "Agent: Promotional — Time: 10 AM to 7 PM (7 days a week).",
        "Message Limit: Four (4) messages per brand per user per month.",
        "Onboarding: GST Certificate, Company PAN / CIN.",
        "Logo Image (224x224 px, under 90KB — JPEG, JPG, PNG).",
        "Banner Image (1440x448 px, under 360KB — JPEG, JPG, PNG).",
        "Rich communication experience with higher engagement.",
        "Verified business identity.",
        "Secure & reliable messaging.",
      ],
      pricing: emptyPricing(),
    },
    {
      key: "whatsapp",
      enabled: true,
      title: "WhatsApp Services & Pricing",
      badge: "WA",
      subTitle: "Business WhatsApp (WABA)",
      intro:
        "Immense Smart Solution offers professional WhatsApp Business API services to help businesses engage, communicate and grow. Our official WhatsApp API solution is reliable, secure and built to deliver better customer conversations at scale.",
      tables: [
        {
          slabLabel: "Credit Slab (Marketing)",
          slabValue: "Per WhatsApp",
          rateLabel: "WhatsApp Rate",
          rateValue: "0.80",
        },
        {
          slabLabel: "Credit Slab (Utility)",
          slabValue: "Per WhatsApp",
          rateLabel: "WhatsApp Rate",
          rateValue: "0.10",
        },
      ],
      bullets: [
        "No Conversations Free BIC (Business Incoming).",
        "Free WhatsApp API Approval & Setup.",
        "Chat Automation.",
        "Bulk WhatsApp campaign notifications & campaign analytics.",
        "24 hours conversation window if same template is sent within the window.",
        "Zero Rental Charges.",
        "Zero Annual Maintenance Charges (AMC).",
        "Zero Hidden Charges.",
        "Transparent & Hassle-Free Pricing.",
      ],
      pricing: emptyPricing(),
    },
    {
      key: "obd",
      enabled: true,
      title: "OBD Voice Call Services",
      badge: "OBD",
      subTitle: "Voice Call - 30 Second",
      intro:
        "Reach your customers instantly with outbound voice broadcasting. Professional artist voice recording, DND & Non-DND delivery and round-the-clock campaign support.",
      tables: [
        {
          slabLabel: "Credit Slab",
          slabValue: "Per Voice Call",
          rateLabel: "Voice Rate 30 Sec-Pulse",
          rateValue: "0.095 Paisa/Voice",
        },
      ],
      bullets: [
        "Artist Voice Record (Male & Female).",
        "Delivery: Non-DND & DND Numbers.",
        "Sender ID: Virtual Number.",
        "Voice Sending Time: 24 Hrs.",
        "Voice approval TAT: 10 minutes.",
        "Voice Record TAT: 1 Day.",
        "24X7 Customer Care Support.",
        "Regular panel performance monitoring & tuning.",
        "Life time validity, 100% reliable services & reports.",
      ],
      pricing: emptyPricing(),
    },
    {
      key: "ivr",
      enabled: false,
      title: "IVR Solutions & Pricing",
      badge: "IVR",
      subTitle: "Cloud IVR",
      intro:
        "Automate inbound customer journeys with a cloud IVR built for scale — multi-level menus, call routing, recording and real-time reporting on a virtual number of your choice.",
      tables: [
        {
          slabLabel: "Credit Slab",
          slabValue: "Per Minute (Pulse 30 Sec)",
          rateLabel: "IVR Rate",
          rateValue: "0.30",
        },
      ],
      bullets: [
        "Multi-level IVR menu with smart call routing.",
        "Virtual number / toll-free number support.",
        "Call recording & downloadable reports.",
        "Sticky agent and working-hour routing.",
        "Missed call alerts over SMS & email.",
        "Real-time dashboard and live call monitoring.",
        "API & CRM integration support.",
      ],
      pricing: emptyPricing("5000", "2000"),
    },
    {
      key: "smpp",
      enabled: false,
      title: "SMPP Connectivity",
      badge: "SMPP",
      subTitle: "Direct SMPP Binds",
      intro:
        "High-throughput, carrier-grade SMPP connectivity for enterprises sending at volume — direct binds, low latency and guaranteed uptime with dedicated technical support.",
      tables: [
        {
          slabLabel: "Credit Slab",
          slabValue: "Per SMS (SMPP)",
          rateLabel: "SMPP Rate",
          rateValue: "0.060",
        },
      ],
      bullets: [
        "SMPP v3.4 direct bind (TX / RX / TRX).",
        "Dedicated throughput as per committed TPS.",
        "IP whitelisting & secure credentials.",
        "Real-time DLR push over SMPP.",
        "99.5% platform uptime commitment.",
        "Dedicated NOC & technical integration support.",
      ],
      pricing: emptyPricing("10000", "5000"),
    },
  ],
});

export const currency = (v: string) => {
  const n = Number(String(v).replace(/[^0-9.-]/g, ""));
  if (!isFinite(n)) return v;
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const computeTotal = (p: Pricing) => {
  const num = (v: string) => Number(String(v).replace(/[^0-9.-]/g, "")) || 0;
  const base = num(p.setup) + num(p.monthly) + num(p.price);
  const gst = (base * num(p.gst)) / 100;
  return base + gst;
};
