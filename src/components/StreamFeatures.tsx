import * as React from "react"
import { Tv, Film, Wifi, MonitorSmartphone } from "lucide-react"
import { useTranslations } from "next-intl";
import { SectionTitle } from "./SectionTitle";

// Utility function
const cn = (...inputs: (string | undefined)[]) => inputs.filter(Boolean).join(" ")

// Card components
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-zinc-200 bg-black text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"


// Main component
export default function StreamFeatures() {
  const t = useTranslations("StreamFeatures");
    // Features data
const features = [
  {
    icon: Tv,
    text: t('textTV')
  },
  {
    icon: Wifi,
    text: t("textWifi"),
  },
  {
    icon: Film,
    text: t("textFilm"),
  },
  {
    icon: MonitorSmartphone,
    text: t("textMonitor"),
  },
]

//   <div className={poppins.className}>
//   <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold stroke-text mb-8 text-stroke-custom text-transparent font-black">EXPERIENCE</h2>
// </div>
  return (
    <section className="bg-black text-white py-16 px-4 md:py-24 pb-0 md:pb-0">
      <div className="container mx-auto w-full max-w-7xl">
       <SectionTitle translation="StreamFeatures" />
        {/* text-4xl sm:text-5xl lg:text-6xl xl:text-8xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-black border-none">
                <CardContent className="flex items-start gap-4 p-6 ">
                  <div className="bg-red-600 p-3 rounded-lg  mt-1">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl text-gray-200">{feature.text}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

