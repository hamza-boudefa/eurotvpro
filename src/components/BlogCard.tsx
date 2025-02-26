import Link from "next/link"
import { useTranslations } from "next-intl"

interface BlogCardProps {
  post: any
  locale: string // Add locale prop
}

export function BlogCard({ post, locale }: BlogCardProps) {
  
  // Add locale to props
  const t = useTranslations("blog")

  return (
    <div className="bg-zinc-900 text-white border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        <p className="text-zinc-400 text-sm line-clamp-3">{post.excerpt}</p>
      </div>
      <div className="pt-0">
        <Link
          href={`/${locale}/blog/${post.slug}`}
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          {t("readMore")} →
        </Link>
      </div>
    </div>
  )
}

