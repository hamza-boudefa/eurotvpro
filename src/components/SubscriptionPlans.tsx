'use client'
import { Check } from "lucide-react";
import { addToCart, getCartItems, type Plan } from '@/utils/cart';
import { useSubscription } from "@/contexts/subscription-context";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useTranslations } from "next-intl";
import { SectionTitle } from "./SectionTitle";

const plans = [
  {
    duration: "durations.1_month", // Translation key
    price: "4.99€",
    features: [
      "features.live_channels",
      "features.vod",
      // "features.quality",
      "features.instant_access",
      "features.no_hardware",
      "features.all_devices",
      "features.daily_update",
      "features.epg_guide",
      "features.support",
    ],
  },
  {
    duration: "durations.6_months", // Translation key
    price: "14.99€",
    features: [
      "features.live_channels",
      "features.vod",
      // "features.quality",
      "features.instant_access",
      "features.no_hardware",
      "features.all_devices",
      "features.daily_update",
      "features.epg_guide",
      "features.support",
    ],
  },
  {
    duration: "durations.12_months1", // Translation key
    price: "22.99€",
    features: [
      "features.live_channels",
      "features.vod",
      // "features.quality",
      "features.instant_access",
      "features.no_hardware",
      "features.all_devices",
      "features.daily_update",
      "features.epg_guide",
      "features.support",
    ],
  },
  {
    duration: "durations.12_months2", // Translation key
    price: "32.99€",
    features: [
      "features.live_channels",
      "features.vod",
      // "features.quality",
      "features.vip_instant_access",
      "features.no_hardware",
      "features.all_devices",
      "features.daily_update",
      "features.epg_guide",
      "features.vip_support",
    ],
    isBestValue: true, // Add a flag to identify the best value plan
  },
];

export default function SubscriptionPlans() {
  const t = useTranslations('plans');
  const { setSubscriptionCount } = useSubscription();
  const [count, setCount] = useState(0);
  const router = useRouter();

  const handleSubscriptionChange = (plan: Plan) => {
    addToCart(plan);
    setCount(count + 1);
  };

  useEffect(() => {
    const items = getCartItems();
    setSubscriptionCount(items.length);
  }, [count]);

  const goTo = (plan: Plan) => {
    handleSubscriptionChange(plan);
    router.push('/cart');
  };

  return (
    <section className="bg-black text-white py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle translation="plans" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border  rounded-lg p-6 flex flex-col relative ${plan.isBestValue? 'border-[#F9B233]':'border-red-600' } `}
            >
              {/* Best Value Tag */}
              {plan.isBestValue && (
                <div className="absolute top-0 right-0 bg-[#F9B233] text-black px-4 py-1 rounded-tr-lg rounded-bl-lg text-sm font-bold">
                  {t('best_value')}
                </div>
              )}

              <h3 className="text-xl font-bold mb-4 whitespace-nowrap">{t(plan.duration)}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="flex-grow mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="text-[#F9B233] mr-2" size={16} />
                    <span className="text-sm">{t(feature)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleSubscriptionChange(plan)}
                  className={` text-white py-2 px-4 rounded hover:bg-red-700 transition-colors ${plan.isBestValue? 'bg-[#F9B233] hover:bg-[#f9b033b6] ':'bg-red-600' } `}
                >
                  {t('add_to_cart')}
                </button>
                <button
                  onClick={() => goTo(plan)}
                  className="border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-black transition-colors"
                >
                  {t('place_order')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}