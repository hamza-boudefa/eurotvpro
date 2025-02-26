import { useTranslations } from "next-intl";
import { SectionTitle } from "./SectionTitle";


export default function HowItWorks() {
  const t = useTranslations('HowItWorks');
  const steps = t.raw('steps');
  return (
    <div className="min-h-screen bg-black p-6 md:p-12">
       {/* <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-16">
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 ${poppins.className}`}>
            <span className="text-[43px] sm:text-7xl lg:text-8xl stroke-text mb-8 text-stroke-custom text-transparent font-black"> {t('title')} </span>
          </div>
        </h2> */}
               <SectionTitle translation="HowItWorks" />

      {/* <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white tracking-wider">HOW IT WORKS</h2> */}
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-24">
      {steps.map((step: { number: string, title: string, description: string, align: string }) => (
          <div
            key={step.number}
            className={`flex flex-col ${
              step.number === "2" ? "md:flex-row-reverse" : "md:flex-row"
            } items-center gap-8 md:gap-16`}
          >
            <div className="w-full md:w-1/2">
              <div className={`flex ${step.number === "2" ? "justify-start" : "justify-end"} md:justify-center`}>
                <div className="w-20 h-20 border border-red-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{step.number}</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

