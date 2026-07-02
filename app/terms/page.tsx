import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import terms from "@/content/terms.json";

export const metadata: Metadata = {
  title: "Terms & Conditions of Trade | Quick Built Systems",
  description: "Quick Built Systems Pty Limited Terms and Conditions of Trade.",
};

/** A lettered sub-clause line, e.g. "(a) interest accrues…". */
const isSubClause = (s: string) => /^\([a-z]\)/.test(s.trim());
/** A definition line in the Definitions section, e.g. "Goods means …". */
const definitionTerm = (s: string) => {
  const m = s.match(/^(.*?)\s+means\s/);
  return m ? m[1] : null;
};
/** The ACL statutory notice block, rendered as a highlighted callout. */
const isAclNotice = (s: string) => s.includes("guarantees that cannot be excluded under the Australian Consumer Law");

export default function TermsPage() {
  return (
    <div>
      <PageHero
        crumb="Terms & Conditions"
        eyebrow="Legal"
        h1="Terms & Conditions of Trade"
        lead={`${terms.company} — ${terms.edition}.`}
        photo="/photos/panelspan-lifestyle.jpg"
      />

      <section className="ts-section">
        <div className="ts-container" style={{ maxWidth: 820 }}>
          <p style={{ color: "var(--color-stone)", fontSize: 14, letterSpacing: "0.02em", marginBottom: 40 }}>
            {terms.docTitle} · {terms.edition}
          </p>

          {terms.sections.map((section, si) => {
            const isDefinitions = si === 0;
            return (
              <section
                key={section.heading}
                id={`clause-${si + 1}`}
                style={{ marginBottom: 40, scrollMarginTop: 100 }}
              >
                <h2 style={{ fontSize: 22, lineHeight: 1.3, marginBottom: 16 }}>{section.heading}</h2>

                {section.blocks.map((block, bi) => {
                  if (isAclNotice(block)) {
                    return (
                      <p
                        key={bi}
                        style={{
                          fontSize: 15.5,
                          lineHeight: 1.7,
                          color: "var(--color-ink)",
                          background: "var(--ts-cream-2, #f5f2ec)",
                          borderLeft: "3px solid var(--ts-accent)",
                          borderRadius: "var(--radius-sm, 6px)",
                          padding: "16px 20px",
                          margin: "4px 0 14px",
                        }}
                      >
                        {block}
                      </p>
                    );
                  }

                  const sub = isSubClause(block);
                  const term = isDefinitions ? definitionTerm(block) : null;

                  return (
                    <p
                      key={bi}
                      style={{
                        fontSize: 15.5,
                        lineHeight: 1.7,
                        color: "var(--color-ink-soft)",
                        margin: "0 0 12px",
                        paddingLeft: sub ? 22 : 0,
                      }}
                    >
                      {term ? (
                        <>
                          <strong style={{ color: "var(--color-ink)" }}>{term}</strong>
                          {block.slice(term.length)}
                        </>
                      ) : (
                        block
                      )}
                    </p>
                  );
                })}
              </section>
            );
          })}

          <p style={{ color: "var(--color-stone)", fontSize: 13, marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--color-hairline)" }}>
            © {new Date().getFullYear()} {terms.company}. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
