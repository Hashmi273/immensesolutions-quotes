import {
  BrandHeader,
  CornerBlob,
  DotGrid,
  Glyph,
  LogoMark,
  NAVY,
  ORANGE,
  PageFooter,
  RibbonTitle,
} from "./brand";
import { computeTotal, currency, type Product, type Quotation } from "@/lib/quotation";
import { AutoFit } from "./AutoFit";
import { useFocusProps } from "./preview-focus";

export function QuotationDocument({ data }: { data: Quotation }) {
  const active = data.products.filter((p) => p.enabled);
  return (
    <>
      <CoverPage data={data} />
      {active.map((p) => (
        <ProductPage key={p.key} product={p} />
      ))}
      <ContactPage data={data} />
    </>
  );
}

/* --------------------------------- Cover --------------------------------- */

function CoverPage({ data }: { data: Quotation }) {
  const services = ["SMS", "WhatsApp", "Meta Verified", "IVR & OBD", "API"];
  const proposalFx = useFocusProps("client:proposal");
  const dateFx = useFocusProps("client:date");
  return (
    <section id="page-cover" data-page="cover" className="a4-page shadow-page">
      {/* top-right navy wave */}
      <svg
        className="absolute right-0 top-0"
        width="420"
        height="430"
        viewBox="0 0 420 430"
        fill="none"
        aria-hidden="true"
      >
        <path d="M160 0h260v430c-90-40-40-150-120-220C230 150 120 120 160 0Z" fill={NAVY} />
        <path
          d="M120 0c-30 130 80 155 160 215 80 62 30 175 120 215"
          stroke={ORANGE}
          strokeWidth="9"
          fill="none"
        />
      </svg>
      <DotGrid className="absolute right-[16mm] top-[10mm]" rows={5} cols={6} gap={4.4} />

      <div className="absolute left-[16mm] top-[13mm] flex items-center gap-[4mm]">
        <LogoMark size={58} />
        <div className="leading-none">
          <div className="font-display font-extrabold" style={{ color: NAVY, fontSize: "8mm" }}>
            IMMENSE AIR
          </div>
          <div
            className="font-display font-extrabold mt-[1.5mm]"
            style={{ color: ORANGE, fontSize: "8mm" }}
          >
            PVT LTD
          </div>

        </div>
      </div>
      <div className="absolute left-[16mm] top-[38mm]" style={{ fontSize: "4mm", color: NAVY }}>
        <span className="font-semibold">Smart Communication. </span>
        <span className="font-semibold" style={{ color: ORANGE }}>
          Stronger Results.
        </span>
        <div style={{ width: "24mm", height: "1.1mm", background: ORANGE, marginTop: "3mm" }} />
      </div>

      <h1
        className="absolute left-[16mm] top-[55mm] font-display font-black leading-[0.88]"
        style={{ fontSize: "21mm", letterSpacing: "-0.4mm" }}
      >
        <span style={{ color: NAVY, display: "block" }}>BUSINESS</span>
        <span style={{ color: ORANGE, display: "block" }}>PROPOSAL</span>
      </h1>

      <div className="absolute left-[16mm] top-[110mm] flex items-center gap-[3mm]">
        <span style={{ width: "26mm", height: "1.6mm", background: NAVY }} />
        <span style={{ width: "16mm", height: "1.6mm", background: ORANGE }} />
        <span style={{ width: "18mm", height: "1.6mm", background: NAVY }} />
        {[NAVY, ORANGE, NAVY].map((c, i) => (
          <span key={i} style={{ width: "2.4mm", height: "2.4mm", borderRadius: 99, background: c }} />
        ))}
      </div>

      {/* handshake medallion */}
      <div className="absolute right-[14mm] top-[92mm]">
        <svg width="200" height="200" viewBox="0 0 230 230" fill="none" aria-hidden="true">
          <circle cx="115" cy="115" r="112" stroke="#e8ecf4" strokeWidth="2" />
          <circle cx="115" cy="115" r="88" stroke="#f6d9cc" strokeWidth="2" />
          <rect x="78" y="60" width="76" height="96" rx="6" stroke={NAVY} strokeWidth="5" fill="#fff" />
          <path d="M92 84h48M92 100h48M92 116h30" stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
          <path
            d="M70 130c10-8 20-4 28 4l16 14c5 5 2 12-5 12-4 0-8-2-12-6"
            stroke={NAVY}
            strokeWidth="5"
            fill="#fff"
            strokeLinejoin="round"
          />
          <circle cx="158" cy="124" r="22" fill={ORANGE} />
          <path d="m148 124 7 7 13-14" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      <p
        className="absolute left-[16mm] top-[122mm] leading-[1.75]"
        style={{ width: "88mm", fontSize: "3.6mm", color: "#3c4a63" }}
      >
        We are pleased to present our Communication Solutions that empower your business to connect,
        engage, and grow faster with our reliable and innovative messaging services.
      </p>

      {/* prepared for card */}
      <div
        className="absolute left-[16mm] flex items-stretch"
        style={{
          top: "158mm",
          width: "120mm",
          border: `0.4mm solid ${NAVY}`,
          borderRadius: "3mm",
          padding: "4mm",
        }}
      >
        <PartyBlock
          focusId="client:name"
          label="Prepared For"
          value={data.client.clientName || "—"}
          bg={ORANGE}
        />
        <span style={{ width: "0.3mm", background: "#d9dee9", margin: "0 5mm" }} />
        <PartyBlock
          focusId="client:company"
          label="Our Valued Partner"
          value={data.client.companyName || "—"}
          bg={NAVY}
        />
      </div>

      {/* meta strip */}
      <div
        className="absolute left-[16mm] flex items-center justify-between"
        style={{
          top: "180mm",
          width: "120mm",
          background: "#f4f6fa",
          borderRadius: "2.5mm",
          padding: "3mm 5mm",
          fontSize: "3.2mm",
          color: NAVY,
        }}
      >
        <span {...proposalFx} style={{ maxWidth: "60mm", overflow: "hidden" }}>
          <span style={{ color: "#7b8699" }}>Proposal No: </span>
          <strong>{data.client.proposalNumber || "—"}</strong>
        </span>
        <span {...dateFx}>
          <span style={{ color: "#7b8699" }}>Date: </span>
          <strong>{data.client.date || "—"}</strong>
        </span>
      </div>

      {/* services */}
      <div
        className="absolute left-[16mm] flex items-center justify-between"
        style={{
          top: "196mm",
          width: "178mm",
          background: "#f4f6fa",
          borderRadius: "3mm",
          padding: "5mm 4mm",
        }}
      >
        {services.map((s, i) => (
          <div key={s} className="flex flex-1 flex-col items-center gap-[2.5mm]">
            <span
              className="flex items-center justify-center rounded-full"
              style={{
                width: "15mm",
                height: "15mm",
                background: i % 2 === 1 ? ORANGE : NAVY,
              }}
            >
              <Glyph name={["mail", "phone", "check", "phone", "doc"][i] as never} size={7} />
            </span>
            <span className="font-semibold" style={{ fontSize: "3.2mm", color: NAVY }}>
              {s}
            </span>
          </div>
        ))}
      </div>

      {/* tagline */}
      <div className="absolute left-[16mm] flex" style={{ top: "232mm" }}>
        <div
          className="flex items-center justify-center"
          style={{ width: "36mm", height: "26mm", background: ORANGE, borderRadius: "2mm 0 0 2mm" }}
        >
          <svg width="60" height="46" viewBox="0 0 60 46" fill="none" aria-hidden="true">
            <path d="M56 4 6 24l20 6 4 14 10-16 16-24Z" fill="#fff" />
          </svg>
        </div>
        <div
          style={{
            width: "84mm",
            background: NAVY,
            borderRadius: "0 2mm 2mm 0",
            padding: "5mm 6mm",
          }}
        >
          <div className="font-semibold" style={{ color: "#fff", fontSize: "4.4mm" }}>
            Smart Communication.
          </div>
          <div className="font-bold" style={{ color: ORANGE, fontSize: "4.6mm" }}>
            Stronger Results.
          </div>
          <div style={{ height: "0.5mm", background: ORANGE, margin: "2.5mm 0" }} />
          <div style={{ color: "#fff", fontSize: "2.8mm" }}>
            Powerful Solutions. Better Connections.
          </div>
        </div>
      </div>

      <PageFooter site="www.immenseair.com" email="info@immenseair.com" />
    </section>
  );
}

function PartyBlock({
  label,
  value,
  bg,
  focusId,
}: {
  label: string;
  value: string;
  bg: string;
  focusId: string;
}) {
  const fx = useFocusProps(focusId, "flex flex-1 items-center gap-[3.5mm] min-w-0");
  return (
    <div {...fx}>
      <span
        className="flex items-center justify-center rounded-full"
        style={{ width: "13mm", height: "13mm", background: bg, flexShrink: 0 }}
      >
        <Glyph name="user" size={7} />
      </span>
      <div className="min-w-0 flex-1">
        <div style={{ fontSize: "3mm", color: "#6c7789" }}>{label}</div>
        <AutoFit
          size={6}
          maxLines={2}
          className="font-display font-extrabold"
          style={{ color: ORANGE }}
        >
          {value}
        </AutoFit>
      </div>
    </div>
  );
}

/* ------------------------------ Product page ------------------------------ */

function ProductPage({ product }: { product: Product }) {
  const total = computeTotal(product.pricing);
  const k = product.key;
  const titleFx = useFocusProps(`${k}:title`, "absolute inset-x-0");
  const introFx = useFocusProps(`${k}:intro`, "absolute text-center leading-[1.8]");
  const subFx = useFocusProps(`${k}:sub`, "absolute flex items-center gap-[4mm]");
  const priceFx = useFocusProps(`${k}:pricing`, "absolute");
  const bulletFx = useFocusProps(`${k}:bullets`, "absolute");
  return (
    <section id={`page-${k}`} data-page={k} className="a4-page shadow-page">
      <CornerBlob />
      <DotGrid className="absolute left-[12mm] top-[8mm]" rows={4} cols={6} gap={4.2} />
      <BrandHeader compact />
      <DotGrid
        className="absolute right-[8mm] top-[105mm]"
        rows={4}
        cols={4}
        gap={4}
        dot={1.2}
        color="#d6dbe6"
      />

      <div {...titleFx} style={{ top: "42mm" }}>
        <RibbonTitle>{product.title}</RibbonTitle>
      </div>

      <p
        {...introFx}
        style={{ left: "26mm", right: "26mm", top: "60mm", fontSize: "3.5mm", color: "#3c4a63" }}
      >
        <strong style={{ color: NAVY }}>Immense Smart Solution</strong>{" "}
        {product.intro.replace(/^Immense Smart Solution\s*/, "")}
      </p>

      <div {...subFx} style={{ left: "20mm", right: "20mm", top: "88mm" }}>
        <span
          className="flex items-center justify-center rounded-full font-bold"
          style={{
            width: "17mm",
            height: "17mm",
            border: `1.4mm solid ${NAVY}`,
            color: NAVY,
            fontSize: "3.4mm",
          }}
        >
          {product.badge}
        </span>
        <span style={{ width: "14mm", height: "0.8mm", background: ORANGE }} />
        <span style={{ width: "2.6mm", height: "2.6mm", borderRadius: 99, background: ORANGE }} />
        <span className="min-w-0 flex-shrink" style={{ maxWidth: "96mm" }}>
          <AutoFit
            size={6}
            maxLines={2}
            align="center"
            className="font-display font-extrabold"
            style={{ color: ORANGE }}
          >
            {product.subTitle}
          </AutoFit>
        </span>
        <span style={{ width: "2.6mm", height: "2.6mm", borderRadius: 99, background: ORANGE }} />
        <span style={{ width: "14mm", height: "0.8mm", background: ORANGE }} />
      </div>

      <div {...priceFx} style={{ left: "24mm", right: "24mm", top: "108mm" }}>
        {product.tables.map((t, i) => (
          <table
            key={i}
            className="w-full"
            style={{ borderCollapse: "collapse", marginBottom: "4mm", fontSize: "3.6mm" }}
          >
            <thead>
              <tr>
                <Th>{t.slabLabel}</Th>
                <Th>{t.rateLabel}</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>{t.slabValue}</Td>
                <Td>{t.rateValue}</Td>
              </tr>
            </tbody>
          </table>
        ))}

        <table className="w-full" style={{ borderCollapse: "collapse", fontSize: "3.3mm" }}>
          <thead>
            <tr>
              <Th small>Setup Charges</Th>
              <Th small>Monthly Charges</Th>
              <Th small>Price</Th>
              <Th small>GST (%)</Th>
              <Th small>Final Total</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td small>₹ {currency(product.pricing.setup)}</Td>
              <Td small>₹ {currency(product.pricing.monthly)}</Td>
              <Td small>₹ {currency(product.pricing.price)}</Td>
              <Td small>{product.pricing.gst}%</Td>
              <Td small highlight>
                ₹{" "}
                {product.pricing.total && Number(product.pricing.total) > 0
                  ? currency(product.pricing.total)
                  : currency(String(total))}
              </Td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul
        {...bulletFx}
        style={{
          left: "24mm",
          right: "20mm",
          top: "168mm",
          bottom: "22mm",
          overflow: "hidden",
          fontSize: "3.35mm",
          color: "#33405a",
        }}
      >
        {product.bullets.slice(0, 13).map((b, i) => (
          <li key={i} className="flex gap-[3.5mm]" style={{ marginBottom: "3.2mm" }}>
            <span
              style={{
                width: "2.2mm",
                height: "2.2mm",
                borderRadius: 99,
                background: NAVY,
                marginTop: "1.8mm",
                flexShrink: 0,
              }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <PageFooter />
    </section>
  );
}

function Th({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <th
      style={{
        background: NAVY,
        color: "#fff",
        padding: small ? "2.6mm" : "3.4mm",
        fontWeight: 600,
        overflowWrap: "anywhere",
        border: "0.3mm solid #fff",
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  small,
  highlight,
}: {
  children: React.ReactNode;
  small?: boolean;
  highlight?: boolean;
}) {
  return (
    <td
      style={{
        padding: small ? "2.6mm" : "3.4mm",
        textAlign: "center",
        fontWeight: 600,
        color: highlight ? ORANGE : NAVY,
        overflowWrap: "anywhere",
        border: "0.3mm solid #d7dce7",
      }}
    >
      {children}
    </td>
  );
}

/* ------------------------------ Contact page ------------------------------ */

function ContactPage({ data }: { data: Quotation }) {
  const bank: Array<[string, string, "user" | "bank" | "pin" | "card" | "doc"]> = [
    ["Acc Name", "Immense Smart Solutions", "user"],
    ["Bank name", "HDFC Bank", "bank"],
    ["Branch Name", "Link Road Malad (W)", "pin"],
    ["Account Number", "50200048687714", "card"],
    ["Account Type", "Current", "doc"],
    ["IFSC Code", "HDFC0000411", "doc"],
  ];
  const mgrFx = useFocusProps("manager:card", "absolute flex gap-[6mm]");
  const footFx = useFocusProps("contact:footer", "absolute text-center");
  return (
    <section id="page-contact" data-page="contact" className="a4-page shadow-page">
      <CornerBlob />
      <DotGrid className="absolute left-[12mm] top-[8mm]" rows={4} cols={6} gap={4.2} />
      <BrandHeader compact />

      <div className="absolute inset-x-0 flex items-center justify-center gap-[4mm]" style={{ top: "38mm" }}>
        <span style={{ width: "3mm", height: "3mm", borderRadius: 99, background: ORANGE }} />
        <span style={{ width: "16mm", height: "1mm", background: ORANGE }} />
        <h2 className="font-display font-black" style={{ color: ORANGE, fontSize: "13mm" }}>
          Contact Us
        </h2>
        <span style={{ width: "16mm", height: "1mm", background: ORANGE }} />
        <span style={{ width: "3mm", height: "3mm", borderRadius: 99, background: ORANGE }} />
      </div>

      <div {...mgrFx} style={{ left: "26mm", right: "26mm", top: "62mm" }}>
        <span
          className="flex items-center justify-center rounded-full"
          style={{ width: "18mm", height: "18mm", background: NAVY, flexShrink: 0 }}
        >
          <Glyph name="user" size={10} />
        </span>
        <div
          className="min-w-0 flex-1"
          style={{ borderLeft: `0.5mm solid ${ORANGE}`, paddingLeft: "5mm", maxWidth: "120mm" }}
        >
          <AutoFit size={5.4} maxLines={2} className="font-bold" style={{ color: NAVY }}>
            {data.manager.name || "—"}
          </AutoFit>
          <AutoFit size={3.8} maxLines={2} style={{ color: "#3c4a63", marginTop: "1mm" }}>
            {data.manager.designation}
          </AutoFit>
          <div className="flex min-w-0 items-center gap-[2.5mm]" style={{ marginTop: "2.5mm" }}>
            <span
              className="flex items-center justify-center rounded-full"
              style={{ width: "5.6mm", height: "5.6mm", background: ORANGE, flexShrink: 0 }}
            >
              <Glyph name="phone" size={3.2} />
            </span>
            <AutoFit size={3.7} maxLines={1} style={{ color: NAVY }}>
              {data.manager.mobile}
            </AutoFit>
          </div>
          <div className="flex min-w-0 items-center gap-[2.5mm]" style={{ marginTop: "2mm" }}>
            <span
              className="flex items-center justify-center rounded-full"
              style={{ width: "5.6mm", height: "5.6mm", background: ORANGE, flexShrink: 0 }}
            >
              <Glyph name="mail" size={3.2} />
            </span>
            <AutoFit size={3.7} maxLines={1} style={{ color: "#1857c8" }}>
              {data.manager.email}
            </AutoFit>
          </div>
        </div>
      </div>

      <div className="absolute flex items-center gap-[5mm]" style={{ left: "26mm", right: "22mm", top: "100mm" }}>
        <span
          className="flex items-center justify-center rounded-full"
          style={{ width: "15mm", height: "15mm", background: NAVY, flexShrink: 0 }}
        >
          <Glyph name="bank" size={8} />
        </span>
        <h3 className="font-display font-extrabold" style={{ color: ORANGE, fontSize: "6.6mm" }}>
          Bank Account Details:
        </h3>
        <span style={{ flex: 1, height: "0.7mm", background: ORANGE }} />
        <span style={{ width: "3mm", height: "3mm", borderRadius: 99, background: ORANGE }} />
      </div>

      <div
        className="absolute"
        style={{
          left: "34mm",
          right: "26mm",
          top: "118mm",
          border: "0.3mm solid #dfe4ee",
          borderRadius: "3mm",
          padding: "3mm 5mm",
        }}
      >
        {bank.map(([k, v, icon], i) => (
          <div
            key={k}
            className="flex items-center gap-[4mm]"
            style={{
              padding: "1.4mm 0",
              borderBottom: i < bank.length - 1 ? "0.25mm solid #edf0f5" : "none",
              fontSize: "3.5mm",
            }}
          >
            <span
              className="flex items-center justify-center rounded-full"
              style={{ width: "6.4mm", height: "6.4mm", background: NAVY, flexShrink: 0 }}
            >
              <Glyph name={icon} size={3.6} />
            </span>
            <span className="font-semibold" style={{ color: NAVY, width: "38mm" }}>
              {k}
            </span>
            <span style={{ color: NAVY }}>:</span>
            <span style={{ color: "#3c4a63" }}>{v}</span>
          </div>
        ))}
      </div>

      <div className="absolute flex items-center gap-[5mm]" style={{ left: "26mm", right: "22mm", top: "184mm" }}>
        <span
          className="flex items-center justify-center rounded-full"
          style={{ width: "14mm", height: "14mm", background: NAVY, flexShrink: 0 }}
        >
          <Glyph name="doc" size={7.5} />
        </span>
        <h3 className="font-display font-extrabold" style={{ color: ORANGE, fontSize: "6.2mm" }}>
          Terms &amp; Conditions: -
        </h3>
        <span style={{ flex: 1, height: "0.7mm", background: ORANGE }} />
        <span style={{ width: "3mm", height: "3mm", borderRadius: 99, background: ORANGE }} />
      </div>

      <ul className="absolute" style={{ left: "42mm", top: "198mm", fontSize: "3.5mm", color: "#33405a" }}>
        {[
          "No Service taxes.",
          "Rates are non-negotiable.",
          "Payment Terms is postpaid.",
          "All Payment In favor of Immense Smart Solutions.",
        ].map((t) => (
          <li key={t} className="flex gap-[3mm]" style={{ marginBottom: "2.2mm" }}>
            <span
              style={{
                width: "2mm",
                height: "2mm",
                borderRadius: 99,
                background: NAVY,
                marginTop: "1.7mm",
              }}
            />
            {t}
          </li>
        ))}
      </ul>

      <div className="absolute inset-x-0 flex items-center justify-center gap-[4mm]" style={{ top: "228mm" }}>
        <span style={{ width: "3mm", height: "3mm", borderRadius: 99, background: ORANGE }} />
        <span style={{ width: "16mm", height: "1mm", background: ORANGE }} />
        <span className="font-display font-black" style={{ color: ORANGE, fontSize: "12mm" }}>
          Thank You
        </span>
        <span style={{ width: "16mm", height: "1mm", background: ORANGE }} />
        <span style={{ width: "3mm", height: "3mm", borderRadius: 99, background: ORANGE }} />
      </div>

      <div
        className="absolute text-center"
        style={{ left: "24mm", right: "24mm", top: "246mm", fontSize: "3.2mm", color: "#33405a" }}
      >
        24/7 Support Center: Call us on +91 8898648592 | +91 8097018757: Or Mail us on
        support@immenseair.com
        <div className="font-semibold italic" style={{ color: NAVY, marginTop: "2.5mm" }}>
          &ldquo;Any Changes in rules and Regulations by Company, TRAI or Operator will be Applicable
          with effect from the date communicated&rdquo;
        </div>
      </div>

      <div
        {...footFx}
        style={{ left: "20mm", right: "20mm", top: "266mm", fontSize: "3mm", color: "#33405a", lineHeight: 1.6 }}
      >
        <div>
          02240136508 &nbsp;|&nbsp;{" "}
          <span style={{ color: "#1857c8" }}>info@immenseair.com</span> &nbsp;|&nbsp;{" "}
          <span style={{ color: "#1857c8" }}>www.immenseair.com</span>
        </div>
        <div>9 Business Bay, Office 404, Off Link Road, Malad West, Mumbai, 400064</div>
      </div>

      <PageFooter />
    </section>
  );
}
