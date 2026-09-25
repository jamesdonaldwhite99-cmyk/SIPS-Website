"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A box to sign in with a finger, stylus or mouse. Hands back a PNG data URL of the strokes (on a
 * transparent background, cropped to what was drawn) — the same image printed on the signed
 * application. Empty until something is drawn; "Clear" starts again.
 */
export default function SignaturePad({ onChange, error }: { onChange: (dataUrl: string) => void; error?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const bounds = useRef({ minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
  const [empty, setEmpty] = useState(true);
  // Read by the pointer handlers: state can lag a render behind when the pen lifts, a ref cannot.
  const inked = useRef(false);

  // Match the canvas's pixel size to its displayed size (and the screen's density) so lines are crisp.
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = Math.round(rect.width * ratio);
    c.height = Math.round(rect.height * ratio);
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1b2a5a";
  }, []);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const grow = (p: { x: number; y: number }) => {
    const b = bounds.current;
    b.minX = Math.min(b.minX, p.x); b.minY = Math.min(b.minY, p.y);
    b.maxX = Math.max(b.maxX, p.x); b.maxY = Math.max(b.maxY, p.y);
  };

  const down = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // no text selection or scrolling while signing
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = point(e);
    grow(last.current);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !last.current) return;
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx) return;
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    grow(p);
    if (!inked.current) { inked.current = true; setEmpty(false); }
  };

  const up = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    const c = canvasRef.current;
    if (!c || !inked.current) return;
    // Crop to the strokes, with a small margin, so the printed signature is not a speck in a big box.
    const ratio = window.devicePixelRatio || 1;
    const b = bounds.current;
    const pad = 6;
    const x = Math.max(0, (b.minX - pad) * ratio);
    const y = Math.max(0, (b.minY - pad) * ratio);
    const w = Math.min(c.width - x, (b.maxX - b.minX + pad * 2) * ratio);
    const h = Math.min(c.height - y, (b.maxY - b.minY + pad * 2) * ratio);
    const out = document.createElement("canvas");
    out.width = Math.max(1, Math.round(w));
    out.height = Math.max(1, Math.round(h));
    out.getContext("2d")?.drawImage(c, x, y, w, h, 0, 0, out.width, out.height);
    onChange(out.toDataURL("image/png"));
  };

  const clear = () => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (c && ctx) ctx.clearRect(0, 0, c.width, c.height);
    bounds.current = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    inked.current = false;
    setEmpty(true);
    onChange("");
  };

  return (
    <div className={`qb-ta-sig${error ? " qb-ta-has-error" : ""}`}>
      <canvas
        ref={canvasRef}
        aria-label="Signature box — sign with your finger, stylus or mouse"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        onPointerCancel={up}
      />
      <div className="qb-ta-sig-bar">
        <span>{empty ? "Sign above" : "Signed"}</span>
        <button type="button" onClick={clear}>Clear</button>
      </div>
      {error && <span className="qb-ta-error" role="alert">{error}</span>}
    </div>
  );
}
