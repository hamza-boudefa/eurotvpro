import { useTranslations } from 'next-intl';
import Image from 'next/image'
import React from 'react'


export default function WhoWeAre() {
  const t = useTranslations("Home");
  return (
    <section className="bg-black text-white mt-20 py-16">
    <div className="  px-4  ">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/banner1.webp"
            alt="Family watching TV"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {t("WhoWeAre.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
          {t("WhoWeAre.description")}
          </p>
        </div>
      </div>
    </div>
  </section>
  )
}
