'use client'
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const poppins = Poppins({ subsets: ['latin'], weight: '700' });

export default function ReasonsSection() {
  const params = useParams<{locale: string}>()
// console.log(params.locale)
  const t = useTranslations('reasons');

  return (
    <section className="bg-black text-white py-16 md:py-24 md:px-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t('title')}
              <br />
              {t('make_you')}
              <span className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight   ${params.locale=='ar'?"text-white":`text-stroke-custom text-transparent font-black ${poppins.className} `}`}>
                {t('choose_us')}
              </span>
            </h2>
            <ul className="space-y-4">
              {t.raw('reasons_list').map((reason: { title: string, description: string }, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#F9B233] text-4xl">•</span>
                  <div>
                    <h3 className="font-medium text-3xl">{reason.title}</h3>
                    <p className="text-gray-400 text-sm">{reason.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Image
            src="https://eurosiptv.com/wp-content/uploads/2024/03/1-1.webp"
            alt="TV streaming interface in living room"
            width={5100}
            height={2100}
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}