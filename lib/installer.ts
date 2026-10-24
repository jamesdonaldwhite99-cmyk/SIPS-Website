import { useCallback, useState } from "react";

/* "DO YOU NEED AN INSTALLER?" (James, 25 Oct 2026: "all enquiry forms on all websites should have a box
   asking if they need an installer or not … that will lead to more leads for my trade guys").

   One question on every enquiry and quote form, in that form's own style. Optional: nothing is chosen
   until the customer chooses. Choosing Yes is their consent to be passed to one approved installer for
   this job (Privacy Act APP 6), so the time they chose it goes with the form. The quote service shows the
   answer to staff, tags the Capsule contact and files the lead for James to pass on
   (automations/qbs-quote-service/src/installer.js). The words live here so every form says the same. */

export type InstallerChoice = "" | "yes" | "no";

export const INSTALLER_QUESTION = "Do you need an installer?";
export const INSTALLER_YES = "Yes, please put me in touch with a Quick Built installer near me";
export const INSTALLER_NO = "No, I'll install it myself or have my own builder";
export const INSTALLER_YES_NOTE = "We'll pass your details to one approved installer near you, only for this job.";

export const INSTALLER_OPTIONS: { value: Exclude<InstallerChoice, "">; label: string; note?: string }[] = [
  { value: "yes", label: INSTALLER_YES, note: INSTALLER_YES_NOTE },
  { value: "no", label: INSTALLER_NO },
];

/** The answer and when Yes was chosen. Picking the chosen option again clears it (the question is optional). */
export function useInstaller() {
  const [choice, setChoice] = useState<InstallerChoice>("");
  const [at, setAt] = useState<string>("");
  const pick = useCallback((v: InstallerChoice) => {
    const next = choice === v ? "" : v;
    setChoice(next);
    setAt(next === "yes" ? new Date().toISOString() : "");
  }, [choice]);
  return { choice, at, pick };
}

/** The fields sent with the form: nothing when unanswered; a Yes carries the time it was chosen (the consent). */
export function installerFields(choice: InstallerChoice, at: string): { needsInstaller?: "yes" | "no"; installerConsentAt?: string } {
  if (!choice) return {};
  return choice === "yes" ? { needsInstaller: "yes", installerConsentAt: at || new Date().toISOString() } : { needsInstaller: "no" };
}
