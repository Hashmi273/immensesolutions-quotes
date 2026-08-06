import { useEffect, useMemo, useState } from "react";
import { QuotationDocument } from "@/components/quotation/QuotationDocument";
import {
  PRODUCT_LABELS,
  computeTotal,
  defaultQuotation,
  type Product,
  type Quotation,
} from "@/lib/quotation";

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
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
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-brand-line bg-white px-3 py-2 text-sm text-navy outline-none transition-all placeholder:text-brand-ink/35 focus:border-navy focus:ring-4 focus:ring-navy/10"
      />
    </label>
  );
}

function Card({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <section className="fade-up rounded-2xl border border-brand-line bg-white p-5 shadow-panel">
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-navy">{title}</h2>
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

export function QuotationBuilder() {
  const [data, setData] = useState<Quotation>(defaultQuotation);
  const [openKey, setOpenKey] = useState<string | null>("bulkSms");
  // Set today's date after hydration so SSR and client markup match.
  useEffect(() => {
    setData((d) =>
      d.client.date
        ? d
        : { ...d, client: { ...d.client, date: new Date().toLocaleDateString("en-GB") } },
    );
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

  const patchProduct = (key: string, patch: Partial<Product>) =>
    setData((d) => ({
      ...d,
      products: d.products.map((p) => (p.key === key ? { ...p, ...patch } : p)),
    }));

  return (
    <div className="min-h-screen bg-brand-grey">
      <header className="no-print sticky top-0 z-30 border-b border-brand-line bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-sm font-bold text-white">
              IS
            </span>
            <div>
              <h1 className="text-sm font-semibold leading-tight text-navy">
                Immense Smart Solution
              </h1>
              <p className="text-xs text-brand-ink/60">Quotation Management System</p>
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

      <div className="mx-auto grid max-w-[1600px] gap-6 px-5 py-6 lg:grid-cols-[440px_minmax(0,1fr)]">
        {/* -------- Editor -------- */}
        <div className="no-print space-y-4">
          <Card title="Client Information" subtitle="Appears on the proposal cover page">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Client Name"
                value={data.client.clientName}
                onChange={(v) => setData((d) => ({ ...d, client: { ...d.client, clientName: v } }))}
              />
              <Field
                label="Company Name"
                value={data.client.companyName}
                onChange={(v) => setData((d) => ({ ...d, client: { ...d.client, companyName: v } }))}
              />
              <Field
                label="Proposal Number"
                value={data.client.proposalNumber}
                onChange={(v) =>
                  setData((d) => ({ ...d, client: { ...d.client, proposalNumber: v } }))
                }
              />
              <Field
                label="Date"
                value={data.client.date}
                onChange={(v) => setData((d) => ({ ...d, client: { ...d.client, date: v } }))}
              />
            </div>
          </Card>

          <Card
            title="Product Pages"
            subtitle="Only enabled products are included in the PDF"
          >
            <div className="space-y-2.5">
              {data.products.map((p) => {
                const open = openKey === p.key;
                return (
                  <div
                    key={p.key}
                    className={`overflow-hidden rounded-xl border transition-colors ${
                      p.enabled ? "border-navy/25 bg-navy/[0.03]" : "border-brand-line bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Toggle on={p.enabled} onChange={(v) => patchProduct(p.key, { enabled: v })} />
                      <button
                        type="button"
                        onClick={() => setOpenKey(open ? null : p.key)}
                        className="flex-1 text-left"
                      >
                        <span className="block text-sm font-semibold text-navy">
                          {PRODUCT_LABELS[p.key]}
                        </span>
                        <span className="block text-xs text-brand-ink/55">
                          {p.enabled ? "Included in PDF" : "Excluded from PDF"}
                        </span>
                      </button>
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
                            onChange={(v) => patchProduct(p.key, { title: v })}
                          />
                          <Field
                            label="Section Heading"
                            value={p.subTitle}
                            onChange={(v) => patchProduct(p.key, { subTitle: v })}
                          />
                          {p.tables.map((t, i) => (
                            <div key={i} className="grid grid-cols-2 gap-3">
                              <Field
                                label={`${t.slabLabel} · Slab`}
                                value={t.slabValue}
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
                              onChange={(e) =>
                                patchProduct(p.key, { bullets: e.target.value.split("\n") })
                              }
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

          <Card title="Account Manager" subtitle="Shown on the final Contact Us page">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Name"
                value={data.manager.name}
                onChange={(v) => setData((d) => ({ ...d, manager: { ...d.manager, name: v } }))}
              />
              <Field
                label="Designation"
                value={data.manager.designation}
                onChange={(v) =>
                  setData((d) => ({ ...d, manager: { ...d.manager, designation: v } }))
                }
              />
              <Field
                label="Mobile Number"
                value={data.manager.mobile}
                onChange={(v) => setData((d) => ({ ...d, manager: { ...d.manager, mobile: v } }))}
              />
              <Field
                label="Email Address"
                value={data.manager.email}
                onChange={(v) => setData((d) => ({ ...d, manager: { ...d.manager, email: v } }))}
              />
            </div>
          </Card>
        </div>

        {/* -------- Live A4 preview -------- */}
        <div id="print-root" className="min-w-0">
          <div className="no-print mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-navy">Live A4 Preview</h2>
            <span className="text-xs text-brand-ink/60">{pageCount} pages</span>
          </div>
          <div className="page-scaler flex flex-col items-center gap-6">
            <QuotationDocument data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
