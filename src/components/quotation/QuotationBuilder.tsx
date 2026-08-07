import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { QuotationDocument } from "@/components/quotation/QuotationDocument";
import { PreviewFocusContext } from "@/components/quotation/preview-focus";
import {
  PRODUCT_LABELS,
  computeTotal,
  defaultQuotation,
  type Product,
  type Quotation,
} from "@/lib/quotation";

const MM = 96 / 25.4;
const PAGE_W = 210 * MM;
const PAGE_H = 297 * MM;

function Field({
  label,
  value,
  onChange,
  onFocusPreview,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onFocusPreview?: () => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-ink/60">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onFocus={onFocusPreview}
        onChange={(e) => {
          onChange(e.target.value);
          onFocusPreview?.();
        }}
        className="w-full rounded-lg border border-brand-line bg-white px-3 py-2 text-sm text-navy outline-none transition-all placeholder:text-brand-ink/35 focus:border-navy focus:ring-4 focus:ring-navy/10"
      />
    </label>
  );
}

function EyeButton({ onClick, title }: { onClick: () => void; title: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-brand-line bg-white text-brand-ink/60 transition-colors hover:border-navy hover:text-navy"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
  );
}

function Card({
  title,
  subtitle,
  children,
  right,
  innerRef,
  active,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  innerRef?: (el: HTMLElement | null) => void;
  active?: boolean;
}) {
  return (
    <section
      ref={innerRef}
      className={`fade-up scroll-mt-24 rounded-2xl border bg-white p-5 shadow-panel transition-colors ${
        active ? "border-navy/60 ring-4 ring-navy/10" : "border-brand-line"
      }`}
    >
      <header className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-navy">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs text-brand-ink/60">{subtitle}</p> : null}
        </div>
        {right}
      </header>
      {children}
    </section>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
        on ? "bg-navy" : "bg-brand-line"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${
          on ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

type ZoomMode = number | "fit-width" | "fit-page";

export function QuotationBuilder() {
  const [data, setData] = useState<Quotation>(defaultQuotation);
  const [openKey, setOpenKey] = useState<string | null>("bulkSms");
  const [highlight, setHighlight] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [zoom, setZoom] = useState<ZoomMode>("fit-width");
  const [scale, setScale] = useState(1);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const editorRefs = useRef<Record<string, HTMLElement | null>>({});
  const glowTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setData((d) =>
      d.client.date
        ? d
        : { ...d, client: { ...d.client, date: new Date().toLocaleDateString("en-GB") } },
    );
  }, []);

  /* ------------------------------- zoom ------------------------------- */
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const apply = () => {
      if (typeof zoom === "number") return setScale(zoom);
      const w = (el.clientWidth - 48) / PAGE_W;
      if (zoom === "fit-width") return setScale(Math.min(1.5, Math.max(0.2, w)));
      const h = (el.clientHeight - 48) / PAGE_H;
      setScale(Math.min(1.5, Math.max(0.2, Math.min(w, h))));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [zoom]);

  /* ---------------------- preview navigation --------------------- */
  const scrollPreviewTo = useCallback((el: HTMLElement | null) => {
    const scroller = scrollerRef.current;
    if (!el || !scroller) return;
    const top =
      el.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop -
      scroller.clientHeight / 2 +
      el.getBoundingClientRect().height / 2;
    scroller.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  const focusPreview = useCallback(
    (focusId: string) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const el = scroller.querySelector<HTMLElement>(`[data-focus="${focusId}"]`);
      if (!el) return;
      scrollPreviewTo(el);
      setHighlight(focusId);
      if (glowTimer.current) clearTimeout(glowTimer.current);
      glowTimer.current = setTimeout(() => setHighlight(null), 2000);
    },
    [scrollPreviewTo],
  );

  const goToPage = useCallback((pageId: string) => {
    const scroller = scrollerRef.current;
    const el = scroller?.querySelector<HTMLElement>(`#page-${CSS.escape(pageId)}`);
    if (!scroller || !el) return;
    const top =
      el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
    scroller.scrollTo({ top: Math.max(0, top - 12), behavior: "smooth" });
  }, []);

  /* --------------- preview click -> open editor section --------------- */
  const onSelect = useCallback((focusId: string) => {
    const section = focusId.split(":")[0] ?? "client";
    setActiveSection(section);
    if (section !== "client" && section !== "manager" && section !== "contact") {
      setOpenKey(section);
    }
    const target =
      editorRefs.current[section === "contact" ? "manager" : section] ?? editorRefs.current["client"];
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => setActiveSection(null), 2000);
  }, []);

  const enabledCount = data.products.filter((p) => p.enabled).length;
  const pageCount = enabledCount + 2;

  const grandTotal = useMemo(
    () =>
      data.products
        .filter((p) => p.enabled)
        .reduce((sum, p) => {
          const explicit = Number(p.pricing.total);
          return sum + (explicit > 0 ? explicit : computeTotal(p.pricing));
        }, 0),
    [data.products],
  );

  const pages = useMemo(
    () => [
      { id: "cover", label: "Cover" },
      ...data.products.filter((p) => p.enabled).map((p) => ({ id: p.key, label: PRODUCT_LABELS[p.key] })),
      { id: "contact", label: "Terms & Contact" },
    ],
    [data.products],
  );

  const patchProduct = (key: string, patch: Partial<Product>) =>
    setData((d) => ({
      ...d,
      products: d.products.map((p) => (p.key === key ? { ...p, ...patch } : p)),
    }));

  const setEditorRef = (key: string) => (el: HTMLElement | null) => {
    editorRefs.current[key] = el;
  };

  return (
    <div className="min-h-screen bg-brand-grey">
      <header className="no-print sticky top-0 z-30 border-b border-brand-line bg-white/85 backdrop-blur">
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-sm font-bold text-white">
              IS
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold leading-tight text-navy">
                Immense Smart Solution
              </h1>
              <p className="truncate text-xs text-brand-ink/60">Quotation Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-xs text-brand-ink/60">
                {enabledCount} products · {pageCount} pages
              </p>
              <p className="text-sm font-semibold text-navy">
                Grand Total ₹{" "}
                {grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-panel transition-all hover:bg-navy-deep active:scale-[0.98]"
            >
              Generate PDF
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] items-start gap-6 px-5 py-6 lg:grid-cols-[440px_minmax(0,1fr)]">
        {/* -------- Editor -------- */}
        <div className="no-print space-y-4">
          <Card
            title="Client Information"
            subtitle="Appears on the proposal cover page"
            innerRef={setEditorRef("client")}
            active={activeSection === "client"}
            right={<EyeButton title="Preview cover page" onClick={() => focusPreview("client:name")} />}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Client Name"
                value={data.client.clientName}
                onFocusPreview={() => focusPreview("client:name")}
                onChange={(v) => setData((d) => ({ ...d, client: { ...d.client, clientName: v } }))}
              />
              <Field
                label="Company Name"
                value={data.client.companyName}
                onFocusPreview={() => focusPreview("client:company")}
                onChange={(v) => setData((d) => ({ ...d, client: { ...d.client, companyName: v } }))}
              />
              <Field
                label="Proposal Number"
                value={data.client.proposalNumber}
                onFocusPreview={() => focusPreview("client:proposal")}
                onChange={(v) =>
                  setData((d) => ({ ...d, client: { ...d.client, proposalNumber: v } }))
                }
              />
              <Field
                label="Date"
                value={data.client.date}
                onFocusPreview={() => focusPreview("client:date")}
                onChange={(v) => setData((d) => ({ ...d, client: { ...d.client, date: v } }))}
              />
            </div>
          </Card>

          <Card title="Product Pages" subtitle="Only enabled products are included in the PDF">
            <div className="space-y-2.5">
              {data.products.map((p) => {
                const open = openKey === p.key;
                return (
                  <div
                    key={p.key}
                    ref={setEditorRef(p.key) as unknown as React.Ref<HTMLDivElement>}
                    className={`scroll-mt-24 overflow-hidden rounded-xl border transition-colors ${
                      activeSection === p.key
                        ? "border-navy ring-4 ring-navy/10"
                        : p.enabled
                          ? "border-navy/25 bg-navy/[0.03]"
                          : "border-brand-line bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Toggle on={p.enabled} onChange={(v) => patchProduct(p.key, { enabled: v })} />
                      <button
                        type="button"
                        onClick={() => setOpenKey(open ? null : p.key)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <span className="block truncate text-sm font-semibold text-navy">
                          {PRODUCT_LABELS[p.key]}
                        </span>
                        <span className="block text-xs text-brand-ink/55">
                          {p.enabled ? "Included in PDF" : "Excluded from PDF"}
                        </span>
                      </button>
                      {p.enabled ? (
                        <EyeButton
                          title={`Preview ${PRODUCT_LABELS[p.key]}`}
                          onClick={() => goToPage(p.key)}
                        />
                      ) : null}
                      <span
                        className={`text-brand-ink/40 transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </div>

                    <div
                      className="grid transition-all duration-300"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-3 border-t border-brand-line/70 px-4 py-4">
                          <Field
                            label="Page Title"
                            value={p.title}
                            onFocusPreview={() => focusPreview(`${p.key}:title`)}
                            onChange={(v) => patchProduct(p.key, { title: v })}
                          />
                          <Field
                            label="Section Heading"
                            value={p.subTitle}
                            onFocusPreview={() => focusPreview(`${p.key}:sub`)}
                            onChange={(v) => patchProduct(p.key, { subTitle: v })}
                          />
                          {p.tables.map((t, i) => (
                            <div key={i} className="grid grid-cols-2 gap-3">
                              <Field
                                label={`${t.slabLabel} · Slab`}
                                value={t.slabValue}
                                onFocusPreview={() => focusPreview(`${p.key}:pricing`)}
                                onChange={(v) =>
                                  patchProduct(p.key, {
                                    tables: p.tables.map((x, j) =>
                                      j === i ? { ...x, slabValue: v } : x,
                                    ),
                                  })
                                }
                              />
                              <Field
                                label={`${t.rateLabel}`}
                                value={t.rateValue}
                                onFocusPreview={() => focusPreview(`${p.key}:pricing`)}
                                onChange={(v) =>
                                  patchProduct(p.key, {
                                    tables: p.tables.map((x, j) =>
                                      j === i ? { ...x, rateValue: v } : x,
                                    ),
                                  })
                                }
                              />
                            </div>
                          ))}

                          <div className="rounded-lg bg-white p-3">
                            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-brand-ink/60">
                              Pricing
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                              {(
                                [
                                  ["setup", "Setup Charges"],
                                  ["monthly", "Monthly Charges"],
                                  ["price", "Price"],
                                  ["gst", "GST (%)"],
                                ] as const
                              ).map(([k, label]) => (
                                <Field
                                  key={k}
                                  label={label}
                                  value={p.pricing[k]}
                                  onFocusPreview={() => focusPreview(`${p.key}:pricing`)}
                                  onChange={(v) =>
                                    patchProduct(p.key, { pricing: { ...p.pricing, [k]: v } })
                                  }
                                />
                              ))}
                            </div>
                            <div className="mt-3">
                              <Field
                                label="Final Total (leave 0 to auto-calculate)"
                                value={p.pricing.total}
                                onFocusPreview={() => focusPreview(`${p.key}:pricing`)}
                                onChange={(v) =>
                                  patchProduct(p.key, { pricing: { ...p.pricing, total: v } })
                                }
                              />
                              <p className="mt-1.5 text-xs text-brand-ink/60">
                                Auto total: ₹{" "}
                                {computeTotal(p.pricing).toLocaleString("en-IN", {
                                  maximumFractionDigits: 2,
                                })}
                              </p>
                            </div>
                          </div>

                          <label className="block">
                            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-ink/60">
                              Bullet Points (one per line)
                            </span>
                            <textarea
                              rows={6}
                              value={p.bullets.join("\n")}
                              onFocus={() => focusPreview(`${p.key}:bullets`)}
                              onChange={(e) => {
                                patchProduct(p.key, { bullets: e.target.value.split("\n") });
                                focusPreview(`${p.key}:bullets`);
                              }}
                              className="w-full rounded-lg border border-brand-line bg-white px-3 py-2 text-sm text-navy outline-none focus:border-navy focus:ring-4 focus:ring-navy/10"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card
            title="Account Manager"
            subtitle="Shown on the final Contact Us page"
            innerRef={setEditorRef("manager")}
            active={activeSection === "manager"}
            right={
              <EyeButton title="Preview contact page" onClick={() => focusPreview("manager:card")} />
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Name"
                value={data.manager.name}
                onFocusPreview={() => focusPreview("manager:card")}
                onChange={(v) => setData((d) => ({ ...d, manager: { ...d.manager, name: v } }))}
              />
              <Field
                label="Designation"
                value={data.manager.designation}
                onFocusPreview={() => focusPreview("manager:card")}
                onChange={(v) =>
                  setData((d) => ({ ...d, manager: { ...d.manager, designation: v } }))
                }
              />
              <Field
                label="Mobile Number"
                value={data.manager.mobile}
                onFocusPreview={() => focusPreview("manager:card")}
                onChange={(v) => setData((d) => ({ ...d, manager: { ...d.manager, mobile: v } }))}
              />
              <Field
                label="Email Address"
                value={data.manager.email}
                onFocusPreview={() => focusPreview("manager:card")}
                onChange={(v) => setData((d) => ({ ...d, manager: { ...d.manager, email: v } }))}
              />
            </div>
          </Card>
        </div>

        {/* -------- Sticky live A4 preview -------- */}
        <div className="min-w-0 lg:sticky lg:top-[76px]">
          <div className="no-print mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-navy">Live A4 Preview</h2>
            <div className="flex items-center gap-1.5">
              {([50, 75, 100] as const).map((z) => (
                <ZoomBtn key={z} active={zoom === z / 100} onClick={() => setZoom(z / 100)}>
                  {z}%
                </ZoomBtn>
              ))}
              <ZoomBtn active={zoom === "fit-width"} onClick={() => setZoom("fit-width")}>
                Fit Width
              </ZoomBtn>
              <ZoomBtn active={zoom === "fit-page"} onClick={() => setZoom("fit-page")}>
                Fit Page
              </ZoomBtn>
            </div>
          </div>

          <div className="relative">
            <div
              id="print-root"
              ref={scrollerRef}
              className="preview-scroller overflow-auto rounded-2xl bg-brand-grey lg:h-[calc(100vh-140px)]"
            >
              <div
                className="page-scaler flex flex-col items-center gap-6 py-3"
                style={{ zoom: scale }}
              >
                <PreviewFocusContext.Provider value={{ highlight, onSelect }}>
                  <QuotationDocument data={data} />
                </PreviewFocusContext.Provider>
              </div>
            </div>

            {/* floating page navigator */}
            <nav className="no-print absolute right-3 top-3 max-h-[70%] w-[150px] overflow-auto rounded-xl border border-brand-line bg-white/95 p-1.5 shadow-panel backdrop-blur">
              {pages.map((pg) => (
                <button
                  key={pg.id}
                  type="button"
                  onClick={() => goToPage(pg.id)}
                  className="block w-full truncate rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-brand-ink/75 transition-colors hover:bg-navy/[0.07] hover:text-navy"
                >
                  📄 {pg.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZoomBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-navy bg-navy text-white"
          : "border-brand-line bg-white text-brand-ink/70 hover:border-navy/40 hover:text-navy"
      }`}
    >
      {children}
    </button>
  );
}
