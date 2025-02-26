"use client";

import Image from "next/image";

const streamingServices = [
  {
    name: "Netflix",
    logo: "/images/netflixIcon.svg",
  },
  {
    name: "Prime Video",
    logo: "/images/primeIcon.svg",
  },
  {
    name: "Fox Channel",
    logo: "/images/foxIcon.svg",
  },
  {
    name: "Disney Plus",
    logo: "/images/disneyIcon.svg",
  },
  {
    name: "HBO",
    logo: "/images/hboIcon.svg",
  },
  {
    name: "OSN",
    logo: "/images/osnIcon.svg",
  },
  {
    name: "Hulu",
    logo: "/images/huluIcon.svg",
  },
];

export default function IconsCarousel() {
  return (
    <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-8 md:gap-12 pb-4 md:justify-center items-center animate-scroll"
              style={{ animationDuration: "30s", animationTimingFunction: "linear" }}
            >
              {/* First Row of Services */}
              {streamingServices.map((service) => (
                <div key={service.name} className="flex-shrink-0 hover:opacity-80 transition-opacity">
                  <Image
                    src={service.logo || "/placeholder.svg"}
                    alt={`${service.name} logo`}
                    width={120}
                    height={40}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </div>
              ))}
              {/* Second Row of Services (Duplicate of the first) */}
              {streamingServices.map((service) => (
                <div key={`${service.name}-duplicate`} className="flex-shrink-0 hover:opacity-80 transition-opacity">
                  <Image
                    src={service.logo || "/placeholder.svg"}
                    alt={`${service.name} logo`}
                    width={120}
                    height={40}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlay for Scroll Indication */}
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent md:hidden" />
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black to-transparent md:hidden" />
          <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </div>
  );
}
