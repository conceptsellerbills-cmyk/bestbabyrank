"use client"
import { useState, useEffect } from "react"

const SUPABASE_URL = "https://eplitafudomvkcpipcdw.supabase.co"
const SUPABASE_KEY = "sb_publishable_SzrE1YcjBm97Lgob97CM3A_e1q711KW"
const SITE_ID = "bestbabyrank"
const REST = SUPABASE_URL + "/rest/v1/comments"
const HEADERS = { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY, "Content-Type": "application/json" }

interface Comment {
  id: string
  name: string
  body: string
  created_at: string
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "just now"
  if (m < 60) return m + "m ago"
  const h = Math.floor(m / 60)
  if (h < 24) return h + "h ago"
  return Math.floor(h / 24) + "d ago"
}

export function Comments({ slug }: { slug: string; title?: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => { loadComments() }, [slug])

  async function loadComments() {
    try {
      const r = await fetch(
        REST + "?site=eq." + SITE_ID + "&slug=eq." + encodeURIComponent(slug) + "&select=id,name,body,created_at&order=created_at.asc",
        { headers: HEADERS }
      )
      if (r.ok) setComments(await r.json())
    } catch {}
  }

  async function submitComment(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !body.trim()) return
    setSubmitting(true)
    setError("")
    setSuccess(false)
    try {
      const r = await fetch(REST, {
        method: "POST",
        headers: { ...HEADERS, "Prefer": "return=minimal" },
        body: JSON.stringify({ site: SITE_ID, slug, name: name.trim(), body: body.trim() })
      })
      if (!r.ok) {
        setError("Failed to post comment. Please try again.")
      } else {
        setSuccess(true)
        setBody("")
        await loadComments()
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch {
      setError("Failed to post comment. Please try again.")
    }
    setSubmitting(false)
  }

  return (
    <>
      <style>{`
        .comments-section{margin-top:56px;padding-top:40px;border-top:1px solid #1e2535}
        .comments-heading{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f8bff;margin-bottom:6px}
        .comments-title{font-size:1.4rem;font-weight:800;color:#e4e8f4;letter-spacing:-0.02em;margin-bottom:6px}
        .comments-subtitle{font-size:0.88rem;color:#7a82a0;margin-bottom:32px;line-height:1.6}
        .comments-empty{color:#7a82a0;font-size:0.9rem;margin-bottom:28px}
        .comments-list{display:flex;flex-direction:column;gap:14px;margin-bottom:36px}
        .comment-item{background:#0f1420;border:1px solid #1e2535;border-radius:10px;padding:16px 18px}
        .comment-header{display:flex;align-items:center;gap:10px;margin-bottom:8px}
        .comment-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#4f8bff55,#4f8bff22);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#4f8bff;flex-shrink:0}
        .comment-name{font-weight:700;font-size:0.9rem;color:#e4e8f4}
        .comment-time{font-size:0.75rem;color:#7a82a0;margin-left:auto}
        .comment-body{color:#c8cad8;font-size:0.9rem;line-height:1.65}
        .comment-form{background:#0f1420;border:1px solid #1e2535;border-radius:12px;padding:24px}
        .comment-form-title{font-size:1rem;font-weight:700;color:#e4e8f4;margin-bottom:18px}
        .comment-error{color:#f87171;font-size:0.85rem;margin-bottom:12px;padding:10px 14px;background:rgba(248,113,113,0.08);border-radius:8px;border:1px solid rgba(248,113,113,0.2)}
        .comment-success{color:#34d399;font-size:0.85rem;margin-bottom:12px;padding:10px 14px;background:rgba(52,211,153,0.08);border-radius:8px;border:1px solid rgba(52,211,153,0.2)}
        .comment-name-input,.comment-body-input{width:100%;background:#080b14;border:1px solid #1e2535;border-radius:8px;padding:11px 14px;color:#e4e8f4;font-size:0.9rem;font-family:inherit;outline:none;transition:border-color 0.15s;margin-bottom:12px;box-sizing:border-box}
        .comment-name-input:focus,.comment-body-input:focus{border-color:#4f8bff}
        .comment-name-input::placeholder,.comment-body-input::placeholder{color:#4a5268}
        .comment-body-input{resize:vertical;min-height:100px}
        .comment-submit{background:#4f8bff;color:#fff;border:none;border-radius:8px;padding:11px 28px;font-size:0.9rem;font-weight:700;cursor:pointer;transition:opacity 0.15s}
        .comment-submit:hover{opacity:0.85}
        .comment-submit:disabled{opacity:0.5;cursor:not-allowed}
      `}</style>
      <div className="comments-section">
        <div className="comments-heading">Community</div>
        <h2 className="comments-title">
          {comments.length > 0 ? comments.length + " Comment" + (comments.length !== 1 ? "s" : "") : "Comments"}
        </h2>
        <p className="comments-subtitle">Share your thoughts, questions or tips for other readers.</p>

        {comments.length === 0 && (
          <p className="comments-empty">No comments yet — be the first!</p>
        )}

        {comments.length > 0 && (
          <div className="comments-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item">
                <div className="comment-header">
                  <div className="comment-avatar">{c.name.charAt(0).toUpperCase()}</div>
                  <span className="comment-name">{c.name}</span>
                  <span className="comment-time">{timeAgo(c.created_at)}</span>
                </div>
                <p className="comment-body">{c.body}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={submitComment} className="comment-form">
          <h3 className="comment-form-title">Leave a Comment</h3>
          {error && <p className="comment-error">{error}</p>}
          {success && <p className="comment-success">Comment posted successfully!</p>}
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            required
            className="comment-name-input"
          />
          <textarea
            placeholder="Share your thoughts..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={1000}
            rows={4}
            required
            className="comment-body-input"
          />
          <button type="submit" disabled={submitting} className="comment-submit">
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>
    </>
  )
}
