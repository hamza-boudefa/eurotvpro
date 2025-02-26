import { notFound } from "next/navigation";
import Image from "next/image";
import { Posts } from "./posts";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
}
// type Params = {
//   params: {
//     locale: string
//     slug: string
//   }
// }

type LanguageCode = keyof typeof Posts;

export async function generateStaticParams() {
  const locales = Object.keys(Posts);
  return locales.flatMap((locale) =>
    Object.keys(Posts[locale as LanguageCode]).map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: any) {
  const { slug, locale } =await params; // Remove await here

  const post = Posts[locale as keyof typeof Posts]?.[slug];
  if (!post) {
    return {
      title: "Post Not Found - Euro TV Pro",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.title.split(" ").join(","),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: locale,
      url: `https://eurotvpro.com/${locale}/blog/${slug}`,
      siteName: "Euro TV Pro",
      images: [
        {
          url: "https://cdn.prod.website-files.com/5e5687223017dc0634fd8d7c/665e119e605b3c58ff9393e4_634b4529ee4611d0f0b9d457_multiscreens_OTT.webp",
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["https://cdn.prod.website-files.com/5e5687223017dc0634fd8d7c/665e119e605b3c58ff9393e4_634b4529ee4611d0f0b9d457_multiscreens_OTT.webp"],
    },
  };
}

export default async function BlogPost({ params }: any) {
  const { slug, locale } =await params; // Remove await here

  const post = Posts[locale as keyof typeof Posts]?.[slug];
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <Image
            src="https://cdn.prod.website-files.com/5e5687223017dc0634fd8d7c/665e119e605b3c58ff9393e4_634b4529ee4611d0f0b9d457_multiscreens_OTT.webp"
            alt="IPTV Logo"
            width={800}
            height={400}
            style={{ width: "auto", height: "auto" }}
            className="rounded-lg mb-8"
          />
          <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
          <div className="prose prose-invert max-w-none">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-6 text-zinc-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}