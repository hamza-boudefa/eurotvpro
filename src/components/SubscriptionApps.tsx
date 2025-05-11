"use client";

import Image from "next/image";
import { addToCart, getCartItems } from "@/utils/cart";
import { useSubscription } from "@/contexts/subscription-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { SectionTitle } from "./SectionTitle";
import axios from "axios";

// 🔹 Define TypeScript Interface for Subscription
interface Subscription {
  id: number;
  name: string;
  price: number;
  promoPrice: number | null;
  isBestValue: boolean;
  image: string;
  PlanTranslations: {
    duration: string;
    features: string;
  }[];
}

export default function SubscriptionApps() {
  const t = useTranslations("subscriptionsApp");
  const { setSubscriptionCount } = useSubscription();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // 🔸 Fetch subscriptions from API
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get<{ data: Subscription[] }>(
          `${process.env.NEXT_PUBLIC_APIURL}/admin/apps/getAllApps`
        );
        console.log(response)
        // 🔹 Vérification de la structure de la réponse
        if (response.data && Array.isArray(response.data)) {
          console.log(response.data)
          setSubscriptions(response.data);
        } else {
          console.error("Invalid API response format");
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  // 🔸 Sync cart count
  useEffect(() => {
    const items = getCartItems();
    const totalItemsCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setSubscriptionCount(totalItemsCount);
  }, [setSubscriptionCount]);

  const handleSubscriptionChange = (subscription: Subscription) => {
    addToCart(subscription);
    const updatedItems = getCartItems();
    const totalItemsCount = updatedItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setSubscriptionCount(totalItemsCount);
  };

  const goTo = (subscription: Subscription) => {
    handleSubscriptionChange(subscription);
    router.push("/cart");
  };

  return (
    <section className="bg-black text-white py-16 px-4 md:py-24">
     {subscriptions && subscriptions.length>0 && <div className="container mx-auto max-w-6xl">
        <SectionTitle translation="subscriptionsApp"></SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? // 🔹 Skeleton Loader While Fetching Data
              [...Array(4)].map((_, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-6 animate-pulse">
                  <div className="w-24 h-24 bg-gray-700 mx-auto mb-4 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-10 bg-gray-700 rounded w-full"></div>
                </div>
              ))
            : // 🔹 Display Subscriptions After Loading
              subscriptions.map((subscription) => (
                <div key={subscription.id} className="border border-red-600 rounded-lg p-6 flex flex-col">
                  <Image
                    src={subscription.image ? `${process.env.NEXT_PUBLIC_APIURL}${subscription.image}` : "/placeholder.svg"}
                    alt={subscription.name}
                    width={100}
                    height={100}
                    className="mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold mb-2 text-center">{subscription.name}</h3>
                  <p className="text-3xl font-bold mb-4 text-center">
  {subscription.promo ? (
    <>
      <span className="relative inline-block text-[23px] text-gray-500 custom-strike mr-2">{subscription.price}€</span>
      <span className="text-white">{subscription.promo}TND</span>
    </>
  ) : (
    <span>{subscription.price}TND</span>
  )}
</p>
                  <div className="flex flex-col gap-2 mt-auto">
                    <button
                      onClick={() => handleSubscriptionChange(subscription)}
                      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                    >
                      {t("add_to_cart")}
                    </button>
                    <button
                      onClick={() => goTo(subscription)}
                      className="border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-black transition-colors"
                    >
                      {t("subscribe_now")}
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>}
    </section>
  );
}
