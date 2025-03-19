'use client';
import { Check } from "lucide-react";
import { addToCart, getCartItems } from '@/utils/cart';
import { useSubscription } from "@/contexts/subscription-context";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from "next-intl";
import { SectionTitle } from "./SectionTitle";
type PlanTranslation = {
  id?: number
  planId?: number
  language: string
  duration: string
  features: string[]
};

type Plan = {
  price: number;
  promoPrice: number | null;
  isBestValue: boolean;
  PlanTranslations: PlanTranslation[];
};

export default function SubscriptionPlans() {
  const t = useTranslations('plans');
  const { setSubscriptionCount } = useSubscription();
  const [count, setCount] = useState(0);
  const [plans, setPlans] = useState<Plan[]>([]); // State to store fetched plans
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const router = useRouter();
  const currentLocale = useLocale()

  // Fetch plans by language
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/admin/plans/getPlansByLang?language=${currentLocale}`); // Replace 'en' with dynamic language if needed
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data:any = await response.json();
        // data.map(plan=>plan.PlanTranslations.map(el=>JSON.parse(el.features)))
data.forEach((elPlan: { PlanTranslations: any[]; }) => {
  console.log(elPlan)
    elPlan.PlanTranslations.forEach(translation => {
        translation.features=JSON.parse(translation.features)
    });
});

    console.log(data)
        setPlans(data); // Set fetched plans
      } catch (err:any) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchPlans();
  }, []);

  const handleSubscriptionChange = (plan: any) => {
    addToCart(plan);
    setCount(count + 1);
  };

  useEffect(() => {
    const items = getCartItems();
    setSubscriptionCount(items.length);
  }, [count]);

  const goTo = (plan: any) => {
    handleSubscriptionChange(plan);
    router.push('/cart');
  };
console.log(plans)
  // Map fetched plans to the expected structure
  const mappedPlans = plans.map((plan) => ({
    duration: plan.PlanTranslations[0]?.duration || 'Unknown Duration', // Use the first translation's duration
    price: `${plan.price}€`, // Format price
    promoPrice:`${plan.promoPrice}€`,
    features: plan.PlanTranslations[0]?.features
      ? (plan.PlanTranslations[0].features) // Parse features from JSON
      : ['No features available'], // Fallback if no features
    isBestValue: plan.isBestValue, // Use the isBestValue flag from the backend
  }));

  if (loading) {
    return (
      <section className="bg-black text-white py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle translation="plans" />
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="border border-gray-700 rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div> {/* Duration */}
                <div className="h-10 bg-gray-700 rounded w-1/2 mb-6"></div> {/* Price */}
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div> {/* Feature 1 */}
                <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div> {/* Feature 2 */}
                <div className="h-4 bg-gray-700 rounded w-4/6 mb-6"></div> {/* Feature 3 */}
                <div className="h-10 bg-gray-700 rounded w-full mb-2"></div> {/* Button 1 */}
                <div className="h-10 bg-gray-700 rounded w-full"></div> {/* Button 2 */}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  

  if (error) {
    return <div className="text-center text-red-500 py-16">Error: {error}</div>;
  }

  return (
    <section className="bg-black text-white py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle translation="plans" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mappedPlans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-lg p-6 flex flex-col relative ${plan.isBestValue ? 'border-[#F9B233]' : 'border-red-600'}`}
            >
              {/* Best Value Tag */}
              {plan.isBestValue && (
                <div className="absolute top-0 right-0 bg-[#F9B233] text-black px-4 py-1 rounded-tr-lg rounded-bl-lg text-sm font-bold">
                  {t('best_value')}
                </div>
              )}

              <h3 className="text-xl font-bold mb-4 whitespace-nowrap">{plan.duration}</h3>
              <p className="text-4xl font-bold mb-6">
              {plan.promoPrice &&plan.promoPrice !='null€' ? (
                  <>
<span className="relative inline-block text-[23px] text-gray-500 custom-strike">
  {plan.price}
</span>
                    <span className="ml-2">{plan.promoPrice}</span>
                  </>
                ) : (
                  <span>{plan.price}</span>
                )}
</p>
              <ul className="flex-grow mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="text-[#F9B233] mr-2" size={16} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleSubscriptionChange(plan)}
                  className={`text-white py-2 px-4 rounded hover:bg-red-700 transition-colors ${plan.isBestValue ? 'bg-[#F9B233] hover:bg-[#f9b033b6]' : 'bg-red-600'}`}
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
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 text-center mt-10"> {t('test')}</h2>

    </section>
  );
}