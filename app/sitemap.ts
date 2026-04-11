import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function sitemap(): MetadataRoute.Sitemap {
  const postsDir = path.join(process.cwd(), 'content/posts')

  let posts: MetadataRoute.Sitemap = []

  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
    posts = files.map((file) => {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
      const { data } = matter(content)
      return {
        url: `https://bestbabyrank.com/${data.slug || file.replace('.md', '')}`,
        lastModified: data.date ? new Date(data.date) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })
  }

  return [
    {
      url: 'https://bestbabyrank.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...posts,
  ]
}
