/**
 * One labelled input in the trade account form, in the site's existing underline style
 * (.ts-form-input), with its error shown beneath it.
 */
export default function Field({
  label,
  required,
  error,
  full,
  hint,
  ...input
}: {
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = input.id || input.name;
  return (
    <div className={`ts-form-input${full ? " full" : ""}${error ? " qb-ta-has-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="qb-ta-req" aria-hidden> *</span>}
      </label>
      <input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-err` : undefined} {...input} />
      {hint && !error && <span className="qb-ta-hint">{hint}</span>}
      {error && <span id={`${id}-err`} className="qb-ta-error" role="alert">{error}</span>}
    </div>
  );
}
