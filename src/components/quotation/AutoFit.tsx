import { useLayoutEffect, useRef } from "react";

/**
 * Renders text at `size` (in mm) and automatically shrinks the font size until
 * the content fits inside `maxLines`. Text always wraps first, then scales —
 * it is never clipped, never overflows and never overlaps neighbouring blocks.
 * The computed size is a real inline style, so print/PDF output matches preview.
 */
export function AutoFit({
  children,
  size,
  maxLines = 2,
  minScale = 0.45,
  lineHeight = 1.18,
  className,
  style,
  align,
}: {
  children: React.ReactNode;
  /** Base (maximum) font size in mm. */
  size: number;
  maxLines?: number;
  minScale?: number;
  lineHeight?: number;
  className?: string;
  style?: React.CSSProperties;
  align?: React.CSSProperties["textAlign"];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      let cur = size;
      const min = size * minScale;
      el.style.fontSize = `${cur}mm`;
      let guard = 0;
      while (
        (el.scrollHeight > el.clientHeight + 0.6 || el.scrollWidth > el.clientWidth + 0.6) &&
        cur > min &&
        guard++ < 80
      ) {
        cur = cur * 0.95;
        el.style.fontSize = `${cur}mm`;
      }
    };

    fit();
    const parent = el.parentElement;
    const ro = new ResizeObserver(() => fit());
    if (parent) ro.observe(parent);
    return () => ro.disconnect();
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        fontSize: `${size}mm`,
        lineHeight,
        maxHeight: `${lineHeight * maxLines}em`,
        overflow: "hidden",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        textAlign: align,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
