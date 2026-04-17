import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  keyword: string;
  content: string;
  coverImage?: string;
  category?: string;

};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const slug = data.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(".md", "");
      const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        description: data.description || "",
        keyword: data.keyword || "",
        content,
        coverImage: imgMatch ? imgMatch[1] : undefined,
        category: data.category || "",
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}