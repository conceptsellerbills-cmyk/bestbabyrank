"use client"
import { useState } from "react"

export default function NewsletterForm() {
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
      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, maxWidth: 460, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={status === "loading" || status === "success"}
        style={{
          flex: 1, minWidth: 200, padding: "13px 18px", borderRadius: 50,
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
          color: "#e4e8f4", fontSize: "0.92rem", outline: "none"
        }}
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        style={{
          padding: "13px 28px", borderRadius: 50,
          background: status === "success" ? "#10b981" : "#4f8bff",
          color: "#fff", fontWeight: 700, fontSize: "0.9rem",
          border: "none", cursor: "pointer", whiteSpace: "nowrap",
          opacity: status === "loading" ? 0.7 : 1
        }}
      >
        {status === "loading" ? "Subscribing..." : status === "success" ? "✓ Subscribed!" : "Subscribe"}
      </button>
      {status === "error" && (
        <p style={{ width: "100%", textAlign: "center", color: "#f87171", fontSize: "0.85rem", margin: "4px 0 0" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
