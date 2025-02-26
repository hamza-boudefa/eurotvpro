"use client"

import React from "react"
import Slider from "react-slick"
import Image from "next/image"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useTranslations } from "next-intl"


type EntertainmentItem = {
  id: string
  title: string
  image: string
}
const sportsItems: EntertainmentItem[] = [
  { id: "1", title: "Premier League", image: "/images/premierLeague.png" },
  { id: "2", title: "La Liga", image: "/images/laliga.png" },
  { id: "3", title: "NBA", image: "/images/nba-logo.svg" },
  { id: "4", title: "NFL", image: "/images/nfl-logo.svg" },
  { id: "5", title: "Champions League", image: "/images/champions-league.png" },
  { id: "6", title: "Serie A", image: "/images/Italian-Serie-A-Logo.png" },
  { id: "7", title: "Bundesliga", image: "/images/Bundesliga.svg" },
  { id: "8", title: "Formula 1", image: "/images/formula1.svg" },
  { id: "9", title: "UFC", image: "/images/UFC.png" },
  { id: "10", title: "Tennis Grand Slams", image: "/images/tenis.png" },
  { id: "11", title: "Ligue 1", image: "/images/ligue1.png" },
]

const moviesItems: EntertainmentItem[] = [
  { id: "1", title: "The Union", image: "/images/theunion.jpg" },
  { id: "2", title: "Teri Baaton Mein Aisa Uljha Jiya", image: "/images/hindi.jpeg" },
  { id: "3", title: "Deadpool & Wolverine", image: "/images/d&w.webp" },
  { id: "4", title: "اهل الكهف", image: "/images/cave.webp" },
  { id: "5", title: "Interstellar", image: "/images/interstellar.jpg" },
  { id: "6", title: "Spaceman", image: "/images/spaceman.jpg" },
  { id: "7", title: "Gladiator", image: "/images/gladiator.jpg" },
  { id: "10", title: "Don't move", image: "/images/dontmove.jpg" },
  { id: "8", title: "House of Spoils", image: "/images/houseofspoils.jpg" },
  { id: "9", title: "The Platform 2", image: "/images/theplatform2.jpg" },
  { id: "11", title: "Lift", image: "/images/lift.webp" },

]

const tvShowsItems: EntertainmentItem[] = [
  { id: "1", title: "Squid Game 2", image: "/images/squidgame2.jpg" },
  { id: "2", title: "Game Of Thrones", image: "/images/got.jpg" },
  { id: "3", title: "Tulsa King", image: "/images/tulsaKing.jpg" },
  { id: "4", title: "الحشاشين", image: "/images/assassins.jpg" },
  { id: "5", title: "The Witcher", image: "/images/thewitcher.webp" },

  { id: "5", title: "Breaking Bad", image: "/images/breakingbad.jpg" },
  { id: "6", title: "Stranger Things", image: "/images/strangerthings.jpg" },
  { id: "7", title: "The Crown", image: "/images/thecrown.webp" },
  { id: "8", title: "Friends", image: "/images/friends.jpg" },
  { id: "9", title: "The Mandalorian", image: "/images/TheMandalorian.webp" },
  { id: "10", title: "Black Mirror", image: "/images/BlackMirror.jpg" },
  { id: "11", title: "Chernobyl", image: "/images/chernobyl.webp" },
  { id: "12", title: "The Last of Us", image: "/images/thelastofus.jpg" },
]




const CarouselSection: React.FC<{ title: string; description: string; items: EntertainmentItem[]; rtl: boolean;SectionType:string }> = ({
  title,
  description,
  items,
  rtl,
  SectionType
}) => {
  const sliderRef = React.useRef<Slider>(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    rtl: rtl,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className="mb-16">
      <div className="flex justify-center items-center mb-4 mt-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white text-center">{title}</h2>
          <p className="text-center text-lg md:text-xl max-w-4xl mx-auto mb-16 text-gray-200 leading-relaxed">{description}</p>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {items.map((item) => (
          <div key={item.id} className="px-2">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={320}
                height={180}
                className={`transition-transform duration-300 group-hover:scale-110 ${
                  SectionType === "sports" ? "!object-contain !h-[80px]" : "h-auto"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className={`absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${
                SectionType === "sports" ? "hidden" : "block"
              }`}>
                <h3 className="text-white text-lg font-semibold">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default function EntertainmentCarousels() {
  const t=useTranslations("EntertainmentCarousels")
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-0">
      <CarouselSection
        title={t('sports.title')}
        description={t('sports.description')}
        items={sportsItems}
        rtl={false}
        SectionType="sports"
      />
      <CarouselSection
        title={t('movies.title')}
        description={t('sports.description')}
        items={moviesItems}
        rtl={true}
         SectionType="movies"
      />
      <CarouselSection
        title={t('shows.title')}
        description={t('shows.title')}
        items={tvShowsItems}
        rtl={false}
         SectionType="shows"
      />
    </div>
  )
}
