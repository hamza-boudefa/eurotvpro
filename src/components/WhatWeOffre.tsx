"use client"
import IconsCarousel from "./IconsCarousel";
import { useTranslations } from "next-intl";
import { SectionTitle } from "./SectionTitle";


export default function WhatWeOffer() {
  const t=useTranslations('WhatWeOffer')
  return (
    <section className="bg-black text-white pt-16 px-4 md:pt-24 ">
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        {/* <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-16 ">
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 ${poppins.className} `}>
            <span className="text-6xl sm:text-8xl  stroke-text mb-8 text-stroke-custom text-transparent font-black">{t('title')} </span>
      
          </div>
        </h2> */}
         <SectionTitle translation="WhatWeOffer" />

        {/* Description */}
        <p className="text-center text-lg md:text-xl max-w-4xl mx-auto mb-16 text-gray-200 leading-relaxed">
          {t('text')}
            </p>

        {/* Infinite Streaming Services Logos */}
      <IconsCarousel/>
      </div>

     
    </section>
  );
}
