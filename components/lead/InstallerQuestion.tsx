"use client";

import { INSTALLER_OPTIONS, INSTALLER_QUESTION, type InstallerChoice } from "@/lib/installer";

/* "Do you need an installer?" for the forms that have no choice cards of their own: the download gate,
 * the planners and designers, the finance and steel-floor forms. The contact forms use their own cards.
 *
 * Styles are pinned inline, as MarketingConsent's are: the designer forms style every label and input in
 * them (full-width inputs, stacked bold labels), which is right for text boxes and wrong here. Optional:
 * nothing is chosen until the customer chooses, and picking the chosen one again clears it. The words and
 * the consent time are in lib/installer.ts. */
export default function InstallerQuestion({
  choice, onPick, tone = "light",
}: {
  choice: InstallerChoice;
  onPick: (v: InstallerChoice) => void;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const ink = dark ? "rgba(255,255,255,0.92)" : "var(--color-ink, #1d1d1f)";
  const soft = dark ? "rgba(255,255,255,0.7)" : "var(--color-graphite, #555)";
  const line = dark ? "rgba(255,255,255,0.25)" : "var(--color-hairline, #d9d9d9)";
  return (
    <fieldset style={{ border: 0, padding: 0, margin: "4px 0 10px", minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
      <legend style={{ padding: 0, marginBottom: 8, fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: ink }}>
        {INSTALLER_QUESTION} <span style={{ display: "inline", fontWeight: 400, color: soft, textTransform: "none", letterSpacing: "normal" }}>(optional)</span>
      </legend>
      {INSTALLER_OPTIONS.map((o) => {
        const on = choice === o.value;
        return (
          <label
            key={o.value}
            style={{
              display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 10, margin: 0, padding: "10px 12px",
              border: `1.5px solid ${on ? "var(--ts-accent, #f15a24)" : line}`, borderRadius: 8, cursor: "pointer",
              background: on ? (dark ? "rgba(241,90,36,0.14)" : "color-mix(in srgb, var(--ts-accent, #f15a24) 6%, transparent)") : "transparent",
              fontSize: 14, fontWeight: 400, lineHeight: 1.4, color: ink,
            }}
          >
            <input
              type="radio"
              name="needsInstaller"
              value={o.value}
              checked={on}
              onChange={() => { /* onClick below, so the chosen one can be clicked again to clear it */ }}
              onClick={() => onPick(o.value)}
              style={{ width: 18, height: 18, minWidth: 18, padding: 0, margin: "1px 0 0", flex: "0 0 auto", accentColor: "var(--ts-accent, #f15a24)" }}
            />
            <span style={{ display: "block", margin: 0, fontSize: 14, fontWeight: on ? 600 : 500, color: "inherit", textTransform: "none", letterSpacing: "normal" }}>
              {o.label}
              {o.note && <span style={{ display: "block", marginTop: 2, fontSize: 12.5, fontWeight: 400, color: soft, textTransform: "none", letterSpacing: "normal" }}>{o.note}</span>}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
