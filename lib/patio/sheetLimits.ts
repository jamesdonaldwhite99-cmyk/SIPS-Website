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
/* The sheet-geometry limits a gable is bound by — and nothing else.
 *
 * WHY THIS IS ITS OWN FILE
 * These are pure numbers and one line of trigonometry, but they used to live in `gable-design.ts`,
 * which imports the Allform rev3 engineering tables — 130KB of JSON. That is the right weight for
 * the estimator and the designer, and far too much for the public enquiry form, which needs only
 * to know whether a size can be built at all. Splitting the leaf out lets the enquiry check share
 * the SAME constants rather than copying them, which is the only way they cannot drift apart.
 *
 * `gable-design.ts` re-exports every one of these, so nothing that already imported them changed.
 */
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Narrower than this and it is not a gable, it is a ripple. One roof sheet plus a little. */
export const MIN_GABLE_WIDTH_MM = 1200;

/**
 * THE SHORTEST ROOF SHEET WE MAKE, mm (James, 6 Sep 2026 — 1800, relaxed to 1500 the same day to
 * leave the smaller gables buildable).
 *
 * It binds on a gable in a way it never did on a skillion, because the sheets turn: a skillion's
 * sheet is as long as the projection, which is always well past this, but a gable's runs ridge to
 * eave, so it is as long as the RAFTER. A 2400mm gable at 15° asks for a 1242mm sheet, which is not
 * a sheet we make. On a Dutch gable the flat side beside the gable is a run of its own and has to
 * clear it too.
 *
 * Note this is a tighter constraint than MIN_GABLE_WIDTH_MM: at 15° it wants a gable of about
 * 2900mm before the rafter reaches 1500.
 */
export const MIN_SHEET_LENGTH_MM = 1500;

/**
 * The narrowest flat side a Dutch gable is worth building, mm.
 *
 * NOT a sheet-length rule — the side's sheets run wall to front, so their length is the projection
 * and no minimum binds on the side's WIDTH. This is only the point below which the skillion stops
 * being a skillion and becomes a sliver beside the gable, and one sheet cover is the honest place
 * to draw it: below that there is not one full sheet out there. `assessGable` still refuses a
 * Dutch gable with no skillion at all, which is the hard rule.
 */
export const MIN_SKILLION_SIDE_MM = 762;

/** The narrowest gable whose rafter reaches the minimum sheet, at a given pitch. */
export function minGableWidthForSheetMm(pitchDeg: number): number {
  return Math.ceil(2 * MIN_SHEET_LENGTH_MM * Math.cos(rad(pitchDeg)));
}

/** The engineer's own ceiling, from his sheet's "Reduce Pitch" check at C45. */
export const GABLE_PITCH_MAX_DEG = 30;
export const GABLE_PITCH_MIN_DEG = 5;
export const GABLE_PITCH_DEFAULT_DEG = 15;

