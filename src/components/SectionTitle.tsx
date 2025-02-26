'use client'

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: '700' });

interface ISectionTitleProps {
  translation: string;
}

export const SectionTitle = ({ translation }: ISectionTitleProps) => {
  const params = useParams<{ locale: string }>();
  const t = useTranslations(translation);

  // Ensure 't' is valid
  if (!t('title')) {
    return <h2>Error: Title translation not found!</h2>;
  }

  return (
    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-16">
      <div className={`flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 ${params.locale !== 'ar' ? poppins.className : ''}`}>
        <span className={`text-6xl sm:text-8xl stroke-text mb-8 ${params.locale === 'ar' ? 'text-white' : 'text-stroke-custom text-transparent text-black'}`}>
          {t('title')}
        </span>
      </div>
    </h2>
  );
};
