/* COPIED VERBATIM FROM THE PATIO KITS ENGINE — do not edit here.
 *
 * Source: Quick Built Patio Kits, lib/patio-calc/{enquiry,sheetLimits}.ts
 *
 * The same nine patio styles are offered on this site and on patiokits.com.au, from two separate
 * deployments, and they have to refuse the same sizes. That site's `npm run verify:gable` asserts
 * the numbers in here still match the live engine, so if a limit moves at /workbook its build fails
 * with a message telling you to re-copy these two files. Editing this copy on its own is how the
 * two forms silently start disagreeing.
 */
/* Can this enquiry be quoted at all? — the size check the public form runs.
 *
 * WHY IT EXISTS
 * The contact form offers nine patio styles, five of them gables, with free-text width and length
 * and no check of any kind. A "Gable Attached, 2400 wide" was a form anyone could submit and nobody
 * could quote: the automatic pipeline enforces the same structural limits the engine does, so it
 * rejected the job, and someone then priced it by hand — or wrote back asking for a different size.
 *
 * WHAT IT IS NOT
 * It is not engineering. It has no wind region and no pitch, because the customer is not asked for
 * either, so it cannot tell a buildable N1 job from an impossible N4 one and does not try. It only
 * catches what is impossible at ANY wind region — a size outside the kit range, or a gable too
 * narrow to make a roof sheet. Anything it passes still goes through the real engine downstream.
 *
 * SO THE FAILURE MODE IS DELIBERATELY ONE-SIDED. It never says yes to something unbuildable, and it
 * may say yes to something the engineer still has to look at. The alternative — guessing N3 and
 * refusing real jobs on the enquiry form — turns customers away at the door.
 */
import {
  GABLE_PITCH_DEFAULT_DEG, MIN_SKILLION_SIDE_MM, minGableWidthForSheetMm,
} from "./sheetLimits";

/**
 * The three size limits this check needs, as plain numbers.
 *
 * DELIBERATELY NOT IMPORTED FROM `rules.ts`. This file and `sheetLimits.ts` are copied verbatim
 * into the SIPS site, which has no patio engine in it at all — the same nine styles are offered on
 * two separate deployments, and they must refuse the same sizes. Depending on the rule set here
 * would make the file uncopyable and the two forms would drift.
 *
 * `verify:gable` asserts these equal the live `DEFAULT_RULES` values, so moving a limit in the
 * workbook fails the build with a message telling you to update both sites. That is the trade:
 * duplication that cannot go unnoticed, instead of an import that cannot cross a repo.
 */
export interface EnquiryLimits {
  widthMinMm: number;
  widthMaxMm: number;
  projectionMaxMm: number;
}

export const ENQUIRY_LIMITS: EnquiryLimits = {
  widthMinMm: 1200,
  widthMaxMm: 18000,
  projectionMaxMm: 7000,
};

export type EnquiryShape = "Skillion" | "Gable" | "DutchGable" | "Arbor";
export type EnquiryProfile = "Attached" | "FlyOver" | "FreeStanding";

export interface EnquiryStyle {
  shape: EnquiryShape;
  profile: EnquiryProfile;
}

/**
 * Read one of the form's style labels — "Dutch Gable Flyover" — into a shape and a profile.
 *
 * The labels are content, edited in the CMS, so this parses rather than switches on a fixed list:
 * a renamed card must not silently stop being a gable. Anything unrecognised comes back null and
 * the check stands aside, because refusing an enquiry over a label we failed to parse would be the
 * worst possible outcome.
 */
export function parseStyle(label: string): EnquiryStyle | null {
  const s = label.trim().toLowerCase();
  if (!s) return null;
  if (s.includes("arbor")) return { shape: "Arbor", profile: "Attached" };

  const profile: EnquiryProfile | null =
    s.includes("freestanding") || s.includes("free standing") ? "FreeStanding"
    : s.includes("flyover") || s.includes("fly over") ? "FlyOver"
    : s.includes("attached") ? "Attached"
    : null;
  if (!profile) return null;

  const shape: EnquiryShape =
    s.includes("dutch") ? "DutchGable" : s.includes("gable") ? "Gable" : "Skillion";
  return { shape, profile };
}

export interface EnquiryCheck {
  /** True when nothing here stops it being priced automatically. */
  ok: boolean;
  /** Plain-English reasons, written for a customer rather than an estimator. */
  reasons: string[];
  /** The nearest size that would work, where there is one worth suggesting. */
  suggestion: string | null;
}

const fmt = (n: number) => Math.round(n).toLocaleString("en-AU");

export function checkEnquirySize(
  style: EnquiryStyle | null,
  widthMm: number,
  lengthMm: number,
  rules: EnquiryLimits = ENQUIRY_LIMITS
): EnquiryCheck {
  const reasons: string[] = [];
  let suggestion: string | null = null;
  // Nothing typed yet, or a label we could not read — say nothing rather than something wrong.
  if (!style || !Number.isFinite(widthMm) || !Number.isFinite(lengthMm) || widthMm <= 0 || lengthMm <= 0) {
    return { ok: true, reasons, suggestion };
  }

  /* ---- the limits every shape shares ---- */
  if (widthMm < rules.widthMinMm || widthMm > rules.widthMaxMm) {
    reasons.push(
      `We build between ${fmt(rules.widthMinMm)}mm and ${fmt(rules.widthMaxMm)}mm along the wall, ` +
      `and this is ${fmt(widthMm)}mm.`
    );
  }
  if (lengthMm > rules.projectionMaxMm) {
    reasons.push(
      `A standard kit projects up to ${fmt(rules.projectionMaxMm)}mm out from the house, and this ` +
      `is ${fmt(lengthMm)}mm. Deeper than that needs an engineered design.`
    );
  }

  /* ---- the gable ones ----
     A gable's sheets run RIDGE TO EAVE, so the run that has to be a sheet we make is across the
     gable, not out from the house. Which measurement that is depends on which way the ridge runs:
     out from the house on an attached or flyover gable, along the width on a freestanding one,
     where the roof is trussed. Same fact the designer's `fitGableToSheets` works from. */
  const minGableMm = minGableWidthForSheetMm(GABLE_PITCH_DEFAULT_DEG);

  if (style.shape === "Gable" || style.shape === "DutchGable") {
    if (style.profile === "FreeStanding") {
      if (style.shape === "DutchGable") {
        reasons.push("A Dutch gable needs a house to run its flat section off, so it is attached or flyover only.");
      } else if (lengthMm < minGableMm) {
        reasons.push(
          `A freestanding gable's roof sheets run ridge to eave across the projection, so it needs ` +
          `at least ${fmt(minGableMm)}mm out from the front, and this is ${fmt(lengthMm)}mm.`
        );
        suggestion = `${fmt(widthMm)}mm x ${fmt(minGableMm)}mm`;
      }
    } else {
      /* Attached and flyover: the ridge runs out, so the WIDTH carries the gable. A Dutch gable
         sits in the middle with a flat section each side, so it needs the gable plus both sides. */
      const needMm = style.shape === "DutchGable"
        ? minGableMm * 2 + 2 * MIN_SKILLION_SIDE_MM
        : minGableMm;
      if (widthMm < needMm) {
        reasons.push(
          style.shape === "DutchGable"
            ? `A Dutch gable is a gable with a flat section each side, and at this pitch that needs ` +
              `at least ${fmt(needMm)}mm along the wall. This is ${fmt(widthMm)}mm — a full gable ` +
              `fits from ${fmt(minGableMm)}mm.`
            : `A gable's roof sheets run ridge to eave, so it needs at least ${fmt(minGableMm)}mm ` +
              `along the wall to make a sheet we roll. This is ${fmt(widthMm)}mm.`
        );
        suggestion = `${fmt(needMm)}mm x ${fmt(lengthMm)}mm`;
      }
    }
  }

  return { ok: reasons.length === 0, reasons, suggestion };
}
