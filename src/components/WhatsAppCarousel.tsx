"use client"

import React from "react"
import Slider from "react-slick"
import Image from "next/image"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { SectionTitle } from "./SectionTitle"

type WhatsAppScreenshot = {
  id: string
  imageUrl: string
}

const whatsAppScreenshots: WhatsAppScreenshot[] = [
  
]

const WhatsAppCarousel: React.FC = () => {
  const sliderRef = React.useRef<Slider>(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle translation="plans" />
        <div className=" rounded-lg p-4 shadow-lg">
        <Slider ref={sliderRef} {...settings}>
          {whatsAppScreenshots.map((screenshot) => (
            <div key={screenshot.id} className="p-1 !flex justify-center items-center gap-2 ">
              <Image
                src={screenshot.imageUrl || "/placeholder.svg"}
                alt="WhatsApp Screenshot"
                width={300}
                height={600}
                className="rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default WhatsAppCarousel

