import { getTranslations, setRequestLocale } from "next-intl/server";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { Globe, Zap, Shield } from "lucide-react";

const poppins = Poppins({ subsets: ['latin'], weight: '700' });

// type Props = {
//   params: { locale: string }; // params is a synchronous object
// };

export async function generateMetadata({ params }: any) {
  // Destructure locale directly from params
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale,
      url: "https://yourwebsite.com/about",
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

export default async function AboutPage({ params }: any) {
  // Destructure locale directly from params
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("About");

  return (
    <div className="min-h-screen bg-black text-white font-sans">


      {/* About Hero Section */}
      <section className="relative py-24 text-center bg-cover bg-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {t("title")}
            <span className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-stroke-custom text-transparent font-black ${poppins.className}`}>
              {t("brand")}
            </span>
          </h2>
          <p className="text-center text-lg md:text-xl max-w-4xl mx-auto mb-16 text-gray-200 leading-relaxed">
            {t("description")}
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="pb-20 bg-black text-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="/images/aboutPageImage.webp"
            alt={t("imageAlt")}
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold">{t("story.title")}</h2>
            <p className="text-start text-lg md:text-xl max-w-4xl mx-auto mb-16 text-gray-200 leading-relaxed">
              {t("story.p1")}
            </p>
            <p className="text-start text-lg md:text-xl max-w-4xl mx-auto mb-16 text-gray-200 leading-relaxed">
              {t("story.p2")}
            </p>
            <p className="text-start text-lg md:text-xl max-w-4xl mx-auto mb-16 text-gray-200 leading-relaxed">
              {t("story.p3")}
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-12">{t("values.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
              icon={<Globe className="w-10 h-10 text-red-600" />}
              title={t("values.global")}
              description={t("values.globalDescription")}
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10 text-red-600" />}
              title={t("values.quality")}
              description={t("values.qualityDescription")}
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10 text-red-600" />}
              title={t("values.security")}
              description={t("values.securityDescription")}
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-black text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-extrabold mb-6">{t("mission.title")}</h2>
          <p className="text-gray-300 text-lg mb-4">{t("mission.description1")}</p>
          <p className="text-gray-300 text-lg">{t("mission.description2")}</p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-black p-8 rounded-lg text-center border border-gray-700 shadow-lg hover:shadow-xl transition">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}