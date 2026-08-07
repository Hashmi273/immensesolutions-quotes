import { createContext, useContext } from "react";

export interface PreviewFocusValue {
  /** data-focus id currently highlighted in the preview. */
  highlight: string | null;
  /** Called when the user clicks an editable region inside the preview. */
  onSelect?: (id: string) => void;
}

export const PreviewFocusContext = createContext<PreviewFocusValue>({ highlight: null });

/**
 * Props spread onto an existing document element so it becomes a two-way
 * navigation target. No wrapper element is added, so layout is untouched.
 */
export function useFocusProps(id: string, extraClass?: string) {
  const { highlight, onSelect } = useContext(PreviewFocusContext);
  const className = [extraClass, "focus-target", highlight === id ? "focus-glow" : null]
    .filter(Boolean)
    .join(" ");
  return {
    "data-focus": id,
    className,
    onClick: onSelect ? () => onSelect(id) : undefined,
  } as const;
}

/** Editor section ids, used to map a preview click back to an editor card. */
export const focusToSection = (focusId: string) => focusId.split(":")[0] ?? "client";
