export type ProductKey =
  | "cpaas"
  | "bulkSms"
  | "rcs"
  | "metaWhatsapp"
  | "virtualWhatsapp"
  | "obd"
  | "ivr"
  | "mca"
  | "email"
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
  setupLabel?: string;
  monthlyLabel?: string;
  priceLabel?: string;
  gstLabel?: string;
  totalLabel?: string;
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
  agentLimitLabel?: string;
  agentLimitValue?: string;
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

const emptyPricing = (
  setup = "0",
  monthly = "0",
  setupLabel = "Setup Charges",
  monthlyLabel = "Monthly Charges",
  priceLabel = "Price",
  gstLabel = "GST (%)",
  totalLabel = "Final Total",
): Pricing => ({
  setup,
  monthly,
  price: "0",
  gst: "18",
  total: "0",
  setupLabel,
  monthlyLabel,
  priceLabel,
  gstLabel,
  totalLabel,
});

export const PRODUCT_LABELS: Record<ProductKey, string> = {
  cpaas: "CPaaS Omni Communication",
  bulkSms: "SMS",
  rcs: "RCS",
  metaWhatsapp: "Meta WhatsApp",
  virtualWhatsapp: "Virtual WhatsApp",
  obd: "OBD",
  ivr: "IVR",
  mca: "MCA",
  email: "Email",
  smpp: "SMPP",
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
    email: "sales@immenseair.in",
  },
  products: [
    {
      key: "cpaas",
      enabled: true,
      title: "CPaaS Omni Communication Panel",
      badge: "CPaaS",
      subTitle: "Omni Messaging",
      intro:
        "Immense Smart Solution offers a unified CPaaS platform to manage SMS, RCS, WhatsApp, Voice and Email from a single dashboard. Our intelligent failover ensures your message is delivered through the best available channel, giving you higher reach and better results.",
      tables: [
        {
          slabLabel: "Particulars",
          slabValue: "Successful Delivery – Any Channel (SMS / RCS / WhatsApp)",
          rateLabel: "Average Rate",
          rateValue: "₹ 0.20 / Message",
        },
        {
          slabLabel: "Particulars",
          slabValue: "Platform Setup Charges",
          rateLabel: "Average Rate",
          rateValue: "₹ 0",
        },
        {
          slabLabel: "Particulars",
          slabValue: "Monthly Platform Charges",
          rateLabel: "Average Rate",
          rateValue: "₹ 0*",
        },
        {
          slabLabel: "Particulars",
          slabValue: "GST (%)",
          rateLabel: "Average Rate",
          rateValue: "18%",
        },
      ],
      bullets: [
        "Automatic failover from SMS → RCS → WhatsApp.",
        "You pay only for the final successfully delivered message.",
        "One customer = One count, irrespective of the channel used.",
        "Single dashboard to manage all communication channels.",
        "Real-time delivery reports and analytics.",
        "API & SMPP integration support.",
        "Template management and campaign scheduling.",
        "Secure and reliable platform.",
        "Technical assistance is available during the integration process.",
      ],
      pricing: emptyPricing("0", "0"),
    },
    {
      key: "bulkSms",
      enabled: true,
      title: "SMS Services & Pricing",
      badge: "SMS",
      subTitle: "Promotional & Transactional SMS",
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
      key: "metaWhatsapp",
      enabled: true,
      title: "Meta WhatsApp Services & Pricing",
      badge: "WABA",
      subTitle: "Official Meta WhatsApp Business API",
      intro:
        "Immense Smart Solution offers official Meta WhatsApp Business API services to help businesses engage, communicate and grow. Our Meta WhatsApp solution is reliable, secure and built to deliver better customer conversations at scale.",
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
      key: "virtualWhatsapp",
      enabled: true,
      title: "Virtual WhatsApp Services",
      badge: "V-WA",
      subTitle: "Promotional WhatsApp",
      intro:
        "Immense Smart Solution offers Virtual WhatsApp services powered by the official WhatsApp Business API. Engage your customers with real conversations, rich media and automated messaging. Perfect for real estate and growing businesses.",
      tables: [
        {
          slabLabel: "Credit Slab (Utility)",
          slabValue: "Per WhatsApp",
          rateLabel: "WhatsApp Rate",
          rateValue: "0.10 Paisa (OD Price)",
        },
      ],
      bullets: [
        "Sender ID virtual Mobile number.",
        "Image size: - No limit.",
        "4 image & text Will Charged 1 Credits.",
        "Real Estate Special Route.",
        "Delivery: - Non-DND & DND Numbers.",
        "WhatsApp Sending Time: - 10 AM to 7 PM.",
        "No Documents Required for Service Activation.",
        "Easy To use interface.",
        "Virtual Sender ID: Use a virtual mobile number as sender ID.",
        "Media Support: Send images without any size limit.",
        "Credit Based: 4 image & text charged 1 Credit.",
        "Wide Delivery: Supports both Non-DND & DND numbers.",
        "Flexible Timing: Send WhatsApp messages from 10 AM to 7 PM.",
        "Simple and easy to use platform.",
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
      enabled: true,
      title: "IVR Solutions & Pricing",
      badge: "IVR",
      subTitle: "Cloud IVR Solutions",
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
      agentLimitLabel: "Total Agent Limit",
      agentLimitValue: "Unlimited",
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
      key: "mca",
      enabled: true,
      title: "Missed Call Alert (MCA) Services",
      badge: "MCA",
      subTitle: "Missed Call Alert (MCA)",
      intro:
        "Immense Smart Solution offers Missed Call Alert (MCA) services to help you capture leads, run polls, and verify users automatically with zero cost to the caller. Our automated missed call solution ensures instant responses and real-time data integration for better customer engagement.",
      tables: [
        {
          slabLabel: "Credit Slab (Utility)",
          slabValue: "Per Missed Call",
          rateLabel: "MCA Rate",
          rateValue: "0.015 Paisa",
        },
      ],
      bullets: [
        "Instant Lead Capture: Auto-disconnect calls after 1-2 rings and trigger immediate SMS / WhatsApp response.",
        "Real-time Webhook & API: Instant notification push to CRM upon receiving missed call.",
        "Virtual Number Integration: Dedicated virtual landline or mobile numbers assigned for campaign tracking.",
        "Unlimited Capacity: Concurrent call handling with detailed analytics and caller location reporting.",
        "Easy Campaign Management: Create and manage missed call campaigns from a simple dashboard.",
        "Real-time Reports: Detailed logs with date, time, mobile number and location data.",
        "Wide Compatibility: Works across all telecom operators (Non-DND & DND numbers).",
        "No Cost to Caller: Absolutely free for your customers.",
        "Reliable & Scalable: High uptime engines to handle large volume campaigns.",
        "24x7 Support: Technical assistance and campaign monitoring.",
      ],
      pricing: emptyPricing("0", "0"),
    },
    {
      key: "email",
      enabled: true,
      title: "Enterprise Email Services",
      badge: "EMAIL",
      subTitle: "Transactional & Bulk Email",
      intro:
        "Immense Smart Solution offers high-deliverability enterprise email services for transactional alerts, invoices, notifications, and promotional marketing campaigns.",
      tables: [
        {
          slabLabel: "Credit Slab",
          slabValue: "Per Email",
          rateLabel: "Email Rate",
          rateValue: "0.05",
        },
      ],
      bullets: [
        "High inbox deliverability with IP reputation management.",
        "Custom domain authentication (SPF, DKIM, DMARC).",
        "SMTP & REST API integration support.",
        "Real-time open, click, bounce, and unsubscribe tracking.",
        "HTML template builder and responsive templates.",
        "Dedicated or shared IP pool options.",
        "24x7 Technical support and deliverability tuning.",
      ],
      pricing: emptyPricing("1000", "500"),
    },
    {
      key: "smpp",
      enabled: true,
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
