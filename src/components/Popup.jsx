import React, { useEffect } from "react";

export function Popup({ onClick, title = "Open", style }) {
  const base = {
    position: "absolute",
    top: 84,
    left: 16,
    zIndex: 1000,
    width: 52,
    height: 52,
    borderRadius: 999,
    background: "#111827",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
    cursor: "pointer",
    userSelect: "none",
  };
  return (
    <button
      aria-label={title}
      title={title}
      onClick={onClick}
      style={{ ...base, ...style }}
    >
      ☰
    </button>
  );
}


export function WaypointPopup({ open, waypoint, onClose, onNavigate, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const wp = waypoint || {};

  const overlay = {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1200,
    backdropFilter: "blur(2px)",
  };
  const card = {
    width: "min(92vw, 520px)",
    background: "#ffffff",
    borderRadius: 14,
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  };
  const header = {
    padding: "14px 18px",
    background: "#111827",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: 600,
  };
 const body = { padding: 18, color: "#111827" };
  const footer = {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    padding: 16,
    background: "#f9fafb",
    borderTop: "1px solid #e5e7eb",
  };
  const btn = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "white",
    cursor: "pointer",
    fontWeight: 600,
  };
  const primary = {
    ...btn,
    background: "#111827",
    color: "white",
    borderColor: "#111827",
  };

  return (
    <div style={overlay} onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div role="dialog" aria-modal="true" style={card}>
        <div style={header}>
          <div>{wp.label || "Waypoint"}</div>
          <button
            aria-label="Close"
            onClick={onClose}
            style={{ ...btn, background: "transparent", color: "white", borderColor: "rgba(255,255,255,0.25)" }}
          >
            ✕
          </button>
        </div>
        <div style={body}>
          {children ?? null}
        </div>
        <div style={footer}>
          <button onClick={onClose} style={btn}>Close</button>
          <button onClick={onNavigate} style={primary}>Navigate</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
