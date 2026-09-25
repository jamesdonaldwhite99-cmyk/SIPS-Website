import { STEPS } from "@/lib/tradeAccount";

/** "Step 3 of 7 — Contacts", with a thin progress bar. Steps already passed can be revisited. */
export default function StepIndicator({ step, reached, onJump }: { step: number; reached: number; onJump: (i: number) => void }) {
  return (
    <nav className="qb-ta-steps" aria-label="Application progress">
      <ol>
        {STEPS.map((name, i) => (
          <li key={name} className={i === step ? "is-current" : i < reached ? "is-done" : ""}>
            <button type="button" disabled={i > reached} onClick={() => onJump(i)} aria-current={i === step ? "step" : undefined}>
              <span className="n">{i + 1}</span>
              <span className="t">{name}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="qb-ta-progress" aria-hidden>
        <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>
    </nav>
  );
}
