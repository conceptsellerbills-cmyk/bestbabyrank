import { getAllPosts } from '../../../lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ cat: string }> }

const CATEGORY_MAP: Record<string, { label: string; desc: string; keywords: string[] }> = {
  'baby-monitors': { label: 'Baby Monitors', desc: 'Best baby monitors with video, audio and smart features reviewed for new parents.', keywords: ['baby monitor','video monitor','wifi monitor','audio monitor','hellobaby','nanit','owlet'] },
  'baby-wipes': { label: 'Baby Wipes', desc: 'Top baby wipes — sensitive, fragrance-free, water-based and biodegradable picks.', keywords: ['baby wipes','sensitive wipes','water wipes','huggies','pampers','biodegradable','fragrance free'] },
  'play-mats': { label: 'Play Mats', desc: 'Best baby play mats and activity gyms for tummy time and development.', keywords: ['play mat','activity gym','tummy time','foam mat','baby gym','play gym','sensory mat'] },
  'baby-carriers': { label: 'Baby Carriers', desc: 'Top baby carriers, wraps, slings and structured carriers for ergonomic babywearing.', keywords: ['baby carrier','baby wrap','sling','structured carrier','ergobaby','babyjorn','ring sling'] },
  'strollers': { label: 'Strollers', desc: 'Best strollers — lightweight, full-size, jogging and double strollers compared.', keywords: ['stroller','pushchair','pram','lightweight stroller','double stroller','jogging stroller','buggy'] },
  'baby-feeding': { label: 'Baby Feeding', desc: 'Best bottles, high chairs, bibs, formula dispensers and feeding accessories.', keywords: ['baby bottle','high chair','bib','formula','breast pump','baby food','sippy cup','baby spoon'] },
  'baby-sleep': { label: 'Baby Sleep', desc: 'Best bassinets, cribs, sleep sacks, swaddles and white noise machines reviewed.', keywords: ['baby sleep','bassinet','crib','sleep sack','swaddle','white noise','snoo','pack n play','merlin'] },
  'baby-bath': { label: 'Baby Bath', desc: 'Top baby bathtubs, bath seats, shampoos and bath time accessories for infants.', keywords: ['baby bath','baby bathtub','bath seat','baby shampoo','bath toys','baby wash','bath thermometer'] },
  'baby-safety': { label: 'Baby Safety', desc: 'Best baby gates, outlet covers, cabinet locks and childproofing products reviewed.', keywords: ['baby gate','childproofing','outlet cover','cabinet lock','baby safety','corner guard','monitor'] },
  'baby-clothing': { label: 'Baby Clothing', desc: 'Best baby onesies, sleepers, socks, mittens and clothing essentials reviewed.', keywords: ['baby clothes','onesie','sleeper','baby socks','mittens','baby outfit','newborn clothing','romper'] },
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((cat) => ({ cat }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params
  const cat = CATEGORY_MAP[cat]
  if (!cat) return {}
  return {
    title: `${cat.label} 2025 — Best Baby Rank`,
    description: cat.desc,
    alternates: { canonical: `https://www.bestbabyrank.com/category/${cat}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { cat } = await params
  const cat = CATEGORY_MAP[cat]
  if (!cat) notFound()

  const all = getAllPosts()
  const kw = cat.keywords
  const matched = all.filter((p) => {
    const text = ((p.keyword || '') + ' ' + (p.title || '') + ' ' + (p.slug || '')).toLowerCase()
    return kw.some((k: string) => text.includes(k))
  })
  const posts = matched.length > 0 ? matched : all.slice(0, 12)

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#0a0a0a;--surface:#111111;--border:#1e1e1e;--text:#e4e4e7;--muted:#71717a;--accent:#f472b6;--accent2:#a855f7;--radius:12px}
        body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.6}
        a{text-decoration:none;color:inherit}
        .container{max-width:1100px;margin:0 auto;padding:0 24px}
        .cat-hero{padding:60px 24px 48px;text-align:center;background:radial-gradient(ellipse 70% 50% at 50% 0%,color-mix(in srgb,#f472b6 15%,transparent) 0%,transparent 70%)}
        .cat-badge{display:inline-block;padding:5px 16px;border-radius:20px;background:color-mix(in srgb,#f472b6 12%,transparent);border:1px solid color-mix(in srgb,#f472b6 30%,transparent);color:var(--accent);font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:16px}
        .cat-hero h1{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;letter-spacing:-0.03em;margin-bottom:12px}
        .cat-hero p{color:var(--muted);font-size:1rem;max-width:560px;margin:0 auto 24px}
        .breadcrumb{display:flex;align-items:center;gap:8px;font-size:0.8rem;color:var(--muted);justify-content:center;margin-bottom:32px}
        .breadcrumb a{color:var(--accent)}
        .post-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;padding-bottom:80px}
        .post-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px;display:flex;flex-direction:column;transition:border-color 0.15s,transform 0.15s}
        .post-card:hover{border-color:var(--accent);transform:translateY(-2px)}
        .post-tag{display:inline-block;padding:3px 10px;border-radius:20px;background:color-mix(in srgb,#f472b6 10%,transparent);border:1px solid color-mix(in srgb,#f472b6 25%,transparent);color:var(--accent);font-size:0.68rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:12px}
        .post-card h2{font-size:1rem;font-weight:700;line-height:1.4;margin-bottom:10px}
        .post-card h2 a:hover{color:var(--accent)}
        .post-card p{color:var(--muted);font-size:0.87rem;line-height:1.65;flex:1;margin-bottom:18px}
        .post-footer{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid var(--border)}
        .post-date{font-size:0.72rem;color:var(--muted)}
        .post-link{font-size:0.82rem;color:var(--accent);font-weight:600}
        .empty{text-align:center;padding:80px 0;color:var(--muted)}
        @media(max-width:600px){.post-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="cat-hero">
        <div className="cat-badge">Category</div>
        <h1>{cat.label}</h1>
        <p>{cat.desc}</p>
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>{cat.label}</span>
        </div>
      </div>

      <div className="container">
        {posts.length === 0 ? (
          <p className="empty">No articles yet — check back soon!</p>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <article className="post-card" key={post.slug}>
                {post.keyword && <span className="post-tag">{post.keyword}</span>}
                <h2><a href={`/${post.slug}`}>{post.title}</a></h2>
                <p>{post.description}</p>
                <div className="post-footer">
                  <span className="post-date">{post.date}</span>
                  <a href={`/${post.slug}`} className="post-link">Read →</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
