import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Quick Built Systems",
  description:
    "How Quick Built Systems Pty Ltd collects, uses, stores and shares your personal information, in line with the Australian Privacy Act 1988.",
};

const LAST_UPDATED = "7 July 2026";

// A string renders as a paragraph; a string[] renders as a bullet list.
type Block = string | string[];
type Section = { heading: string; blocks: Block[] };

const SECTIONS: Section[] = [
  {
    heading: "1. What we collect",
    blocks: [
      "When you request a quote or contact us, we collect:",
      [
        "Your name",
        "Your email address",
        "Your phone number",
        "Your project or site address and postcode",
        "Details about your project (product interest, measurements, configuration, and any photos you upload)",
        "Anything else you choose to include in your message",
      ],
      "We also automatically collect basic technical and usage data when you visit our sites (see section 4, Cookies and tracking).",
    ],
  },
  {
    heading: "2. How we collect it",
    blocks: [
      "We collect your information:",
      [
        "Directly from you, through our website quote and contact forms",
        "When you phone or email us",
        "Automatically, through analytics and tracking tools on our websites (Google Analytics and the Meta pixel), including phone-call and email-click tracking",
      ],
    ],
  },
  {
    heading: "3. Why we collect it",
    blocks: [
      "We use your information to:",
      [
        "Respond to your enquiry and prepare your quote",
        "Follow up with you about your project",
        "Supply and deliver our products and services",
        "Improve our websites and understand how visitors use them",
        "Send you marketing about our products and offers, where you have not opted out (see section 6)",
      ],
      "We only use your information for the purposes above, or for related purposes you would reasonably expect.",
    ],
  },
  {
    heading: "4. Cookies and tracking",
    blocks: [
      "Our websites use cookies and tracking pixels to measure traffic and marketing performance, including:",
      [
        "Google Analytics (GA4) and Google Tag Manager",
        "The Meta (Facebook) pixel",
        "Phone-call and email-click tracking",
      ],
      "These tools may set cookies and collect data such as your IP address, device and browser type, and the pages you view. You can control or block cookies through your browser settings.",
    ],
  },
  {
    heading: "5. Who we share it with",
    blocks: [
      "We do not sell your personal information, and we do not pass your details to external installers or other businesses. We share it only with the providers that help us run our business:",
      [
        "Capsule CRM — where we store and manage your enquiry",
        "Make.com — our form and automation provider, which passes your form submission into our systems",
        "Google and Meta — for the analytics and advertising tools above",
        "Microsoft Outlook — to receive and respond to your enquiry",
      ],
    ],
  },
  {
    heading: "6. Marketing and how to opt out",
    blocks: [
      "We may send you marketing about our products and offers. You can opt out at any time by clicking the unsubscribe link in any marketing email, or by emailing us at sales@quickbuiltsystems.com.au. We will action your request promptly.",
    ],
  },
  {
    heading: "7. How we store and secure it",
    blocks: [
      "We take reasonable steps to protect your information from misuse, loss, and unauthorised access, including storing it in secure, access-controlled systems such as Capsule CRM. No method of transmission or storage is completely secure, but we work to protect your information.",
    ],
  },
  {
    heading: "8. Overseas disclosure",
    blocks: [
      "Some of the providers we use store data outside Australia — including the United Kingdom, the United States and the European Union (for example Capsule CRM, Make.com, Google and Meta). By using our sites and submitting an enquiry, you consent to your information being handled by these providers overseas.",
    ],
  },
  {
    heading: "9. How long we keep it",
    blocks: [
      "We keep your information only for as long as we need it for the purposes above. We generally retain lead and customer records for up to 7 years to meet our legal and tax record-keeping obligations, after which we securely delete or de-identify it.",
    ],
  },
  {
    heading: "10. Accessing, correcting or deleting your information",
    blocks: [
      "You can ask us to access, correct, or delete the personal information we hold about you. Email us at sales@quickbuiltsystems.com.au and we will respond within a reasonable time. There is no charge to make a request.",
    ],
  },
  {
    heading: "11. Complaints",
    blocks: [
      "If you have a concern about how we have handled your personal information, please contact us first at sales@quickbuiltsystems.com.au so we can try to resolve it.",
      "If you are not satisfied with our response, you can complain to the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au or on 1300 363 992.",
    ],
  },
  {
    heading: "12. Changes to this policy",
    blocks: [
      "We may update this policy from time to time. The latest version will always be available on our websites, with the “last updated” date at the top.",
    ],
  },
  {
    heading: "13. Contact us",
    blocks: [
      "Quick Built Systems Pty Ltd (ABN 63 167 322 116), 21 Econo Place, Silverdale NSW 2752. Email: sales@quickbuiltsystems.com.au.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="ts-section">
      <div className="ts-container" style={{ maxWidth: 820 }}>
        <p style={{ color: "var(--color-stone)", fontSize: 14, letterSpacing: "0.02em", marginBottom: 8 }}>
          Legal
        </p>
        <h1 style={{ fontSize: 34, lineHeight: 1.2, marginBottom: 12 }}>Privacy Policy</h1>
        <p style={{ color: "var(--color-stone)", fontSize: 14, marginBottom: 32 }}>
          Last updated: {LAST_UPDATED}
        </p>

        <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--color-ink-soft)", margin: "0 0 12px" }}>
          Quick Built Systems Pty Ltd (ABN 63 167 322 116) (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
          respects your privacy. This policy explains how we collect, use, store and share your personal
          information, and your rights under the Australian Privacy Act 1988 and the Australian Privacy
          Principles (APPs).
        </p>
        <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--color-ink-soft)", margin: "0 0 40px" }}>
          It covers our websites and brands, including Quick Built Systems, Quick Built Fencing, Quick Built
          Patio Kits and Quick Built Homes.
        </p>

        {SECTIONS.map((section) => (
          <section key={section.heading} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 22, lineHeight: 1.3, marginBottom: 16 }}>{section.heading}</h2>
            {section.blocks.map((block, bi) =>
              Array.isArray(block) ? (
                <ul key={bi} style={{ margin: "0 0 12px", paddingLeft: 22 }}>
                  {block.map((item) => (
                    <li key={item} style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: 6 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={bi} style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--color-ink-soft)", margin: "0 0 12px" }}>
                  {block}
                </p>
              )
            )}
          </section>
        ))}

        <p style={{ color: "var(--color-stone)", fontSize: 13, marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--color-hairline)" }}>
          © {new Date().getFullYear()} Quick Built Systems Pty Ltd. All rights reserved.
        </p>
      </div>
    </section>
  );
}
