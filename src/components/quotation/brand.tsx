/** Shared brand primitives that reproduce the Immense Smart Solution proposal template. */

import logoAsset from "@/assets/immense-logo.png.asset.json";

export const NAVY = "#0f2a5f";
export const ORANGE = "#f2591f";

export function LogoMark({ size = 46 }: { size?: number }) {
  return (
    <img
      src={logoAsset.url}
      alt="Immense Smart Solution logo"
      width={size}
      height={size * 1.05}
      style={{ width: size, height: size * 1.05, objectFit: "contain" }}
    />
  );
}

export function BrandHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="absolute right-[14mm] flex items-center gap-[3mm]"
      style={{ top: compact ? "10mm" : "12mm" }}
    >
      <LogoMark size={compact ? 40 : 48} />
      <div className="leading-none">
        <div
          className="font-display font-extrabold tracking-tight"
          style={{ color: NAVY, fontSize: compact ? "5.4mm" : "6mm" }}
        >
          IMMENSE SMART SOLUTION
        </div>
        <div className="mt-[1.6mm] font-semibold" style={{ fontSize: "3.1mm", color: NAVY }}>
          Smart Communication. <span style={{ color: ORANGE }}>Stronger Results.</span>
        </div>
      </div>
    </div>
  );
}

export function DotGrid({
  rows = 5,
  cols = 6,
  color = "#ffffff",
  gap = 4,
  dot = 1.4,
  className = "",
  style,
}: {
  rows?: number;
  cols?: number;
  color?: string;
  gap?: number;
  dot?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style} aria-hidden="true">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${gap}mm)`,
          gridTemplateRows: `repeat(${rows}, ${gap}mm)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <span
            key={i}
            style={{
              width: `${dot}mm`,
              height: `${dot}mm`,
              borderRadius: "999px",
              background: color,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Navy blob that bleeds off the top-left corner of interior pages. */
export function CornerBlob() {
  return (
    <svg
      className="absolute left-0 top-0"
      width="270"
      height="165"
      viewBox="0 0 330 200"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 0h250c0 90-40 150-140 150C40 150 60 200 0 200V0Z" fill={NAVY} />
      <path
        d="M250 0c0 90-40 150-140 150C40 150 60 200 0 200"
        stroke={ORANGE}
        strokeWidth="7"
        fill="none"
      />
    </svg>
  );
}

/** Navy footer bar with the orange wave, used on every page. */
export function PageFooter({
  site = "www.immensesmartsolutions.com",
  email = "info@immensesmartsolutions.com",
  phone = "+91 2245 00 3131",
}: {
  site?: string;
  email?: string;
  phone?: string;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0" aria-hidden={false}>
      <svg viewBox="0 0 794 70" className="block w-full" style={{ height: "18mm" }}>
        <path d="M0 34C160 4 300 60 470 34s230-34 324-14v50H0V34Z" fill={ORANGE} />
        <path d="M0 44C160 14 300 70 470 44s230-34 324-14v40H0V44Z" fill={NAVY} />
      </svg>
      <div
        className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-[6mm]"
        style={{ height: "12mm", color: "#fff", fontSize: "2.9mm" }}
      >
        <FooterItem icon="globe" label={site} />
        <span style={{ opacity: 0.4 }}>|</span>
        <FooterItem icon="mail" label={email} />
        <span style={{ opacity: 0.4 }}>|</span>
        <FooterItem icon="phone" label={phone} />
      </div>
    </div>
  );
}

function FooterItem({ icon, label }: { icon: "globe" | "mail" | "phone"; label: string }) {
  return (
    <span className="flex items-center gap-[2mm]">
      <span
        className="flex items-center justify-center rounded-full"
        style={{ width: "5.2mm", height: "5.2mm", background: "#fff" }}
      >
        <Glyph name={icon} color={NAVY} size={3.1} />
      </span>
      {label}
    </span>
  );
}

export function Glyph({
  name,
  color = "#fff",
  size = 4,
}: {
  name: "globe" | "mail" | "phone" | "user" | "bank" | "pin" | "card" | "doc" | "check";
  color?: string;
  size?: number;
}) {
  const paths: Record<string, React.ReactNode> = {
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 2.5 15 0 18M12 3c-2.5 2.7-2.5 15 0 18" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: <path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c1.5-4 4-5.5 7-5.5S17.5 16 19 20" />
      </>
    ),
    bank: (
      <>
        <path d="M3 10 12 4l9 6" />
        <path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    card: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    doc: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M9 12h6M9 16h6" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  };
  return (
    <svg
      width={`${size}mm`}
      height={`${size}mm`}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/** Orange ribbon banner used as the section title on product pages. */
export function RibbonTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-[3mm]">
      <span style={{ width: "3mm", height: "3mm", borderRadius: 99, background: ORANGE }} />
      <span style={{ width: "14mm", height: "1mm", background: ORANGE }} />
      <div className="relative" style={{ background: ORANGE }}>
        <div
          className="font-display font-extrabold text-center"
          style={{ color: "#fff", fontSize: "7.4mm", padding: "3mm 12mm", lineHeight: 1.1 }}
        >
          {children}
        </div>
        <span
          className="absolute"
          style={{
            left: "-5mm",
            top: 0,
            bottom: 0,
            width: "5mm",
            background: ORANGE,
            clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
          }}
        />
        <span
          className="absolute"
          style={{
            right: "-5mm",
            top: 0,
            bottom: 0,
            width: "5mm",
            background: ORANGE,
            clipPath: "polygon(0 0, 0 100%, 100% 50%)",
          }}
        />
      </div>
      <span style={{ width: "14mm", height: "1mm", background: ORANGE }} />
      <span style={{ width: "3mm", height: "3mm", borderRadius: 99, background: ORANGE }} />
    </div>
  );
}
