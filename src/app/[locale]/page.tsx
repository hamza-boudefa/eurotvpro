// import dynamic from "next/dynamic";
// import { getTranslations, setRequestLocale } from "next-intl/server";

// // Lazy load components
// const HeroSection = dynamic(() => import("@/components/HeroCarousel"));
// const WhoWeAre = dynamic(() => import("@/components/WhoWeAre"));
// const StreamFeatures = dynamic(() => import("@/components/StreamFeatures"));
// const EntertainmentCarousels = dynamic(() => import("@/components/EntertainmentCarousels"));
// const WhatWeOffer = dynamic(() => import("@/components/WhatWeOffre"));
// const SubscriptionPlans = dynamic(() => import("@/components/SubscriptionPlans"));
// const ReasonsSection = dynamic(() => import("@/components/ReasonSection"));

// type Props = {
//   params: Promise<{ locale: string }>;
// };

// export async function generateMetadata({ params }: Props) {
//   const { locale } = await params;
//   const t = await getTranslations({ locale, namespace: "Navigation" });

//   return {
//     title: t("home"),
//   };
// }

// export default async function Home({ params }: Props) {
//   const { locale } = await params;

//   // Enable static rendering
//   setRequestLocale(locale);

//   return (
//     <main >
//       <HeroSection />
//       <WhoWeAre />
//       <StreamFeatures />
//       <EntertainmentCarousels />
//       <WhatWeOffer />
//       <SubscriptionPlans />
//       <ReasonsSection />
//     </main>
//   );
// }

import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import WhatsAppCarousel from "@/components/WhatsAppCarousel";
import SubscriptionApps from "@/components/SubscriptionApps";

// Lazy load components
const HeroSection = dynamic(() => import("@/components/HeroCarousel"));
const WhoWeAre = dynamic(() => import("@/components/WhoWeAre"));
const StreamFeatures = dynamic(() => import("@/components/StreamFeatures"));
const EntertainmentCarousels = dynamic(() => import("@/components/EntertainmentCarousels"));
const WhatWeOffer = dynamic(() => import("@/components/WhatWeOffre"));
const SubscriptionPlans = dynamic(() => import("@/components/SubscriptionPlans"));
const ReasonsSection = dynamic(() => import("@/components/ReasonSection"));

type Props = {
  params: Promise<{ locale: string }>; // params is a synchronous object
};

export async function generateMetadata({ params }: Props) {
  // Destructure locale directly from params (no await needed)
  const { locale } =await params;
  const t = await getTranslations({ locale, namespace: "HomeMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale,
      url: "https://yourwebsite.com",
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

export default async function Home({ params }: any) {
  // Destructure locale directly from params (no await needed)
  const { locale } =await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
      <WhoWeAre />
      <StreamFeatures />
      <EntertainmentCarousels />
      <WhatWeOffer />
      <SubscriptionPlans />
      <SubscriptionApps/>
      <ReasonsSection />
      <WhatsAppCarousel />
    </main>
  );
}