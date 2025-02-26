// import { useTranslations } from 'next-intl'
// import { BlogCard } from "@/components/BlogCard"

// interface BlogPost {
//   id: string
//   title: string
//   excerpt: string
//   slug: string
// }

// const posts: BlogPost[] = [
//   {
//     id: "1",
//     title: "What is IPTV? A Complete Beginner’s Guide",
//     excerpt:
//       "IPTV (Internet Protocol Television) is transforming the way we watch TV by delivering content over the internet. Learn how IPTV works, its advantages, and how to get started.",
//     slug: "what-is-iptv",
//   },
//   {
//     id: "2",
//     title: "Advantages of IPTV Over Traditional TV Services",
//     excerpt:
//       "Discover why IPTV is a better alternative to traditional cable and satellite TV, offering more flexibility, better pricing, and a wider range of content.",
//     slug: "iptv-vs-normal-tv",
//   },
//   {
//     id: "3",
//     title: "How to Set Up and Use IPTV on Any Device",
//     excerpt:
//       "A step-by-step guide on how to install and use IPTV on Smart TVs, Firestick, Android, iOS, and other devices for seamless streaming.",
//     slug: "iptv-best-channels",
//   },
//   {
//     id: "4",
//     title: "How to Watch Live Sports on IPTV",
//     excerpt:
//       "Sports fans can enjoy live matches, PPV events, and exclusive sports content with IPTV. Learn how to stream your favorite sports channels easily.",
//     slug: "iptv-sports",
//   },
//   {
//     id: "5",
//     title: "Best IPTV Channels for Movies and TV Shows",
//     excerpt:
//       "Explore the best IPTV channels for movies, TV shows, and exclusive content. Find out why IPTV is the ultimate choice for entertainment lovers.",
//     slug: "iptv-movies",
//   },
//   {
//     id: "6",
//     title: "IPTV vs Cable TV: Which is Better?",
//     excerpt:
//       "Compare IPTV and cable TV in terms of cost, content, and flexibility. Discover why IPTV is the future of television.",
//     slug: "iptv-vs-normal-tv",
//   },
//   {
//     id: "7",
//     title: "How to Fix Common IPTV Issues",
//     excerpt:
//       "Troubleshoot common IPTV problems like buffering, freezing, and connectivity issues. Learn how to optimize your streaming experience.",
//     slug: "iptv-pricing",
//   },
//   {
//     id: "8",
//     title: "Top 10 IPTV Apps for 2024",
//     excerpt:
//       "Discover the best IPTV apps for streaming on Smart TVs, Firestick, Android, iOS, and more. Find the perfect app for your needs.",
//     slug: "best-iptv-providers",
//   },
//   {
//     id: "9",
//     title: "Is IPTV Legal? Everything You Need to Know",
//     excerpt:
//       "Understand the legality of IPTV services. Learn the difference between legal and illegal IPTV and how to stay safe while streaming.",
//     slug: "is-iptv-good",
//   },
//   {
//     id: "10",
//     title: "How to Choose the Best IPTV Provider",
//     excerpt:
//       "Learn how to select a reliable IPTV provider. Discover the key factors to consider, including channel variety, streaming quality, and pricing.",
//     slug: "iptv-pricing",
//   },
//   {
//     id: "11",
//     title: "IPTV for French Speakers: Best Channels and Services",
//     excerpt:
//       "Explore the best IPTV services and channels for French-speaking users. Discover popular French channels like TF1, Canal+, and M6.",
//     slug: "iptv-in-french",
//   },
//   {
//     id: "12",
//     title: "IPTV in Spain: Best Channels and Services",
//     excerpt:
//       "Discover the best IPTV services and channels for Spanish-speaking users. Explore popular Spanish channels like RTVE, Antena 3, and Movistar+.",
//     slug: "iptv-in-spain",
//   },
// ];


// export default function BlogPage() {
//   const t = useTranslations('blog');

//   const translatedPosts = posts.map(post => ({
//     ...post,
//     title: t(`posts.${post.slug}.title`),
//     excerpt: t(`posts.${post.slug}.excerpt`),
//   }));

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
//           <p className="text-xl text-zinc-400">{t('subtitle')}</p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {translatedPosts.map((post) => (
//             <BlogCard key={post.id} post={post} />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BlogCard } from '@/components/BlogCard';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
}

const posts: BlogPost[] = [
  {
    id: "1",
    title: "What is IPTV? A Complete Beginner’s Guide",
    excerpt:
      "IPTV (Internet Protocol Television) is transforming the way we watch TV by delivering content over the internet. Learn how IPTV works, its advantages, and how to get started.",
    slug: "what-is-iptv",
  },
  {
    id: "2",
    title: "Advantages of IPTV Over Traditional TV Services",
    excerpt:
      "Discover why IPTV is a better alternative to traditional cable and satellite TV, offering more flexibility, better pricing, and a wider range of content.",
    slug: "iptv-vs-normal-tv",
  },
  {
    id: "3",
    title: "How to Set Up and Use IPTV on Any Device",
    excerpt:
      "A step-by-step guide on how to install and use IPTV on Smart TVs, Firestick, Android, iOS, and other devices for seamless streaming.",
    slug: "iptv-best-channels",
  },
  {
    id: "4",
    title: "How to Watch Live Sports on IPTV",
    excerpt:
      "Sports fans can enjoy live matches, PPV events, and exclusive sports content with IPTV. Learn how to stream your favorite sports channels easily.",
    slug: "iptv-sports",
  },
  {
    id: "5",
    title: "Best IPTV Channels for Movies and TV Shows",
    excerpt:
      "Explore the best IPTV channels for movies, TV shows, and exclusive content. Find out why IPTV is the ultimate choice for entertainment lovers.",
    slug: "iptv-movies",
  },
  {
    id: "6",
    title: "IPTV vs Cable TV: Which is Better?",
    excerpt:
      "Compare IPTV and cable TV in terms of cost, content, and flexibility. Discover why IPTV is the future of television.",
    slug: "iptv-vs-normal-tv",
  },
  {
    id: "7",
    title: "How to Fix Common IPTV Issues",
    excerpt:
      "Troubleshoot common IPTV problems like buffering, freezing, and connectivity issues. Learn how to optimize your streaming experience.",
    slug: "iptv-pricing",
  },
  {
    id: "8",
    title: "Top 10 IPTV Apps for 2024",
    excerpt:
      "Discover the best IPTV apps for streaming on Smart TVs, Firestick, Android, iOS, and more. Find the perfect app for your needs.",
    slug: "best-iptv-providers",
  },
  {
    id: "9",
    title: "Is IPTV Legal? Everything You Need to Know",
    excerpt:
      "Understand the legality of IPTV services. Learn the difference between legal and illegal IPTV and how to stay safe while streaming.",
    slug: "is-iptv-good",
  },
  {
    id: "10",
    title: "How to Choose the Best IPTV Provider",
    excerpt:
      "Learn how to select a reliable IPTV provider. Discover the key factors to consider, including channel variety, streaming quality, and pricing.",
    slug: "iptv-pricing",
  },
  {
    id: "11",
    title: "IPTV for French Speakers: Best Channels and Services",
    excerpt:
      "Explore the best IPTV services and channels for French-speaking users. Discover popular French channels like TF1, Canal+, and M6.",
    slug: "iptv-in-french",
  },
  {
    id: "12",
    title: "IPTV in Spain: Best Channels and Services",
    excerpt:
      "Discover the best IPTV services and channels for Spanish-speaking users. Explore popular Spanish channels like RTVE, Antena 3, and Movistar+.",
    slug: "iptv-in-spain",
  },
];

// type Props = {
//   params: { locale: string }; // params is a synchronous object
// };

export async function generateMetadata({ params }: any) {
  // Destructure locale directly from params
  const { locale } =await  params;
  const t = await getTranslations({ locale, namespace: "BlogMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale,
      url: "https://eurotvpro.com/blog",
      siteName: t("siteName"),
      images: [
        {
          url: "https://eurotvpro.com/images/og-image.jpg",
          width: 800,
          height: 600,
          alt: t("siteName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["https://eurotvpro.com/images/twitter-image.jpg"],
    },
  };
}

export default async function BlogPage({ params }: any) {
  // Destructure locale directly from params
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch translations using getTranslations
  const t = await getTranslations('blog');

  const translatedPosts = posts.map(post => ({
    ...post,
    title: t(`posts.${post.slug}.title`),
    excerpt: t(`posts.${post.slug}.excerpt`),
  }));

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-zinc-400">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}