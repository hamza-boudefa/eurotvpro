import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Head from "next/head";
import SubscriptionApps from "@/components/SubscriptionApps";

// Lazy load components
const SubscriptionPlans = dynamic(() => import("@/components/SubscriptionPlans"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));

// type Props = {
//   params: { locale: string }; // params is a synchronous object
// };

export async function generateMetadata({ params }: any) {
  // Destructure locale directly from params
  const { locale } =await params;
  const t = await getTranslations({ locale, namespace: "PlansMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale,
      url: "https://yourwebsite.com/plans",
      siteName: t("siteName"),
      images: [
        {
          url: "https://yourwebsite.com/images/og-image.jpg",
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
      images: ["https://yourwebsite.com/images/twitter-image.jpg"],
    },
  };
}

export default async function Page({ params }: any) {
  // Destructure locale directly from params
  const { locale } =await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("PlansMetadata");

  return (
    <div>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
        <meta name="keywords" content={t("keywords")} />
        <meta name="author" content={t("author")} />
        <meta property="og:title" content={t("ogTitle")} />
        <meta property="og:description" content={t("ogDescription")} />
        <meta property="og:type" content={t("ogType")} />
        <meta property="og:url" content={t("ogUrl")} />
        <meta property="og:image" content={t("ogImage")} />
      </Head>
      <SubscriptionPlans />
      <SubscriptionApps/>
      <HowItWorks />
    </div>
  );
}