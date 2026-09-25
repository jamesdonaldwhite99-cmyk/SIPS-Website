/**
 * Trade account application — the form's shape, its rules, and the exact consent wording.
 *
 * The credit service (automations/qbs-credit-service/src/validate.js) is the MASTER copy of these
 * rules and checks everything again; this copy exists so an applicant sees a problem on the step
 * they are on, not after pressing Submit.
 *
 * CONSENT WORDING. The three statements below are shown beside the tick boxes and printed word for
 * word in the signed application's signing record. They must match qbs-credit-service/src/consents.js
 * exactly, and CONSENT_VERSION must match too — the service refuses any other version, which is
 * what stops the two drifting apart. Change both files, and the version, in the same change.
 */

export const CONSENT_VERSION = "consents-2026-09-a";

/**
 * Is the online application switched on? Only once Vercel has both settings — otherwise the form
 * would let someone complete all seven steps and fail at the last. Server-side only (reads env).
 * After setting CREDIT_SERVICE_URL and CREDIT_SITE_SECRET in Vercel, redeploy for this to flip.
 */
export const tradeAccountEnabled = () => Boolean(process.env.CREDIT_SERVICE_URL && process.env.CREDIT_SITE_SECRET);
export const TERMS_EDITION = "April 2026 Edition";
export const TERMS_PDF = "/pdfs/qbs-terms-2026-04.pdf";

export const CONSENTS = {
  agreeTerms: "I have read and agree to the QBS Terms and Conditions of Trade (April 2026 Edition).",
  consentCredit:
    "I authorise Quick Built Systems Pty Ltd to verify the information in this application and to obtain and " +
    "exchange information about the Applicant and each director, partner or proprietor named in it — including " +
    "from ABN Lookup, ASIC, court and insolvency registers, the PPSR, the bankruptcy register, credit reporting " +
    "bodies and the trade references given — to assess this application and to manage the account. I confirm " +
    "that each person named has agreed to their details being used in this way.",
  consentElectronic:
    "I agree to sign this application electronically. My electronic signature has the same effect as a " +
    "handwritten signature, and I will receive a copy of the signed application by email.",
} as const;

export type EntityType = "sole_trader" | "partnership" | "company" | "trust";
export const ENTITY_OPTIONS: { value: EntityType; label: string; people: string; person: string }[] = [
  { value: "company", label: "Company", people: "Directors", person: "Director" },
  { value: "trust", label: "Trust", people: "Directors of the trustee", person: "Director" },
  { value: "partnership", label: "Partnership", people: "Partners", person: "Partner" },
  { value: "sole_trader", label: "Sole Trader", people: "Proprietor", person: "Proprietor" },
];

export interface Person { fullName: string; residentialAddress: string; dob: string }
export interface Reference { name: string; phone: string; email: string; address: string }
export interface Guarantor { fullName: string; dob: string; licence: string; residentialAddress: string; mobile: string; email: string }

export interface Application {
  business: {
    legalName: string; tradingAs: string; abn: string; acn: string; dateEstablished: string;
    entityType: EntityType | ""; registeredAddress: string; registeredPhone: string; registeredMobile: string;
    tradingAddress: string; tradingPhone: string; tradingMobile: string; email: string;
    natureOfBusiness: string; yearsTrading: string; creditLimit: string; previousNames: string;
  };
  people: Person[];
  contacts: { sales: string; accounts: string; bank: string; accountant: string };
  references: Reference[];
  guarantors: Guarantor[];
  declaration: {
    agreeTerms: boolean; consentCredit: boolean; consentElectronic: boolean;
    signerName: string; signerPosition: string;
    signature: { type: "drawn"; dataUrl: string } | { type: "typed"; text: string };
  };
}

export const emptyPerson = (): Person => ({ fullName: "", residentialAddress: "", dob: "" });
export const emptyReference = (): Reference => ({ name: "", phone: "", email: "", address: "" });
export const emptyGuarantor = (): Guarantor => ({ fullName: "", dob: "", licence: "", residentialAddress: "", mobile: "", email: "" });

export const emptyApplication = (): Application => ({
  business: {
    legalName: "", tradingAs: "", abn: "", acn: "", dateEstablished: "", entityType: "",
    registeredAddress: "", registeredPhone: "", registeredMobile: "", tradingAddress: "", tradingPhone: "",
    tradingMobile: "", email: "", natureOfBusiness: "", yearsTrading: "", creditLimit: "", previousNames: "",
  },
  people: [emptyPerson()],
  contacts: { sales: "", accounts: "", bank: "", accountant: "" },
  references: [emptyReference(), emptyReference(), emptyReference()],
  guarantors: [emptyGuarantor()],
  declaration: {
    agreeTerms: false, consentCredit: false, consentElectronic: false,
    signerName: "", signerPosition: "", signature: { type: "drawn", dataUrl: "" },
  },
});

// ── Checks ────────────────────────────────────────────────────────────────────────────────────

export const digits = (s: string) => String(s || "").replace(/\D/g, "");

/** ABN checksum (ATO): subtract 1 from the first digit, weight, sum, divisible by 89. */
export function validAbn(value: string): boolean {
  const d = digits(value);
  if (d.length !== 11) return false;
  const w = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const n = d.split("").map(Number);
  n[0] -= 1;
  return n.reduce((sum, x, i) => sum + x * w[i], 0) % 89 === 0;
}

/** ACN checksum (ASIC). */
export function validAcn(value: string): boolean {
  const d = digits(value);
  if (d.length !== 9) return false;
  const n = d.split("").map(Number);
  const sum = n.slice(0, 8).reduce((s, x, i) => s + x * (8 - i), 0);
  return (10 - (sum % 10)) % 10 === n[8];
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pastDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && Date.parse(`${s}T00:00:00Z`) < Date.now() && s > "1900-01-01";
const adult = (dob: string) => pastDate(dob) && (Date.now() - Date.parse(`${dob}T00:00:00Z`)) / (365.25 * 864e5) >= 18;
const filled = (s: string) => String(s || "").trim().length > 0;

export type Errors = Record<string, string>;

export const STEPS = ["Business", "People", "Contacts", "References", "Guarantors", "Declaration", "Review"] as const;

/** Errors for one step, keyed by field path. An empty object means the step is complete. */
export function stepErrors(step: number, a: Application): Errors {
  const e: Errors = {};
  const b = a.business;
  if (step === 0) {
    if (!filled(b.legalName)) e["business.legalName"] = "Required.";
    if (!b.entityType) e["business.entityType"] = "Choose one.";
    if (!filled(b.abn) && !filled(b.acn)) e["business.abn"] = "An ABN or ACN is required.";
    if (filled(b.abn) && !validAbn(b.abn)) e["business.abn"] = "That ABN is not valid — check the 11 digits.";
    if (filled(b.acn) && !validAcn(b.acn)) e["business.acn"] = "That ACN is not valid — check the 9 digits.";
    if (b.entityType === "company" && !filled(b.acn) && !(validAbn(b.abn) && validAcn(digits(b.abn).slice(2)))) e["business.acn"] = "A company must give its ACN.";
    if (!pastDate(b.dateEstablished)) e["business.dateEstablished"] = "Enter a date in the past.";
    if (!EMAIL.test(b.email.trim())) e["business.email"] = "Enter a valid email.";
    if (!filled(b.natureOfBusiness)) e["business.natureOfBusiness"] = "Required.";
    if (!filled(b.yearsTrading) || !(Number(b.yearsTrading) >= 0)) e["business.yearsTrading"] = "Required.";
    if (!(Number(digits(b.creditLimit)) > 0)) e["business.creditLimit"] = "Enter the limit you need.";
    if (!filled(b.registeredAddress) && !filled(b.tradingAddress)) e["business.registeredAddress"] = "A registered or trading address is required.";
  }
  if (step === 1) {
    a.people.forEach((p, i) => {
      if (!filled(p.fullName)) e[`people.${i}.fullName`] = "Required.";
      if (!filled(p.residentialAddress)) e[`people.${i}.residentialAddress`] = "Required.";
      if (!adult(p.dob)) e[`people.${i}.dob`] = "Enter a valid date of birth (18 or over).";
    });
    if (b.entityType === "partnership" && a.people.length < 2) e.people = "A partnership needs at least two partners.";
  }
  if (step === 3) {
    a.references.forEach((r, i) => {
      const any = filled(r.name) || filled(r.phone) || filled(r.email) || filled(r.address);
      if (!any) return;
      if (!filled(r.name)) e[`references.${i}.name`] = "Business name required.";
      if (!filled(r.phone) && !filled(r.email)) e[`references.${i}.phone`] = "A phone or email is required.";
      if (filled(r.email) && !EMAIL.test(r.email.trim())) e[`references.${i}.email`] = "Enter a valid email.";
    });
  }
  if (step === 4) {
    const needed = b.entityType === "company" || b.entityType === "trust";
    const used = a.guarantors.filter((g) => Object.values(g).some(filled));
    if (needed && used.length === 0) e.guarantors = "A company or trust must name at least one guarantor.";
    a.guarantors.forEach((g, i) => {
      if (!Object.values(g).some(filled)) return;
      if (!filled(g.fullName)) e[`guarantors.${i}.fullName`] = "Required.";
      if (!adult(g.dob)) e[`guarantors.${i}.dob`] = "Enter a valid date of birth (18 or over).";
      if (!filled(g.licence)) e[`guarantors.${i}.licence`] = "Required.";
      if (!filled(g.residentialAddress)) e[`guarantors.${i}.residentialAddress`] = "Required.";
      if (!filled(g.mobile)) e[`guarantors.${i}.mobile`] = "Required.";
      if (!EMAIL.test(g.email.trim())) e[`guarantors.${i}.email`] = "Enter a valid email — the Deed is sent here.";
    });
  }
  if (step === 5) {
    const d = a.declaration;
    if (!d.agreeTerms) e["declaration.agreeTerms"] = "You must agree to the Terms to open an account.";
    if (!d.consentCredit) e["declaration.consentCredit"] = "Consent is needed to assess the application.";
    if (!d.consentElectronic) e["declaration.consentElectronic"] = "Consent is needed to sign online.";
    if (!filled(d.signerName)) e["declaration.signerName"] = "Required.";
    if (!filled(d.signerPosition)) e["declaration.signerPosition"] = "Required.";
    const sig = d.signature;
    if (sig.type === "drawn" ? !sig.dataUrl : !filled(sig.text)) e["declaration.signature"] = sig.type === "drawn" ? "Please sign in the box." : "Type your full name.";
  }
  return e;
}

/** What is sent to /api/account: unused reference and guarantor rows are dropped. */
export function toPayload(a: Application, submissionId: string, startedAt: number, hp: string) {
  const used = <T extends object>(rows: T[]) => rows.filter((r) => Object.values(r).some((v) => filled(String(v))));
  return {
    submissionId,
    startedAt,
    hp,
    business: a.business,
    people: a.people,
    contacts: a.contacts,
    references: used(a.references),
    guarantors: used(a.guarantors),
    declaration: { ...a.declaration, termsEdition: TERMS_EDITION, wordingVersion: CONSENT_VERSION },
  };
}

/** What every step component receives. `update` takes a function that edits a copy of the form. */
export interface StepProps {
  app: Application;
  errors: Errors;
  update: (edit: (draft: Application) => void) => void;
}
