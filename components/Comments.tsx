"use client"
import { useState, useEffect, useCallback } from "react"

const SURL = "https://eplitafudomvkcpipcdw.supabase.co"
const SKEY = "sb_publishable_SzrE1YcjBm97Lgob97CM3A_e1q711KW"
const SITE = "bestbabyrank"
const REST = SURL + "/rest/v1/comments"
const H: Record<string,string> = { apikey: SKEY, Authorization: "Bearer " + SKEY, "Content-Type": "application/json" }

interface Comment {
  id: string; name: string; body: string; created_at: string
  likes: number; dislikes: number; parent_id: string | null
  replies?: Comment[]
}

function timeAgo(d: string) {
  const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000)
  if (m < 1) return "just now"
  if (m < 60) return m + "m ago"
  const h = Math.floor(m / 60)
  if (h < 24) return h + "h ago"
  return Math.floor(h / 24) + "d ago"
}

function getVotes(): Record<string, "like"|"dislike"> {
  try { return JSON.parse(localStorage.getItem("comment_votes") || "{}") } catch { return {} }
}
function saveVote(id: string, type: "like"|"dislike") {
  const v = getVotes(); v[id] = type; localStorage.setItem("comment_votes", JSON.stringify(v))
}

export function Comments({ slug }: { slug: string; title?: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [votes, setVotes] = useState<Record<string,"like"|"dislike">>({})
  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [replyTo, setReplyTo] = useState<string|null>(null)
  const [replyName, setReplyName] = useState("")
  const [replyBody, setReplyBody] = useState("")
  const [replySubmitting, setReplySubmitting] = useState(false)

  useEffect(() => { setVotes(getVotes()); loadComments() }, [slug])

  async function loadComments() {
    try {
      const r = await fetch(REST + "?site=eq." + SITE + "&slug=eq." + encodeURIComponent(slug) + "&select=id,name,body,created_at,likes,dislikes,parent_id&order=created_at.asc", { headers: H })
      if (!r.ok) return
      const all: Comment[] = await r.json()
      // build tree
      const map: Record<string, Comment> = {}
      all.forEach(c => { map[c.id] = { ...c, replies: [] } })
      const roots: Comment[] = []
      all.forEach(c => {
        if (c.parent_id && map[c.parent_id]) map[c.parent_id].replies!.push(map[c.id])
        else roots.push(map[c.id])
      })
      setComments(roots)
    } catch {}
  }

  async function vote(commentId: string, type: "like"|"dislike") {
    const v = getVotes()
    if (v[commentId]) return // already voted
    try {
      // get current value
      const r = await fetch(REST + "?id=eq." + commentId + "&select=likes,dislikes", { headers: H })
      const [cur] = await r.json()
      await fetch(REST + "?id=eq." + commentId, {
        method: "PATCH",
        headers: { ...H, Prefer: "return=minimal" },
        body: JSON.stringify({ [type + "s"]: cur[type + "s"] + 1 })
      })
      saveVote(commentId, type)
      setVotes(getVotes())
      await loadComments()
    } catch {}
  }

  async function submitComment(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !body.trim()) return
    setSubmitting(true); setError(""); setSuccess(false)
    try {
      const r = await fetch(REST, {
        method: "POST",
        headers: { ...H, Prefer: "return=minimal" },
        body: JSON.stringify({ site: SITE, slug, name: name.trim(), body: body.trim(), parent_id: null })
      })
      if (!r.ok) setError("Failed to post. Try again.")
      else { setSuccess(true); setBody(""); await loadComments(); setTimeout(() => setSuccess(false), 3000) }
    } catch { setError("Failed to post. Try again.") }
    setSubmitting(false)
  }

  async function submitReply(parentId: string) {
    if (!replyName.trim() || !replyBody.trim()) return
    setReplySubmitting(true)
    try {
      const r = await fetch(REST, {
        method: "POST",
        headers: { ...H, Prefer: "return=minimal" },
        body: JSON.stringify({ site: SITE, slug, name: replyName.trim(), body: replyBody.trim(), parent_id: parentId })
      })
      if (r.ok) { setReplyTo(null); setReplyName(""); setReplyBody(""); await loadComments() }
    } catch {}
    setReplySubmitting(false)
  }

  const totalCount = comments.reduce((n, c) => n + 1 + (c.replies?.length || 0), 0)
  const accent = "#4f8bff"

  function CommentCard({ c, isReply = false }: { c: Comment; isReply?: boolean }) {
    const myVote = votes[c.id]
    return (
      <div style={{ marginLeft: isReply ? 32 : 0, marginTop: 12 }}>
        <div className="c-item">
          <div className="c-header">
            <div className="c-avatar" style={{ background: `linear-gradient(135deg,${accent}44,${accent}18)`, color: accent }}>{c.name.charAt(0).toUpperCase()}</div>
            <span className="c-name">{c.name}</span>
            <span className="c-time">{timeAgo(c.created_at)}</span>
          </div>
          <p className="c-body">{c.body}</p>
          <div className="c-actions">
            <button
              onClick={() => vote(c.id, "like")}
              className={"c-vote-btn" + (myVote === "like" ? " voted" : "")}
              disabled={!!myVote}
              title="Like"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={myVote === "like" ? accent : "currentColor"}><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
              <span style={{ color: myVote === "like" ? accent : undefined }}>{c.likes}</span>
            </button>
            <button
              onClick={() => vote(c.id, "dislike")}
              className={"c-vote-btn" + (myVote === "dislike" ? " voted" : "")}
              disabled={!!myVote}
              title="Dislike"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={myVote === "dislike" ? "#f87171" : "currentColor"}><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
              <span style={{ color: myVote === "dislike" ? "#f87171" : undefined }}>{c.dislikes}</span>
            </button>
            {!isReply && (
              <button className="c-reply-btn" onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Reply
              </button>
            )}
          </div>
          {replyTo === c.id && (
            <div className="c-reply-form">
              <input type="text" placeholder="Your name" value={replyName} onChange={e => setReplyName(e.target.value)} className="comment-name-input" maxLength={50} />
              <textarea placeholder="Write a reply..." value={replyBody} onChange={e => setReplyBody(e.target.value)} className="comment-body-input" rows={3} maxLength={500} />
              <div style={{ display:"flex", gap:8 }}>
                <button className="comment-submit" disabled={replySubmitting} onClick={() => submitReply(c.id)}>
                  {replySubmitting ? "Posting..." : "Post Reply"}
                </button>
                <button className="c-cancel-btn" onClick={() => setReplyTo(null)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        {c.replies?.map(r => <CommentCard key={r.id} c={r} isReply />)}
      </div>
    )
  }

  return (
    <>
      <style>{`
        .comments-section{margin-top:56px;padding-top:40px;border-top:1px solid #1e2535}
        .comments-heading{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f8bff;margin-bottom:6px}
        .comments-title{font-size:1.4rem;font-weight:800;color:#e4e8f4;letter-spacing:-0.02em;margin-bottom:6px}
        .comments-subtitle{font-size:0.88rem;color:#7a82a0;margin-bottom:28px;line-height:1.6}
        .comments-empty{color:#7a82a0;font-size:0.9rem;margin-bottom:28px}
        .comments-list{display:flex;flex-direction:column;margin-bottom:36px}
        .c-item{background:#0f1420;border:1px solid #1e2535;border-radius:10px;padding:16px 18px}
        .c-header{display:flex;align-items:center;gap:10px;margin-bottom:8px}
        .c-avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;flex-shrink:0}
        .c-name{font-weight:700;font-size:0.9rem;color:#e4e8f4}
        .c-time{font-size:0.75rem;color:#7a82a0;margin-left:auto}
        .c-body{color:#c8cad8;font-size:0.9rem;line-height:1.65;margin-bottom:12px}
        .c-actions{display:flex;align-items:center;gap:12px}
        .c-vote-btn{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.04);border:1px solid #1e2535;border-radius:20px;padding:5px 12px;color:#7a82a0;font-size:0.8rem;cursor:pointer;transition:all 0.15s}
        .c-vote-btn:hover:not(:disabled){background:rgba(255,255,255,0.08);color:#e4e8f4}
        .c-vote-btn:disabled{cursor:default}
        .c-vote-btn.voted{border-color:rgba(255,255,255,0.15)}
        .c-reply-btn{display:flex;align-items:center;gap:5px;background:none;border:none;color:#7a82a0;font-size:0.8rem;cursor:pointer;padding:5px 8px;border-radius:6px;transition:color 0.15s}
        .c-reply-btn:hover{color:#4f8bff}
        .c-reply-form{margin-top:14px;padding-top:14px;border-top:1px solid #1e2535;display:flex;flex-direction:column;gap:10px}
        .c-cancel-btn{background:rgba(255,255,255,0.05);border:1px solid #1e2535;color:#7a82a0;border-radius:8px;padding:9px 18px;font-size:0.88rem;cursor:pointer}
        .comment-form{background:#0f1420;border:1px solid #1e2535;border-radius:12px;padding:24px;margin-top:8px}
        .comment-form-title{font-size:1rem;font-weight:700;color:#e4e8f4;margin-bottom:18px}
        .comment-error{color:#f87171;font-size:0.85rem;margin-bottom:12px;padding:10px 14px;background:rgba(248,113,113,0.08);border-radius:8px;border:1px solid rgba(248,113,113,0.2)}
        .comment-success{color:#34d399;font-size:0.85rem;margin-bottom:12px;padding:10px 14px;background:rgba(52,211,153,0.08);border-radius:8px;border:1px solid rgba(52,211,153,0.2)}
        .comment-name-input,.comment-body-input{width:100%;background:#080b14;border:1px solid #1e2535;border-radius:8px;padding:11px 14px;color:#e4e8f4;font-size:0.9rem;font-family:inherit;outline:none;transition:border-color 0.15s;margin-bottom:0;box-sizing:border-box}
        .comment-name-input:focus,.comment-body-input:focus{border-color:#4f8bff}
        .comment-name-input::placeholder,.comment-body-input::placeholder{color:#4a5268}
        .comment-body-input{resize:vertical;min-height:90px}
        .comment-submit{background:#4f8bff;color:#fff;border:none;border-radius:8px;padding:10px 24px;font-size:0.9rem;font-weight:700;cursor:pointer;transition:opacity 0.15s}
        .comment-submit:hover{opacity:0.85}
        .comment-submit:disabled{opacity:0.5;cursor:not-allowed}
      `}</style>
      <div className="comments-section">
        <div className="comments-heading">Community</div>
        <h2 className="comments-title">
          {totalCount > 0 ? totalCount + " Comment" + (totalCount !== 1 ? "s" : "") : "Comments"}
        </h2>
        <p className="comments-subtitle">Share your thoughts, questions or tips for other readers.</p>

        {comments.length === 0 && <p className="comments-empty">No comments yet — be the first!</p>}

        {comments.length > 0 && (
          <div className="comments-list">
            {comments.map(c => <CommentCard key={c.id} c={c} />)}
          </div>
        )}

        <form onSubmit={submitComment} className="comment-form">
          <h3 className="comment-form-title">Leave a Comment</h3>
          {error && <p className="comment-error">{error}</p>}
          {success && <p className="comment-success">Comment posted!</p>}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} maxLength={50} required className="comment-name-input" />
            <textarea placeholder="Share your thoughts..." value={body} onChange={e => setBody(e.target.value)} maxLength={1000} rows={4} required className="comment-body-input" />
            <div><button type="submit" disabled={submitting} className="comment-submit">{submitting ? "Posting..." : "Post Comment"}</button></div>
          </div>
        </form>
      </div>
    </>
  )
}
