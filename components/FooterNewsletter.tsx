"use client"
import { useState } from "react"

export default function FooterNewsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      setStatus(res.ok ? "success" : "error")
      if (res.ok) setEmail("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading" || status === "success"}
          style={{
            flex: 1, minWidth: 160,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, padding: "10px 14px",
            color: "#e4e8f4", fontSize: "0.85rem", outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          style={{
            background: status === "success" ? "#10b981" : "#4f8bff",
            color: "#fff", border: "none", borderRadius: 8,
            padding: "10px 20px", fontSize: "0.85rem", fontWeight: 700,
            cursor: status === "loading" || status === "success" ? "default" : "pointer",
            whiteSpace: "nowrap", opacity: status === "loading" ? 0.7 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {status === "loading" ? "..." : status === "success" ? "✓ Subscribed!" : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p style={{ color: "#f87171", fontSize: "0.8rem", marginTop: 6 }}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}
