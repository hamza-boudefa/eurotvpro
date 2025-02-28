"use client"

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from 'next/font/google';
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from 'next/navigation'

const poppins = Poppins({ subsets: ['latin'], weight: '700' });

const images = [
  "/images/banner1.webp",
  "/images/banner2.webp", 
  "/images/banner3.webp",
];

export default function HeroSection() {
  const params = useParams<{locale: string}>()
  const router = useRouter()

// console.log(params.locale)
  const t = useTranslations("Home"); // Use translations for this section

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);
  const goToShop=()=>{
   router.push(`/${params.locale}/pricing`)

  }

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[700px] overflow-hidden">
      {/* Background Carousel */}
      <div dir="ltr" ref={emblaRef} className="absolute inset-0 z-0">
        <div className="flex h-full">
          {images.map((src, index) => (
            <div key={src} className="flex-[0_0_100%] h-full relative">
              <AnimatePresence initial={false}>
                {index === selectedIndex && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
                    <Image priority width={1500} height={1500} src={src || "/placeholder.png"} alt="Background" className="w-full h-full object-cover" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <span className="text-red-600 font-semibold mb-4 text-lg sm:text-xl md:text-2xl uppercase">
          {t("HeroSection.offer")}
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-2 uppercase">
          {t("HeroSection.entertainment")}
        </h1>
        <div className={` ${params.locale == 'ar'? '':poppins.className } `}>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold stroke-text mb-8  font-black uppercase ${params.locale =='ar'?'text-white':'text-stroke-custom text-transparent' } `}>
            {t("HeroSection.experience")}
          </h2>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-white text-lg md:text-xl">{t("HeroSection.startingFrom")}</span>
          <span className="text-white text-2xl md:text-4xl font-bold">4.99€</span>
          <span className="text-white text-lg md:text-xl">/ {t("HeroSection.month")}</span>
        </div>
        <button 
        onClick={goToShop}
        className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition-colors">
          {t("HeroSection.shopNow")}
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 transition-all duration-300 rounded-full ${
              selectedIndex === index ? "w-8 bg-white" : "w-2 bg-gray-400"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
